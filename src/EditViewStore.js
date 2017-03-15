/**
 * EditViewStore
 *
 - table
 1. 清空

 - cell
 1. 直接编辑，修改store,re-render
 这里的数据没有组件内缓存，直接onChange完后，对上提交数据。适配合radio、checkout、select...
 2. 异步触发，提交修改，修改store，re-render
 这里的数据需要组件内缓存，有锚点事件对上提交数据。适配合input,inputNum

 */
import { Store } from 'iflux2';
import { List, fromJS } from 'immutable';

import BasicActor from './BasicActor';
import DataSourceActor from './DataSourceActor';
import FormActor from './FormActor';
import TableActor from './TableActor';
import QMFetch from './QMFetch';
import FormProvider from './FormProvider';
import QMValidator from './QMValidator';

export default class EditViewStore extends Store {

  bindActor() {
    return [
      new BasicActor,
      new DataSourceActor,
      new FormActor,
      new TableActor
    ];
  }

  constructor(props) {
    super(props);
  }

  /**
   * dispatch代理
   */
  _dispatch = (param) => this.dispatch(param);

  /**
   * 批量batchDispatch代理
   */
  _batchDispatch = (param) => this.batchDispatch(param);

  /**
   * 顶层组件初始化
   */
  initial = (param) => {
    let { hash } = param || {};
    //debug
    if (this.debug && !!hash) {
      window[hash] = this;
    }
    this.dispatch('__init', { __hash: hash })
  };

  /**
   * 组件初始化通用方法
   */
  init = (param) => this.dispatch('init', param);

  /**
   * 表单组件元素初始化
   */
  elementInit = (param) => FormProvider.elementInit.bind(this, param)();

  /**
   * 搜索表单元素值变化
   */
  elementOnChange = (param) => FormProvider.elementOnChange.bind(this, param)();

  /**
   * 修改编辑状态
   */
  onEditViewState = (state) => this.dispatch('form:formState', state);

  /**
   * table 编辑
   */
  onTableCellChange = (param) => {
    let { rowIndex, colIndex, value } = param || {};
    this.dispatch('data:cell:update', { rowIndex, colIndex, value });
  }

  /**
   * 表单清空
   */
  onFormReset = () => this.dispatch("form:reset");

  /**
   *  表单数据fetch
   */
  onFetch = async (param) => {
    let { host, url, valid, validType } = param || {};
    //获取url&host
    url = url || this._state.get('netUrl');
    host = host || this._state.get('netHost');
    let res = await QMFetch({ url, host });

    //post
    let source = FormProvider.getFormSource.bind(this)();
    let { data } = res;
    res = FormProvider.packSourceFromData({ data, source });

    //valid
    let formValidResult = {};
    if (valid) formValidResult = FormProvider.formValid(res);

    //校验结果是否异步返回
    if (validType === 'async') {
      await FormProvider.formValid(res);
    } else if (validType === 'sync') {
      FormProvider.formValid(res).then(res => {
        //insert
        // this.dispatch("form:insert", { source: res });

      });
    }
    //insert
    this.dispatch("form:insert", { source: res });
  };

  /**
   * 校验
   * @param {Object} param
   * @param {*} param
   */
  onValid = (param) => {
    let { dataSourcePath, group, useSnap } = param || {};
    //获取url&host
    let rep = {};

    let source = FormProvider.getFormSource.bind(this, { group, useSnap })();
    //valid
    let formValidResult = FormProvider.formValid(source);
    let dataSource = this._state.get('dataSource');
    let columns = this._state.get('tableColumns');
    if (dataSource && dataSource.toJS) {
      dataSource = dataSource.toJS();
    }
    if (columns && columns.toJS) {
      columns = columns.toJS();
    }
    let { errorMap, errorMsg } = QMValidator.eagleList({ columns, dataSource });
    return new Promise((resolve, reject) => {
      if (
        (formValidResult && Object.keys(formValidResult).length > 0) ||
        (errorMap && Object.keys(errorMap).length > 0)
      ) {
        this.batchDispatch([
          ['form:update', { formValidResult }],
          ['table:update', { tableValidResult: errorMap }]
        ]);
        reject({
          formValidResult,
          tableValidResult: errorMap,
          tableValidMsg: errorMsg
        });
      } else {
        resolve(true);
      }
    });
  }

}