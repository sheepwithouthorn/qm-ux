/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description Table服务修饰器
 */
import React, {Component} from 'react';
import {Relax} from 'iflux2';
import {Map} from 'immutable';

import {dataSourceQL} from './DataSourceDefaultQL';

const noop = () => undefined;

export default function TableService(TableTarget) {

  //TableServiceContainer
  @Relax
  class TBSC extends Component {

    static defaultProps = {
      //protected:store里的保留字段，Relax会做merge处理
      viewType: undefined,          //视图
      netLoading: false,            //请求状态机
      tableColumns: {},             //列集合
      dataRemote: {},            //远程数据
      dataTotal: 0,              //数据总条目,若是本地数据，则返回dataSource.count().若是远程数据返回数据库字段
      dataSource: dataSourceQL,	 //数据数组	Array
      dataSorted: {},        //sort集合
      dataFilter: {},        //filter集合
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
      data:[],              //
      rowKey: '',           //
      refuse: false,        //拒绝使用relax注入变量
      columns: [],          //
      dataSourcePath: undefined,  //数据路径
      onRowClick: noop,           //row click callback

      //public
    };

    constructor(props) {
      super(props);
      let {columns, children} = props;
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
      this.state = {columns: tableColumns};
    }

    componentWillMount() {
      let {init, data, rowKey, refuse} = this.props;
      if (!refuse) {
        let {columns} = this.state;
        init({
          cellKey: rowKey, tableColumns: columns,
          dataSource: data || [],
          dataTotal: data && data.length ? data.length : 0
        });
      }
    }

    render() {
      let {
        tableColumns: columns, dataSourcePath, dataSource, netLoading: loading,
        cellSelected, onRefresh, onCurrentRefresh, cellSelectLimit,
        title, footer, dataSorted, onFilterChange, onFilterDropdown, dataFilter, dataTotal
      } = this.props;
      //sort
      dataSorted = Map.isMap(dataSorted) ? dataSorted.toJS() : dataSorted;
      dataFilter = Map.isMap(dataFilter) ? dataFilter.toJS() : dataFilter;
      //columns
      columns = columns && columns.toJS ? columns.toJS() : (columns || []);

      //column render
      columns = columns.map((v, k) => {
        let filterDropdown = undefined;
        if (v.filterDropdown) {
          filterDropdown = v.filterDropdown;
          v = Object.assign(v, {
            filterDropdown: <div className="custom-filter-dropdown"
                                 onBlur={() => onFilterDropdown(k, v.dataIndex, false)}>
              {
                filterDropdown({
                  index: k, dataIndex: v.dataIndex, column: v, value: dataFilter[v.dataIndex] || undefined,
                  dataFilter, onFilterChange, close: () => onFilterDropdown(k, v.dataIndex, false)
                })
              }
            </div>,
            filterDropdownVisible: v.filterDropdownVisible,
            onFilterDropdownVisibleChange: v => {
              if (v && v.onFilterDropdownVisibleChange && typeof v.onFilterDropdownVisibleChange == 'function') {
                v.onFilterDropdownVisibleChange();
              }
              onFilterDropdown(k, v.dataIndex, v)
            }
          });
        }
        if (v && v.render && typeof v.render === 'function') {
          let render = v.render;
          v.render = (text, record, index) =>
            render({index, text, row: record, cellSelected, dataSource, onRefresh, onCurrentRefresh})
        } else if (v && v.render && React.isValidElement(v.render)) {
          v.render = (text, record, index) => React.cloneElement(v.render, {
            index, text, row: record,
            cellSelected, dataSource, onRefresh, onCurrentRefresh
          })
        }
        //sort
        if (v.dataIndex in dataSorted) {
          v.sortOrder = dataSorted[v.dataIndex];
        }
        return v;
      }).filter((v) => {
        if (v.show == undefined || v.show == true) {
          return v;
        }
      });

      let extraProps = {
        dataSorted, dataFilter, dataTotal, dataSource
      };

      //title Render
      let titleNode = undefined;
      if (!!title) {
        if (typeof title === 'function') {
          titleNode = (currentPageData) => title(extraProps);
        } else if (React.isValidElement(title)) {
          titleNode = (currentPageData) => React.cloneElement(title, {...extraProps});
        }
      }

      //footer Render
      let footerNode = undefined;
      if (!!footer) {
        if (typeof footer === 'function') {
          footerNode = (currentPageData) => footer(extraProps);
        } else if (React.isValidElement(footer)) {
          footerNode = (currentPageData) => React.cloneElement(footer, {...extraProps});
        }
      }

      //dataSource pack
      let tableSource = dataSource;
      if (!!dataSourcePath) {
        if (typeof dataSourcePath == 'string') {
          let path = dataSourcePath.split('.');
          tableSource = path.length == 1 ? dataSource.get(path[0]) : dataSource.getIn(path);
        } else if (dataSourcePath instanceof Array) {
          tableSource = dataSource.getIn(dataSourcePath);
        } else if (typeof dataSourcePath == 'function') {
          tableSource = dataSourcePath(dataSource.toJS());
        }
      }

      //immutable => obj
      dataSource = dataSource && dataSource.toJS ? dataSource.toJS() : (dataSource || []);
      cellSelected = cellSelected && cellSelected.toJS ? cellSelected.toJS() : (cellSelected || {});
      cellSelectLimit = cellSelectLimit && cellSelectLimit.toJS ? cellSelectLimit.toJS() : (cellSelectLimit || []);

      return (
        <TableTarget
          {...this.props}
          loading={loading} columns={columns}
          cellSelected={cellSelected} cellSelectLimit={cellSelectLimit}
          dataSource={tableSource && tableSource.toJS ? tableSource.toJS() : tableSource} dataSorted={dataSorted}
          title={titleNode} footer={footerNode}
        />
      )
    }

  }

  return TBSC;

}