/**
 * @author gcy[of1518]
 * @date 17/1/5
 *
 * @description Table service加持
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import { Relax } from 'iflux2';
import { TableUI } from 'qm-ui';

import EditTableService from './EditTableService';
const noop = () => undefined;

@EditTableService
export default class EditTable extends TableUI {
}

@Relax
class EditCell extends Component {

  static defaultProps = {
    prefixCls: 'ant-form',  //
    hasFeedback: false,     //
    validState: '',         //校验状态,'success', 'warning', 'error', 'validating'
    value: [],       //value
    onTableCellChange: noop,  //onChange

    formatValue: undefined,
    rowIndex: NaN,   //
    colIndex: "",    //
    cellIndex: "",
    dataSourcePath: undefined  //数据路径
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {
      rowIndex, colIndex,
      value, onTableCellChange: onChange, formatValue,
      prefixCls, hasFeedback, validState, children
    } = this.props;


    let classes = classNames({
      [`${prefixCls}-item`]: true,
      'has-feedback': hasFeedback,
      'has-success': validState === 'success',
      'has-warning': validState === 'warning',
      'has-error': validState === 'error',
      'is-validating': validState === 'validating',
    });


    children = React.Children.map(children, (child, k) => {
      let props = {
        value: value,
        onChange: (data, extra) => {
          if (child.props.onChange && typeof child.props.onChange == 'function') {
            child.props.onChange(data, extra);
          }
          let value = data;
          if (typeof formatValue === 'function') {
            value = formatValue(data);
          }
          return onChange({ rowIndex, colIndex, value, extra })
        }
      };
      if (child && !child.props.size) {
        props.size = 'default';
        return React.cloneElement(child, props);
      }
      return React.cloneElement(child, props);
    });

    return <div className={`${prefixCls}-item-control ${classes}`}>
      {children}
    </div>
  }

}

EditTable.EditCell = EditCell;