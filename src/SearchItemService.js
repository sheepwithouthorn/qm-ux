/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description SearchItem 服务修饰器
 */
import React, { Component } from 'react';
import { Relax } from 'iflux2';
import { Map, fromJS } from 'immutable';

import { formDataQL } from './FormDefaultQL'
const noop = () => undefined;

export default function SearchItemService(ItemTarget) {

  @Relax
  class SearchItemServiceContainer extends Component {

    static defaultProps = {
      //protected
      formSource: {}, //表单对象
      formData: formDataQL,
      elementInit: noop,     //元素初始化
      elementOnChange: noop,  //element onChange

      //private
      show: '',
      index: '',             //子元素唯一标识
      label: '',             //label 标签
      group: '',    //'simple' || 'advance'
      hidden: false,       //隐藏域    boolean || func
      extra: null,           //额外数据缓存,解决复杂表单数据的数据缓存问题
      syncSearch: false,     //同步查询
    };

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      let {
        value, children, index, extra, group, show, elementInit
      } = this.props;
      if (React.isValidElement(children) && children) {
        value = children.props.defaultValue || undefined;
      }

      if (!!JSON.stringify(index)) {
        //判断是否有唯一值,否则不更新formSource
        elementInit({
          index, value, group, show, extra
        });
      }
    }

    render() {
      let {
        index, formSource, formData, hidden
       } = this.props;
      let source = Map.isMap(formSource) ? formSource.get(index) : formSource[index];
      let { value, extra } = Map.isMap(source) ? source.toJS() : (source || {});

      let targetNode = <ItemTarget
        {...this.props}
        index={index}
        value={value}
        extra={extra}
        onChange={this.onChange} />;

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
      let {
        formSource, elementOnChange, syncSearch, group
      } = this.props;
      let source = Map.isMap(formSource) ? formSource.get(index) : formSource[index];
      source = fromJS(source).toJS();
      elementOnChange({
        index, syncSearch, source: Object.assign(source, { index, value, extra }), group
      })
    }
  }

  return SearchItemServiceContainer
}