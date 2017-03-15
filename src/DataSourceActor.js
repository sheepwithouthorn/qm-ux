/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description DataSourceActor
 * 
 */
import { Actor, Action } from 'iflux2';
import { fromJS } from 'immutable';

export default class DataSourceActor extends Actor {

  defaultState() {
    return {
      dataTotal: 0,             //数据总条目,若是本地数据，则返回dataSource.count().若是远程数据返回数据库字段
      dataRemote: true,         //是否为远程数据
      dataSource: [],           //本地初始化数据
      dataSnapSource: [],       //本地初始化快照数据
      dataSorted: {},           //排序集合
      dataFilter: {},           //过滤参数集合
    };
  }

  /**
   * 通用init
   */
  @Action('init')
  init(state, { dataTotal, dataRemote, dataSource }) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      { dataTotal, dataRemote, dataSource }
    )
  }

  /**
   * 通用Actor state更新使用action
   * @param {*} state
   */
  @Action('update')
  update(state, { dataTotal, dataRemote, dataSource }) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      { dataTotal, dataRemote, dataSource }
    )
  }

  /**
   * 过滤
   */
  @Action("data:filter")
  filter(state, { index, value, single }) {
    if (!!single) {
      return state.set('dataFilter', { index, value });
    } else {
      if (state.getIn(['dataFilter', index]) == undefined) {
        return state.set('dataFilter', { [index]: { index, value } });
      } else {
        return state.setIn(['dataFilter', index], value);
      }
    }
  }

  /**
   * 清空过滤条件
   */
  @Action("data:filter:clear")
  filterClear(state) {
    return state.set('dataFilter', {});
  }

  /**
   * 排序
   */
  @Action("data:sort")
  sort(state, { index, value, single }) {
    if (!!single) {
      return state.set('dataSorted', { [index]: value });
    } else {
      if (state.getIn(['dataSorted', index]) == undefined) {
        return state.set('dataSorted', { [index]: { index, value } });
      } else {
        return state.setIn(['dataSorted', index], value);
      }
    }
  }

  /**
   * cell update
   */
  @Action("data:cell:update")
  dataCellUpdate(state, param) {
    let { rowIndex, colIndex, value } = param || {};
    return state.setIn(['dataSource', rowIndex, colIndex], value);
  }

  /**
   * 
   */
  @Action("data:deleteByIndex")
  deleteSourceByIndex(state, param) {
    let { rowIndex } = param || {};
    
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  /**
   * 清空排序条件
   */
  @Action("data:sort:clear")
  sortClear(state) {
    return state.set('dataSorted', {});
  }

  /**
   * dataSource merge
   */
  @Action("data:itemChange")
  dataItemChange(state, { path, value }) {
    return state.setIn(['dataSource'].concat(path), value);
  }

}