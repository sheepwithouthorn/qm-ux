/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description Table服务修饰器
 */
import React, { Component } from 'react';
import { Relax } from 'iflux2';
import { Map } from 'immutable';

import { dataSourceQL } from './DataSourceDefaultQL';

const noop = () => undefined;

export default function EditTableService(TableTarget) {

  //TableServiceContainer
  @Relax
  class TBSC extends Component {

    static defaultProps = {
      //protected:store里的保留字段，Relax会做merge处理
      viewType: undefined,          //视图
      netLoading: false,            //请求状态机
      tableColumns: {},             //列集合
      tableValidResult: {},          //table 校验集合
      dataRemote: {},            //远程数据
      dataTotal: 0,              //数据总条目,若是本地数据，则返回dataSource.count().若是远程数据返回数据库字段
      dataSource: {},	 //数据数组	Array
      dataSorted: {},        //sort集合
      dataFilter: {},        //filter集合
      tableState: '',          //
      cellKey: '',           //
      cellSelected: {},      //原数据选择项
      cellSelectType: "checkout", //选择类型

      init: noop,              //init(param)
      onRefresh: noop,         //table刷新
      onCurrentRefresh: noop,  //当前页刷新
      onCellSelect: noop,      //行操作回调
      onSortChange: noop,      //排序响应
      onFilterChange: noop,    //过滤
      onFilterDropdown: noop,   //

      //private
      data: [],              //
      rowKey: '',           //
      refuse: false,        //拒绝使用relax注入变量
      columns: [],          //
      dataSourcePath: undefined,  //数据路径
      onRowClick: noop,           //row click callback

      //public
    };

    constructor(props) {
      super(props);
      let { columns, children } = props;
      let tableColumns = [];
      if (!(columns instanceof Array && columns.length > 0) &&
        React.Children.count(children) > 0) {
        if (children instanceof Array) {
          children.filter((v) => {
            let security = v.props.security;
            if (security == undefined || security) {
              return v;
            }
          }).forEach((v) => {
            if (React.isValidElement(v)) {
              tableColumns.push(v.props)
            }
          });
        } else {
          if (React.isValidElement(children)) {
            tableColumns = [children.props]
          }
        }
      } else {
        tableColumns = columns;
      }
      this.state = { columns: tableColumns };
    }

    componentWillMount() {
      let { init, data, rowKey, refuse } = this.props;
      if (!refuse) {
        let { columns } = this.state;
        init({
          cellKey: rowKey, tableColumns: columns,
          dataSource: data || [],
          dataTotal: data && data.length ? data.length : 0,
          tableState: "edit"
        });
      }
    }

    render() {
      let {
        tableColumns: columns, tableValidResult, dataSourcePath, dataSource, tableState,
        netLoading: loading,
        cellSelected, onRefresh, onCurrentRefresh, cellSelectLimit,
        title, footer, dataSorted, onFilterChange, onFilterDropdown, dataFilter, dataTotal
      } = this.props;

      //sort
      dataSorted = Map.isMap(dataSorted) ? dataSorted.toJS() : dataSorted;
      dataFilter = Map.isMap(dataFilter) ? dataFilter.toJS() : dataFilter;
      tableValidResult = tableValidResult.toJS ? tableValidResult.toJS() : tableValidResult;
      //columns
      columns = columns && columns.toJS ? columns.toJS() : (columns || []);

      //column render
      columns = columns.map((v, k) => {

        if (typeof v.render === 'function') {
          let render = v.render;
          v.render = (text, record, index) => {
            let cellIndex = v.dataIndex + '-' + index;
            let validState = cellIndex in tableValidResult ? "error" : "";
            return render({
              index, text, row: record, cellSelected, dataSource,
              tableState, validState
            });
          }
        } else if (v.render && React.isValidElement(v.render)) {
          let render = v.render;
          v.render = (text, record, index) => {
            let cellIndex = v.dataIndex + '-' + index;
            let validState = cellIndex in tableValidResult ? "error" : "";
            let p = {
              cellIndex, rowIndex: index, colIndex: v.dataIndex,
              index, text, row: record, cellSelected, dataSource,
              tableState, validState, value: text
            };
            return React.cloneElement(render, { ...p });
          }
        }
        return v;
      });

      //immutable => obj
      dataSource = dataSource && dataSource.toJS ? dataSource.toJS() : (dataSource || []);
      cellSelected = cellSelected && cellSelected.toJS ? cellSelected.toJS() : (cellSelected || {});
      cellSelectLimit = cellSelectLimit && cellSelectLimit.toJS ? cellSelectLimit.toJS() : (cellSelectLimit || []);
      return (
        <TableTarget
          {...this.props}
          loading={loading} columns={columns}
          cellSelected={cellSelected}
          cellSelectLimit={cellSelectLimit}
          dataSource={dataSource}
          dataSorted={dataSorted} />
      )
    }

  }

  return TBSC;

}