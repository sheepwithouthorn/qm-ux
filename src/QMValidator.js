/**
 * @author gcy[of1518]
 * @date 2017.01
 * @distribution 
 * 
 * QM校验工具类

 rules: {
   #{ruleName}:{  //校验规则
    async:false,
    param:{}           //校验函数入参
    rule:()=>{},       //自定义校验规则
    rel:[#{index},...] //关联字段?是否需要?
    msg:''             //错误信息
   },
   phone:{msg: '请填写正确手机号码!'},
   required:{
     rel:[],
     rule: ({index,source,fromSource})=> {
       return fromSource.get('phone') != null || fromSource.get('tel') != null
     },
     msg: '手机号码与电话号码不得为空!'
   },
   range:{
    param:[1,10],
    msg:'数值不在范围内!'
   },
   custom:{
     rule: ({index,source,formState, elementSource})=> {
       return formState === elementSource;
     },
     msg: '两次填写的密码不对'
   },
   async:{
     msg: '商品名称重复'
   }
 }

 */
import { Validator } from 'iflux2';

import QMFetch from './QMFetch';

let __LOG__ = typeof console !== 'undefined' && typeof __DEBUG__ != 'undefined' && __DEBUG__;

/**
 *
 */
export default class QMValidator extends Validator {

  /**
   * FormSource校验
   *
   * @public
   * @param {*} formSource
   * @param {boolean} fuse 1:一级熔断;2:二级熔断;3:三级熔断;4:四级熔断['formSource','source','rules','rule']
   * @param {boolean} async
   * @param {*} path ['#key','#index','val']; '#key':obj对象;'#index':array对象;'val':值对象
   * @return {object} {name: ['phone','required', 'custom'],password: ['custom']}
   */
  static eagle({
    formSource, fuse = 3, async = false, path = ['#[key]', '.index', '&value']
  }) {
    //校验结果容器
    let errorMap = {};
    if (__LOG__) {
      console.time('QMValidator.eagle:校验耗时');
    }
    //异步校验
    for (let index in formSource) {
      let source = formSource[index];
      let errKeySet = this.eagleEye({ source, formSource, fuse });
      if (errKeySet.length > 0) {
        errorMap[index] = errKeySet;
      }
    }
    if (__LOG__) console.timeEnd('QMValidator.eagle:校验耗时');
    if (async) {
      //异步校验
      return new Promise((resolve, reject) => {
        if (Object.keys(errorMap).length > 0) {
          resolve(errorMap);
        } else {
          reject(errorMap);
        }
      });
    } else {
      return errorMap;
    }

  }

  /**
   * table校验
   * @param {*} param
   */
  static eagleList({
    columns, dataSource
  }) {
    //校验结果容器
    let errorMap = {};
    let errorMsg = {};
    let rules = [];
    columns.forEach((v, k) => {
      let { dataIndex, rules } = v || {};
      if (dataIndex && rules && Object.keys(rules).length > 0) {
        for (let type in rules) {
          dataSource.forEach((vi, ki) => {
            let cellIndex = dataIndex + '-' + ki;
            let validFuc = QMValidator[type];
            let { async, param, rule, rel, msg } = rules[type] || {};
            if (typeof validFuc == 'function' && type != 'custom') {
              let value = vi[dataIndex];
              if (!validFuc.apply(null, [param, value, rule, rel, async])) {
                //
                if (!errorMsg[dataIndex]) {
                  errorMsg[dataIndex] = msg
                };
                //
                if (cellIndex in errorMap) {
                  errorMap[cellIndex].push(type);
                } else {
                  errorMap[cellIndex] = [type];
                }
              };
            }
          })
        }
      }
    });
    return {
      errorMap,
      errorMsg
    };
  }

  /**
   * Source校验
   *
   * @public
   * @param source
   * @param formSource
   * @param fuse 1:一级熔断;2:二级熔断;3:三级熔断 ['formSource','source','rules','rule']
   * @return {object} {name: ['phone','required', 'custom'],password: ['custom']}
   */
  static eagleEye({
    source, formSource, fuse = false
  }) {
    let { index, value, rules } = source || {};
    //错误校验规则存放集合
    let errKeySet = [];
    //source rules遍历&校验
    if (typeof rules === 'object') {
      for (let type in rules) {
        let validFuc = QMValidator[type];
        let { async, param, rule, rel } = rules[type] || {};
        //参数集
        const args = [];
        if (['required', 'custom'].includes(type)) {
          param = { index, source, formSource };
          args.push(param);
        } else if (typeof param != 'undefined') {
          args.push(param);
        }
        args.push(value);
        if (typeof rule === 'function') {
          args.push(rule);
        }
        if (typeof validFuc == 'function' && type != 'custom') {
          if (!validFuc.apply(null, args)) {
            errKeySet.push(type);
          };
        } else {
          console.warn(`Sorry :( QMValidator do not include #${type}# rule,please tell author to admit;or use custom rule.`);
        }
      }
    }
    return errKeySet;
  }

  /**
   * 
   * 自定义校验规则
   * @param {Object} param
   * @param {*} value
   * @param {function} rule
   */
  static custom(param, value, rule) {
    let pass = true;
    if (typeof rule === 'function') {
      pass = rule(param);
    } else {
      console.warn(`Sorry :( custom rule need a rule witch is a function.`);
    }
    return pass;
  }

  /**
   * 必填项
   * @param param
   * @param value
   */
  static required(param, value, rule) {

    if (typeof rule === 'function') {
      return rule(param);
    } else {
      if (typeof value == 'string') {
        return value.trim().length > 0;
      } else if (typeof value === 'boolean') {
        return value;
      } else if (typeof value === 'number') {
        return isNaN(value);
      } else if (value instanceof Array) {
        return value.length > 0
      } else {
        return !!value && Object.keys(value) > 0;
      }
    }
  }

  /**
   *  千米体系,账号用户名规则校验
   *  @param value
   *  @param param
   */
  static username(param, value) {
    let { min, max = 10, reg } = param || {};
    reg = new RegExp("^[0-9a-zA-Z\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]{1," + max + "}$");
    return reg.test(value);
  }

  /**
   *  千米体系,账号用户名规则校验
   *  @param value
   */
  static nickName(value) {
    return value != null && value != "" && value.length <= 20 &&
      /^(\w|[\u4E00-\u9FA5])*$/g.test(value) && !(/^\d+$/g.test(value))
  }

  /**
   *  千米体系,密码规则校验
   *  @param value
   */
  static password(value) {
    let pattern_1 = /[A-Z]/;  //大写字母
    let pattern_2 = /[`~!@#$%^&*()\-_+=\\|{}':;\",\[\].<>\/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]/;
    return value != null && value != ''
      && value.length >= 8
      && value.length <= 16 && (pattern_1.test(value) || pattern_2.test(value));
  }

  /**
   * 身份证校验
   * @param {*} value 
   * @param {*} param 
   */
  static cardNo(param, value) {
    var pass = true;

    if (param === true) {
      var len = value.length, re;
      if (len == 15)
        re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
      else if (len == 18)
        re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d)$/);
      else {
        return false;
      }
      var a = value.match(re);
      if (a != null) {
        if (len == 15) {
          var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
          var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4]
            && D.getDate() == a[5];
        } else {
          var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
          var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4]
            && D.getDate() == a[5];
        }
        if (!B) {
          return false;
        }
      }
      return true;
    }

    return pass;
  };


}