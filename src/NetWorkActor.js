/**

 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description NetWorkActor
 */
import {Actor, Action} from 'iflux2';
import {OrderedMap} from 'immutable';

export default class NetWorkActor extends Actor {

  defaultState() {
    return ({
      netLoading: false,	   //网络请求状态
      netHost: "",        //获取数据，请求域
      netUrl: "",         //获取数据，url
      netResponse: OrderedMap({}),   //获取数据，返回对象存储
      netPre: undefined,   //请求前
      net: undefined,     //请求体,return Promise
      netPost: undefined,  //请求后
      netErrorCall: undefined,  //网络请求异常call

      pushHost: "",      //请求域,自带端口
      pushUrl: "",       //数据提交请求url
      pushPre: undefined,     //提交请求前
      push: undefined,        //提交请求,return Promise
      pushPost: undefined    //提交请求后
    })
  }

  /**
   * 初始化AppStore
   */
  @Action('init')
  init(state, {
    netHost, netUrl, netResponse, netPre, net, netPost,
    pushHost, pushUrl, pushPre, push, pushPost
  }) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      {
        netHost, netUrl, netResponse, netPre, net, netPost,
        pushHost, pushUrl, pushPre, push, pushPost
      }
    )
  }

  /**
   * 数据获取请求，返回对象更新
   */
  @Action('update')
  fetch(state, {netResponse}) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      {netResponse}
    )
  }

  /**
   * 加载状态修改
   */
  @Action('net:loading')
  loading(state, loading) {
    return state.set('netLoading', loading);
  }

}