/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description Form Element服务修饰器
 *

 入参:
 rules: {
   phone:{message: '请填写正确手机号码!'},
   required:{
     rule: ({fromSource})=> {
       return fromSource.get('phone') != null || fromSource.get('tel') != null
     },
     message: '手机号码与电话号码不得为空!'
   },
   range:{
    param:[1,10],
    message:'数值不在范围内!'
   },
   custom:{
     rule: ({formState, elementSource})=> {
       return formState === elementSource;
     },
     message: '两次填写的密码不对'
   }
 }

 结果:返回更轻的数据结构
 {
   name: ['phone','required', 'custom'],
   password: ['custom']
 }

 Object.getOwnPropertyNames(errors).length === 0

 *
 */
import React, { Component } from 'react';
import { Relax } from 'iflux2';
import { Map, fromJS } from 'immutable';

import { formDataQL } from './FormDefaultQL'
const noop = () => undefined;

export default function ElementService(ElementTarget) {

  //ElementServiceContainer
  @Relax
  class ELSC extends Component {

    static defaultProps = {
      //protected
      validState: "", //校验状态
      formData: formDataQL,
      formState: "",  //'' || 'edit' || 'audit', 默认状态,编辑状态,审核状态
      formSource: {}, //表单对象
      formValidResult: {},  //校验返回
      tableValidResult: [],
      elementInit: noop,     //元素初始化
      elementOnChange: noop,  //element onChange

      //private
      formatValue: undefined,
      group: '',             //元素分组
      index: '',             //子元素唯一标识
      label: '',             //label 标签的文本
      rules: {},             //校验规则
      extra: null,           //额外数据缓存,解决复杂表单数据的数据缓存问题

      //extra
      required: false,        //是否必填
      hidden: false,          //隐藏域    boolean || func
      status: '',            //校验状态,'success', 'warning', 'error', 'validating'
      msg: '', 	             //提示信息,如不设置，则会根据校验规则自动生成	string
      help: ''	             //帮助信息
    };

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      let {
        value, children,
        index, label, rules, extra, group, hidden, status, msg, help,
        elementInit
      } = this.props;
      let required = typeof rules === 'object' && 'required' in rules;

      if (React.isValidElement(children)) {
        value = children.props.defaultValue || undefined;
      } else if (children instanceof Array && React.isValidElement(children[0])) {
        value = children[0].props.defaultValue || undefined;
      }

      //判断是否有唯一值,否则不更新formSource
      elementInit({
        index, value, label, rules, group, hidden, msg, help, status, extra
      });
    }

    render() {
      let {
        index, formSource, formData,
        formValidResult, rules, hidden
       } = this.props;
      let source = Map.isMap(formSource) ? formSource.get(index) : formSource[index];
      let { value, extra } = Map.isMap(source) ? source.toJS() : (source || {});
      if (Map.isMap(formValidResult)) {
        formValidResult = formValidResult.toJS();
      }
      let validResult = formValidResult[index];
      let msg = "", status = "";
      if (rules && validResult && validResult instanceof Array) {
        msg = rules[validResult[0]]['msg'];
        status = "error";
      }

      let targetNode = <ElementTarget
        {...this.props}
        value={value} msg={msg} status={status}
        extraValue={extra} onChange={this.onChange} />;

      //hidden
      if (typeof hidden === 'boolean' && hidden) {
        targetNode = null;
      } else if (typeof hidden === 'function' && hidden({ formData })) {
        targetNode = null;
      }

      return targetNode;
    }

    /**
     * 元素组件出发请求
     */
    onChange = ({ index, value, extra }) => {
      let { formSource, elementOnChange, syncSearch, group } = this.props;
      let source = Map.isMap(formSource) ? formSource.get(index) : formSource[index];
      source = fromJS(source).toJS();
      elementOnChange({
        index, syncSearch, source: Object.assign(source, { index, value, extra }), group
      })
    }

  }

  return ELSC
}