/**
 * @author gcy[of1518]
 * @date 2016.11
 *
 * @description FormProvider from相关资源获取运算方法提供
 */

import { Map, Set, fromJS } from 'immutable';

import QMValidator from './QMValidator';

class FormProvider {

  //默认
  defaultSource = Map({
    index: undefined,
    value: undefined,
    label: undefined,
    rules: undefined,
    group: undefined,
    required: undefined,
    hiiden: undefined,
    msg: undefined,
    help: undefined,
    status: undefined,
    extra: undefined
  });

  /**
   * 表单组件元素初始化
   */
  elementInit(param) {
    this.dispatch('element:update', param);
  };

  /**
   * 搜索表单元素值变化
   */

  elementOnChange(param) {
    let _this = this;
    let { source } = param || {};
    this.dispatch('element:update', source);
    let errKeySet = QMValidator.eagleEye({ source });
    this.batchDispatch([
      ['element:update', source],
      ['element:valid', { index: source['index'], value: errKeySet }]
    ]);
  };

  /**
   * 修改表单状态
   */
  changeFormState = (state) => {
    this.dispatch('form:update', { formState: state });
  };


  // /**
  //  * 单跳数据校验
  //  */
  // async elementValid(param) {
  //   let { index, source, syncValid } = param || {};

  //   if (!!syncValid) {
  //     await QMValidator.eagleEye({ source });
  //   } else {
  //     QMValidator.eagleEye({ source }).then(res => {

  //     });
  //   }
  // };


  /**
   * 获取form source
   * @param param
   * @return object
   */
  getFormSource(param) {
    let { group, useSnap, useHidden = true } = param || {};
    let formSource = this._state.get(useSnap ? "formSnapSource" : "formSource");
    if (!Map.isMap(formSource)) {
      formSource = fromJS(formSource);
    }
    return formSource.filter((v, k) => !group || (group && v.get('group') == group) || !v.get('group')).toJS();
  }

  /**
   * 表单校验
   * @param source
   * @return object 校验未通过字段集合
   */
  formValid(formSource) {
    let _this = this;
    return QMValidator.eagle({ formSource });
  };


  /**
   * 装配form data
   * @param source
   * @return object:{[key]:value,....}
   */
  packDataFromSource(source) {
    let _this = this;
    let data = {};
    for (let key in source) {
      typeof key === 'string' && key.includes(';') ?
        key.split(';').map(v => {
          data[v] = typeof source[key]['value'] === 'object' ? source[key]['value'][v] : source[key]["value"];
        })
        :
        data[key] = source[key]['value'];
    }
    return data;
  }

  /**
   * 装配source
   * @param source
   * @return object:{[key]:{index:key,value:...},....}
   */
  packSourceFromData(param) {
    let _this = this;
    let { data = {}, source = {} } = param || {};
    let dataKeys = Set(Object.keys(data));
    for (let key in source) {
      if (typeof key === 'string' && key.includes(';')) {
        let value = {};
        key.split(';').map(vi => {
          dataKeys = dataKeys.delete(vi);
          value[vi] = data[vi];
        })
        source[key] = Object.assign(source[key], { value });
      } else if (key in data) {
        dataKeys = dataKeys.delete(key);
        source[key] = Object.assign(source[key], { value: data[key] });
      }
    }
    if (dataKeys.count() > 0) {
      dataKeys.forEach(key => {
        source[key] = Object.assign(_this.defaultSource.toJS(), { index: key, value: data[key] });
      })
    }
    return source;
  }
}

export default new FormProvider();