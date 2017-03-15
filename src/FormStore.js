/**
 *  QMFrom表单Store
 */
import { Store } from 'iflux2';

import BasicActor from './BasicActor';
import NetWorkActor from './NetWorkActor';
import FormActor from './FormActor';
import QMFetch from './QMFetch';
import FormProvider from './FormProvider';
import QMValidator from './QMValidator';

export default class FormStore extends Store {

  bindActor() {
    return [
      new BasicActor,
      new NetWorkActor,
      new FormActor
    ];
  }

  constructor(props) {
    super(props);
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
   */
  initial = (param) => {
    let { hash } = param || {};
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
   * 表单组件元素初始化
   */
  elementInit = (param) => FormProvider.elementInit.bind(this, param)();

  /**
   * 搜索表单元素值变化
   */
  elementOnChange = (param) => FormProvider.elementOnChange.bind(this, param)();

  /**
   * 修改表单状态
   */
  onFormState = (state) => this.dispatch('form:update', { formState: state });

  /**
   *  表单清空
   */
  onFormReset = () => this.dispatch("form:reset");

  /**
   *  表单数据fetch
   *
   */
  onFetch = async (param) => {
    let { host, url, group, net, netPost, valid, useSnap } = param || {};
    //获取url&host
    url = url || this._state.get('netUrl');
    host = host || this._state.get('netHost');
    let res = net && typeof net === 'function' ? await net(url, host) : await QMFetch({ url, host });
    //post
    if (netPost && typeof netPost === 'function') res = netPost(res);
    let source = FormProvider.getFormSource.bind(this, { group, useSnap })();
    let { data } = res;
    res = FormProvider.packSourceFromData({ data, source });
    //valid
    let formValidResult = {};
    if (valid) formValidResult = FormProvider.formValid(res);
    if (formValidResult) {

    }
    //insert
    this.dispatch("form:insert", { source: res });
  };

  /**
   * 表单提交
   */
  onSubmit = async (param) => {
    let { host, url, group, useSnap, pushPre, push, pushPost } = param || {};
    //获取url&host
    let rep = {};
    url = url || this._state.get('pushUrl');
    host = host || this._state.get('pushHost');
    let source = FormProvider.getFormSource.bind(this, { group, useSnap })();
    //valid
    let formValidResult = FormProvider.formValid(source);
    if (formValidResult && Object.keys(formValidResult).length > 0) {
      this.dispatch('form:update', { formValidResult });
      return false;
    }
    let data = FormProvider.packDataFromSource(source);
    //pre
    if (pushPre && typeof pushPre === 'function') data = pushPre(data);
    //net
    rep = push && typeof push === 'function' ?
      await push(url, host, data)
      :
      await QMFetch({ url, host, method: 'POST', body: data });
    //post
    if (pushPost && typeof pushPost === 'function') pushPost(rep);
  };

  onValidSubmit = (param) => {
    let self = this;
    let { host, url, group, useSnap, pushPre, push, pushPost } = param || {};
    //获取url&host
    let rep = {};
    url = url || this._state.get('pushUrl');
    host = host || this._state.get('pushHost');
    let source = FormProvider.getFormSource.bind(this, { group, useSnap })();
    //valid
    let formValidResult = FormProvider.formValid(source);

    //
    return new Promise((resolve, reject) => {

      if (formValidResult && Object.keys(formValidResult) > 0) {
        self.dispatch('form:update', { formValidResult });
        reject(false);
      } else {
        let data = FormProvider.packDataFromSource(source);
        //pre
        if (pushPre && typeof pushPre === 'function') data = pushPre(data);
        //net
        rep = push && typeof push === 'function' ?
          push(url, host, data)
          :
          QMFetch({ url, host, method: 'POST', body: data });
        resolve({ data, rep });
      }

    });

  }

}