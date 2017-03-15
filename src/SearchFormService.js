/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description Form 服务提供修饰器
 */
import React, {Component} from 'react';
import {Relax} from 'iflux2';

const noop = () => undefined;

export default function SearchService(FormTarget) {

  @Relax
  class SearchServiceContainer extends Component {

    static defaultProps = {
      //protected
      formCurrentGroup: '',  //当前分组
      group: '',

      init: noop,
      onFetch: noop,     //发起请求
      onRefresh: noop,   //刷新
      onFormReset: noop, //表单重置
      onFormChangeGroup: noop,   //切换分组（切换高级搜索和简易搜索）

      //private
      defaultFromData: {},  //默认formData数据
    };

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      let {init, children, group} = this.props;
      let simpleCount = 0;
      let advanceCount = 0;
      React.Children.forEach(children, (v) => {
        if (v.props.group == 'simple') {
          simpleCount++;
        } else if (v.props.group == 'advance') {
          advanceCount++;
        }
      });

      //搜索当前分组
      if (!!group) {

      } else if (simpleCount == 0 && advanceCount == 0) {
        group = '';
      } else if ((simpleCount > 0 && advanceCount == 0 ) || (simpleCount > 0 && advanceCount > 0)) {
        group = 'simple';
      } else if (simpleCount == 0 && advanceCount > 0) {
        group = 'advance';
      }
      if (!!group) {
        init({formCurrentGroup: group || '', formGroup: true});
      }
    }

    componentDidMount() {
      document.onkeyup=(e)=>{
        if(e.keyCode == 13){
          this.props.onRefresh();
        }
      }
    }

    render() {
      return (
        <FormTarget {...this.props} />
      )
    }

  }

  return SearchServiceContainer;
}


