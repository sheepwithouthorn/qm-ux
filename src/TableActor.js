/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description table_actor
 
 dataEditState:
1:  [X,Y]          //某一项
2:  []
3:  [null,Y]
4:  [X,null]
5:  true
6:  false
7:  [[X,Y],[X,Y],[X,Y]]
  
 */
import { Actor, Action } from 'iflux2';
import { List, OrderedMap } from 'immutable';

export default class TableActor extends Actor {

  defaultState() {
    return {
      tableColumns: List([]),            //列集合

      tableValidResult: OrderedMap({}),  //表格校验结果集合
      tableState: '',    //表格状态
    }
  }

  /**
   * 
   * @param {*} state 
   * @param {object} param
   */
  @Action('init')
  init(state, { tableColumns, tableState }) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      { tableColumns, tableState }
    )
  }

  /**
   * update
   * @param {*} state 
   * @param {*} parma
   */
  @Action('update')
  update(state, { tableColumns, tableState, tableValidResult }) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      { tableColumns, tableState, tableValidResult }
    )
  }

  /**
   * table 更新
   * @param {*} state 
   * @param {object} param
   */
  @Action('table:update')
  tableUpdate(state, { tableValidResult }) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      { tableValidResult }
    )
  }

  /**
   * Table列操作
   * @param {*} state 
   * @param {Array} columns 
   */
  @Action('columns:update')
  columnsUpdate(state, columns) {
    return state.set('tableColumns', columns);
  }

}