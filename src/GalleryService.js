/**
 * @author gcy[of1518]
 * @date 16/10/17
 *
 * @description gallery 服务提供修饰器
 */
import React, {Component} from 'react';
import {Relax} from 'iflux2';

const noop = () => undefined;

export default function GalleryService(GalleryTarget) {

  //GalleryServiceContainer
  @Relax
  class GalleryServiceContainer extends Component {

    static defaultProps = {
      //protected
      cellKey: '',              //
      cellSelectLimit: false,           //Array||[Function]||(false || null)
      cellSelected: {},   //
      cellSelectType: "checkout",   //行旋转方式，checkout:多选；radio:单选
      netLoading: false,           //是否加载动画效果
      dataTotal: 0,                //数据总条目,若是本地数据，则返回dataSource.count().若是远程数据返回数据库字段
      dataRemote: true,            //远程数据
      dataSource: {},	             //数据数组	Array

      //private
      defaultData: [],
      itemKey: '',             //
      selectType: 'checkout',  //
      dataSourcePath: undefined,  //数据路径
      onRowClick: noop,           //row clickHandle
      span:3,
      itemClass:"",
      onRowClick: noop,           //row clickHandle   [Function(record, index)]

      //public
      onRefresh: noop,
      onCellSelect: noop,
      onFormReset: noop,
      elementOnChange: noop,
      onDataItemChange:noop,
      init: noop
    };

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      let {init, selectType, defaultData} = this.props;
      init({
        cellSelectType: selectType,
        dataSource: defaultData || [],
        dataTotal: defaultData && defaultData.length ? defaultData.length : 0,
        dataRemote: false
      });
    }

    render() {
      return <GalleryTarget {...this.props}/>
    }

  }

  return GalleryServiceContainer;
}