/**
 * @author gcy[of1518]
 * @date 16/11
 *
 * @description BasicActor
 */
import {Actor, Action} from 'iflux2';

export default class BasicActor extends Actor {

  defaultState() {
    return {
      __init: false,      //是否初始化
      __hash: '',         //当前装配组件hash值,浏览器本地持久化使用
    }
  }

  /**
   * 由于iflux2在store-provider的容器组件中的componentDidMount方法中才绑定监听，
   * 使用iflux2开发的组件，必须在顶层组件进行一次全局的init,重新render.
   */
  @Action('__init')
  init(state, {__hash}) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      {__init: true, __hash}
    )
  }

  /**
   * 全局通用
   * TODO:大利器，还没想好怎么使用这个,后期会支持注入私有Actor,这个方法暂时不加
   */
  @Action('insert')
  insert(state, {key, value}) {
    return state.set(key, value);
  }

}