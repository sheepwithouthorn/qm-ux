/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * pagination
 */
import {Actor, Action} from 'iflux2';
import {OrderedMap} from 'immutable';

export default class ViewCellActor extends Actor {

  defaultState() {
    return {
      cellKey: '',                  //原数据唯一标示
      cellSelectType: 'checkbox',   //'checkbox' || 'radio'
      cellSelected: OrderedMap({}),             //勾选项{[index]:obj}对象异步存储容器
      cellSelectLimit: undefined    //Array || function || boolean || rule string
    }
  }

  @Action('init')
  init(state, {
    cellKey, cellSelectType, cellSelected, cellSelectLimit
  }) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      {cellKey, cellSelectType, cellSelected, cellSelectLimit}
    )
  }

  /**
   * 勾选项更新
   */
  @Action('cell:update')
  update(state, {cellSelected}) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      {cellSelected}
    )
  }

  /**
   * 去除全部勾选项目
   */
  @Action('cell:removeAll')
  delete(state) {
    return state.set('cellSelected', state.get('cellSelected').clear())
  }

}