/**
 * @author gcy[of1518]
 * @date 16/09/30
 *
 * @description 分页组件actor
 * @remarks
 */
import {Actor, Action} from 'iflux2';

export default class PaginationActor extends Actor {

  defaultState() {
    return {
      pageable: false,         //是否分页
      pageCurrent: null,        //当前页数 number
      pageSize: null,            //每页条数	number
      pageCache: false,    //分页缓存：场景：滚动分页，数据叠加
    }
  }

  @Action('init')
  init(state, {pageCurrent, pageSize, pageable}) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      {pageCurrent, pageSize, pageable}
    )
  }

  /**
   * 页码跳转
   */
  @Action("page:update")
  update(state, {pageCurrent, pageSize}) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      {pageCurrent, pageSize}
    )
  }

}