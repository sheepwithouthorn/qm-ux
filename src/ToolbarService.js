/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description ToolBar 工具栏服务修饰器
 */
import React, {Component} from 'react';
import {Relax} from 'iflux2';
import {formDataQL, formSnapData} from './FormDefaultQL';

const noop = () => undefined;

export default function ToolbarService(ToolbarTarget) {

  //ToolBarServiceContainer
  @Relax
  class TBSC extends Component {

    static defaultProps = {
      //protected:store里的保留字段，Relax会做merge处理
      formSource: {},    //获取form组件下表单对象全部集合
      formData: formDataQL,        //获取form组件下表单对象集合
      formSnapSource: {},    //获取form组件下表单对象全部集合
      formSnapData: formSnapData,    //获取form组件下表单对象全部集合
      dataTotal: 0,         //获取所有数据条数
      dataSource: {},      //获取所有数据集合
      tableColumns: {},             //table组件下columns集合
      cellSelected: {},     //获取表格、列表、画廊子元素选择子对象
      cellSelectSet: [],

      onRefresh: noop,        //
      onCurrentRefresh: noop
    };

    render() {
      return <ToolbarTarget {...this.props}/>
    }

  }

  return TBSC;

}