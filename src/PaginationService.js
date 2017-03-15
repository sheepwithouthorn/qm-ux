/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description Pagination服务修饰器
 */
import React, { Component } from 'react';
import { Relax } from 'iflux2';
const noop = () => undefined;

export default function PaginationService(PageTarget) {

  //PaginationServiceContainer
  @Relax
  class PGSC extends Component {

    static defaultProps = {
      //protected
      pageSize: 0,            //每页条数	Number
      pageCurrent: 0,	            //当前页数:Number
      dataTotal: 0,        //数据总数	Number	0

      init: noop,
      onPageChange: noop,         //分页回调 Function(current:number, pageSize:number)

      //private
      className: "pull-right pusht",
      current: 1,//默认页码
      size: 10,//默认页面规格
      netLoading:false
    };

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      let {init, current, size} = this.props;
      let pageCurrent = current && !isNaN(current) ? current : 1;
      let pageSize = size && !isNaN(size) ? size : 1;
      init({
        pageable: true, pageCurrent, pageSize
      });
    }

    render() {
      let {dataTotal, pageCurrent, onPageChange, onChange, onShowSizeChange} = this.props;

      return <PageTarget {...this.props}
        total={dataTotal} current={pageCurrent}
        onChange={(pageCurrent, pageSize) => {
          if (onChange && typeof onChange === 'function') onChange(pageCurrent, pageSize,dataTotal);
          onPageChange({ pageCurrent, pageSize ,dataTotal});
        }}
        onShowSizeChange={(pageCurrent, pageSize) => {
          if (onShowSizeChange && typeof onShowSizeChange === 'function') onShowSizeChange(pageCurrent, pageSize);
          onPageChange({ pageCurrent: 1, pageSize ,dataTotal});
        }}/>
    }
  }

  return PGSC

}