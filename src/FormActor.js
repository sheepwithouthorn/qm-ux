/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description FormActor
 *
 formSource: {
    #{index}:{
      index: '',        //元素唯一标识
      value: '',        //元素值
      rules: {},        //校验规则
      required: false,  //是否必填
      show: true,       //
      status: '',       //校验状态,'success' 'warning' 'error' 'validating'
      label: '',        //标签文本
      group：''        //分组
      msg: '',         //校验规则自动生成	string
      help: '',         //
      extra:null     //表单数据数据缓存字段
    },
    ...
   }

 SearchFormSource:{
  #{index}:{
    close:undefined   //?这个字段是干啥的，特么忘了
    extra:undefined   //额外值
    group:"simple"    //分组
    index:"waresName"  //索引值，key
    value:"123"       //value
  }
 }

 validResult:{
   #{index}:['required','email'],
   ...
 }

 *
 */
import { Actor, Action } from 'iflux2';
import { OrderedMap, Map, fromJS } from 'immutable';

export default class FormActor extends Actor {

  defaultState() {

    return {
      formState: '',        //'' || 'view', 默认&&编辑状态,查看审核状态
      formSource: Map({}),       //表单集合
      formSnapSource: Map({}),   //表单快照缓存,只有在表单提交时，才会有创建这份快照
      formCurrentGroup: '', //当前执行分组
      formValidState: '',   // '' || 'validating' || 'success' || 'error' || 'warning'
      formValidResult: OrderedMap({})  //form elements 校验结果
    }
  }

  /**
   * 通用初始化方法
   */
  @Action('init')
  init(state, { formSource, formGroup, formCurrentGroup, formState }) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      { formSource, formGroup, formCurrentGroup, formState }
    )
  }

  /**
   * 表单清空
   */
  @Action("form:reset")
  formReset(state, group) {
    let formSource = state.get('formSource');
    formSource = Map.isMap(formSource) ? formSource.toJS() : formSource;
    for (let key in formSource) {
      let source = Map.isMap(formSource[key]) ? formSource[key].toJS() : formSource[key];
      if (!!group) {
        //分组删除
        if (source['group'] == group) {
          source['value'] = undefined;
          source['extra'] = undefined;
        }
      } else {
        //全部删除
        source['value'] = undefined;
        source['extra'] = undefined;
      }
      formSource[key] = source;
    }
    return state
      .set("formSource", fromJS(formSource))
      .set("validState", "")
      .set("validResult", fromJS({}))
  }

  /**
   * 表单数据导入，使用场景表单服务器异步数据，或者本地数据
   */
  @Action("form:insert")
  formInsert(state, { source }) {
    return state.set('formSource', fromJS(source));
  }

  /**
   * 同步表单快照
   */
  @Action('form:createSnap')
  formCreateSnap(state) {
    return state.set('formSnapSource', state.get('formSource'));
  }

  /**
   * 表单元素初始化
   */
  @Action('form:update')
  formUpdate(state, { formState, formSource, formSnapSource, formCurrentGroup, formValidState, formValidResult }) {
    return state.mergeWith(
      (prev, next) => next == undefined ? prev : next,
      { formState, formSource, formSnapSource, formCurrentGroup, formValidState, formValidResult }
    );
  }

  /**
   * 表单元素更新 insert||update
   */
  @Action('element:update')
  elementUpdate(state, source) {
    return state.setIn(['formSource', source['index']], source)
  }

  /**
   * 表单元素移除
   */
  @Action('element:delete')
  elementDelete(state, { index }) {
    return state.deleteIn(['formSource', index]);
  }

  /**
   * 元素校验结果修改
   */
  @Action('element:valid')
  elementValid(state, { index, value }) {
    if (value && value.length > 0) {
      return state.setIn(["formValidResult", index], value)
    } else {
      return state.deleteIn(['formValidResult', index]);
    }
  }

}


