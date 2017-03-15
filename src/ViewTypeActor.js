/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description ViewTypeActor
 */
import {Actor, Action} from 'iflux2';

export default class ViewTypeActor extends Actor {

  defaultState() {
    return {
      viewType: '',    //数据面板展现标示
      viewTypes: []    //数据面板展现形式集
    };
  }

  @Action('init')
  init(state, {viewType, viewTypes}) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      {viewType, viewTypes}
    )
  }

  /**
   * 数据面板展现形式修改
   * @param state
   * @param type
   */
  @Action('view:changeType')
  changeType(state, type) {
    return state.set('viewType', type)
  }

}