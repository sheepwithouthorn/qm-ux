/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description Table service加持
 *
 */
import React, {Component} from 'react';
import {Relax} from 'iflux2';
import {TableUI} from 'qm-ui';

import TableService from './TableService';

const noop = () => undefined;

@TableService
export default class Table extends TableUI {
}

class Column extends Component {

  static defaultProps = {
    __isColumn: true
  };

  constructor(props) {
    super(props);
  }

  render() {
    return null;
  }

}

@Relax
class ColumnsManager extends Component {

  static defaultProps = {
    sortable: false,
    tableColumns: {},
    onColumnsChange: noop
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {tableColumns} = this.props;
    return (
      <TableUI.ManagerUI {...this.props} columns={tableColumns}/>
    )
  }
}

Table.Column = Column;
Table.ColumnsManager = ColumnsManager;