/**
 * @author gcy[of1518]
 * @date 2016.11
 *
 * @description dataViewStore
 *
 * TODO:  1.0.0后会有大的改动，Store的所有方法将会进行抽象、简化、统一。以及对disPatch做统一入参包装。
 * 请继承该类或者私自注入store方法的，勿使用将会移除的方法
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * 请勿注入或使用将会移除的方法
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
import { Store } from 'iflux2';
import { fromJS } from 'immutable';

import QMFetch from './QMFetch';
import BasicActor from './BasicActor';
import DataSourceActor from './DataSourceActor';
import ViewTypeActor from './ViewTypeActor';
import ViewCellActor from './ViewCellActor';
import FormActor from './FormActor';
import PaginationActor from './PaginationActor';
import TableActor from './TableActor';
import NetWorkActor from './NetWorkActor';
import FormProvider from './FormProvider';
import ObjectUtil from './ObjectUtil';

export default class DataViewStore extends Store {

  bindActor() {
    return [
      new BasicActor,
      new NetWorkActor,
      new DataSourceActor,
      new ViewTypeActor,
      new FormActor,
      new PaginationActor,
      new ViewCellActor,
      new TableActor
    ];
  }

  /**
   * dispatch代理
   */
  _dispatch = (name, param) => this.dispatch(name, param);

  /**
   * 批量batchDispatch代理
   */
  _batchDispatch = (param) => this.batchDispatch(param);

  /**
   * 顶层组件初始化
   * 备注：由于iflux2在绑定监听所使用的方法的生命周期问题，
   * 这边必须在组件顶层对组件进行整体刷新
   * 从而达到组件re-render的实现
   */
  initial = (param) => {
    let { hash } = param || {};
    //debug
    if (this.debug && !!hash) {
      window[hash] = this;
    }
    this.dispatch('__init', { __hash: hash || Math.random() })
  };

  /**
   * 组件初始化通用方法
   */
  init = (param) => this.dispatch('init', param);

  /**
   * 清除
   */
  onReset = () => this.dispatch('reset');

  /**
   * 表单元素初始化
   */
  elementInit = (param) => {
    this.dispatch('element:update', param);
  };

  /**
   * 搜索表单元素值变化
   */
  elementOnChange = (param) => {
    let { index, source, syncSearch, group, clearGroup } = param || {};
    if (!index || !source['index']) {
      throw ('element onchange need a index! FormStore:[Func]itemOnChange,elementService call it!');
    }
    this.dispatch('element:update', source);
    if (syncSearch) this.onFetch({ group });
  };

  /**
   * TODO 1.0.0版本后废弃，请使用this.onPageRefresh
   * 搜索表单元素值变化
   */
  elementClear = (index) => {
    //1:valid
    if (!index) {
      throw ('element onchange need a index! FormStore:[Func]itemOnChange,elementService call it!');
    }
    // 2:element change
    this.dispatch('element:delete', { index });
  };

  /**
   * 表单清空
   */
  onFormReset = (group) => this.dispatch("form:reset", group);

  /**
   * 切换分组
   * 场景：SearchForm切换分组时，对其他分组的form数据进行清空
   */
  onFormChangeGroup = (group, clearGroup) => {
    //TODO:这里有个问题，group修改后，ActorState更改了，但是store没有
    this.dispatch({ type: 'form:update', value: { formCurrentGroup: group } });
    this.batchDispatch([
      'data:filter:clear',
      'data:sort:clear',
      ['form:reset', clearGroup],
      ['page:update', { pageCurrent: 1 }],
      ['net:loading', true]
    ]);
    this.fetchData();
  };

  /**
   * TODO 1.0.0版本后废弃，请使用this.onPageRefresh
   * table刷新 ｜ 刷新到第一页
   * 场景：dataSource 数据有添加｜删除｜编辑需要和服务器同步的情况下使用
   */
  onRefresh = () => {
    this.batchDispatch([
      ['cell:removeAll'],
      ['page:update', { pageCurrent: 1 }],
      ['net:loading', true]
    ]);
    this.fetchData();
  };

  /**
   * TODO 1.0.0版本后废弃，请使用this.onPageRefresh
   * 当前页刷新 | 当前条件重新发送请求
   * 场景：dataSource 数据有添加｜删除｜编辑需要和服务器同步的情况下使用
   */
  onCurrentRefresh = () => {
    this.batchDispatch([
      ['cell:removeAll'],
      ['net:loading', true],
    ]);
    this.fetchData()
  };

  /**
   * 页面重新请求的本质是什么？？？？？？？？？？？？？？
   * 场景：dataSource 数据有添加｜删除｜编辑需要和服务器同步的情况下使用
   */
  onPageRefresh = (param) => {
    let { cellSelectRemove, pageCurrent } = param;
    this.batchDispatch([
      ['cell:removeAll'],
      ['page:update', { pageCurrent }],
      ['net:loading', true]
    ]);
    this.fetchData()
  };

  /**
   * 远程数据获取异步请求
   */
  onFetch = (param) => {
    let {
      url, host, group, netPre, net, netPost,
      useSnap, createSnap
    } = param || {};

    //TODO:这里不知道为啥也出现了这个问题
    this.dispatch('data:filter:clear');
    this.dispatch('data:sort:clear');
    this.batchDispatch([
      ['page:update', { pageCurrent: 1 }],
      ['net:loading', true]
    ]);
    this.fetchData({ url, host, netPre, net, netPost, group, useSnap, createSnap })
  };

  /**
   *  数据获取
   *  url  请求url
   *  host 请求域
   *  group  执行分组
   *  netPre 请求前cb
   *  net  外部请求方法
   *  netPost  请求返回cb
   *  useSnap  使用快照数据
   *  createSnap 是否创建快照
   */
  fetchData = async (param) => {
    let {
      url, host, group, netPre, net, netPost,
      useSnap, createSnap, mode
    } = param || {};
    let res = {};
    group = group || this._state.get('formCurrentGroup');
    netPre = netPre || this._state.get('netPre');
    net = net || this._state.get('net');
    netPost = netPost || this._state.get('netPost');
    url = url || this._state.get('netUrl');
    host = host || this._state.get('netHost');
    //param
    let option = this.getParam(group, useSnap);
    //pre
    if (netPre && typeof netPre === 'function') {
      option = netPre(option);
    }
    //fetch
    if (net && typeof net === 'function') {
      res = await net(url, host, option);
    } else {
      res = await QMFetch({ url, host, method: "POST", body: option });
    }
    //post
    let dataSource = this._state.get('dataSource');
    if (netPost && typeof netPost === 'function') {
      res = netPost(res, dataSource);
    } else {
      let { total, content, data } = res.data;
      if (mode == "append") {
        //TODO:这里是有问题，dataSource并没有特定类型，和dataSourcePath结合使用。
        data = dataSource.concat(fromJS((content || data) || []))
      } else {
        data = fromJS((content || data) || []);
      }
      res = {
        netResponse: res,
        dataRemote: true,
        dataSource: data,
        dataTotal: total || 0
      };
    }

    let batchStack = [
      ['update', res || {}],
      ['net:loading', false]
    ];
    if (createSnap) {
      batchStack.push(['form:createSnap'])
    }
    //dispatch
    this.batchDispatch(batchStack);
  };

  /**
   * 获取查询条件
   * @param group
   * @param useSnap
   * @return object {{..page},{...searchForm},sort,filter}
   */
  getParam = (group, useSnap) => {
    //获取form参数
    let source = FormProvider.getFormSource.bind(this, { group, useSnap })();
    let data = FormProvider.packDataFromSource(source);

    //获取page参数
    let pageParam = {};
    if (this._state.get('pageable')) {
      let pageNo = this._state.get('pageCurrent') - 1;
      let pageSize = this._state.get('pageSize');
      pageParam = { pageNo, pageSize }
    }
    //sort
    let sortProps = this._state.get('dataSorted');
    let sort = ObjectUtil.isEmptyObject(sortProps) ? undefined : { sort: sortProps };
    //filter
    let filterProps = this._state.get('dataFilter');
    let filter = ObjectUtil.isEmptyObject(filterProps) ? undefined : { filter: filterProps };

    return Object.assign(data, sort, filter, pageParam);
  };

  /**
   * 排序
   * 触发查询时，带入对应表单数据 ｜ 分页数据清空 ｜ 过滤数据清空
   */
  onSortChange = ({ index, value, single }) => {
    //如果传递了url，默认走内部的业务逻辑
    this.batchDispatch([
      ['page:update', { pageCurrent: 1 }],
      ['data:sort', { index, value, single }],
      ['net:loading', true]
    ]);
    this.fetchData({ useSnap: true });
  };

  /**
   * 过滤
   * 触发查询时，带入对应表单数据 ｜ 分页数据清空 ｜ 排序数据清空
   */
  onFilterChange = ({ index, value, single }) => {
    this.batchDispatch([
      ['page:update', { pageCurrent: 1 }],
      ['data:filter', { index, value, single }],
      ['net:loading', true]
    ]);
    this.fetchData({ useSnap: true });
  };

  /**
   * 过滤弹块，的隐藏与展示
   */
  onFilterDropdown = (k, index, v) => {
    let columns = this._state.get('tableColumns');
    this.dispatch('columns:update', columns.setIn([k, 'filterDropdownVisible'], v))
  };

  /**
   * >>>>>>>>>>>>>>>>>>>
   * TODO 1.0.0版本后废弃，请使用this.onPageRefresh
   * >>>>>>>>>>>>>>>>>>>
   */
  onDataItemChange = (path, value) => {
    this.dispatch('data:itemChange', { path, value })
  };

  /**
   * 页码操作
   */
  onPageChange = ({ pageCurrent, pageSize, mode }) => {
    this.batchDispatch([
      ['page:update', { pageCurrent, pageSize }],
      ['net:loading', true]
    ]);
    this.fetchData({ useSnap: true, mode });
  };

  /**
   * 列管理、操作
   */
  onColumnsChange = (columns) => {
    this.dispatch('columns:update', columns)
  };

  /**
   * >>>>>>>>>>>>>>>>>>>
   * TODO:1.0.0 版本后废弃，请使用this.onCellSelected
   * >>>>>>>>>>>>>>>>>>>
   * 原子勾选
   */
  onCellSelect = (param) => this.dispatch('cell:update', { cellSelected: param });

  /**
   * 批量勾选
   */
  onCellSelected = () => this.dispatch('cell:update', param);

  /**
   * 清除全部勾选
   */
  onCellSelectedClear = () => this.dispatch('cell:removeAll');

}