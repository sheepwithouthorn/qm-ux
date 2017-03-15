/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description 事务流
 */
import {Actor, Action} from 'iflux2';

export default class TaskFlowActor extends Actor {

  defaultState() {
    return {
      step: 1,          //任务流数据机
      flow: {}          //任务流数据集
    };
  }

  @Action('init')
  init(state, {flow, step}) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      {flow, step}
    )
  }

  /**
   * 任务流数据集更新
   */
  @Action('flow:update')
  update(state, {flow, step}) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      {flow, step}
    )
  }

}
