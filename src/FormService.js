/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description Form 服务提供修饰器
 */
import React, {Component} from 'react';
import {Relax} from 'iflux2';

const noop = () => undefined;

export default function FormService(FormTarget) {

  //FormServiceContainer
  @Relax
  class FSC extends Component {

    static defaultProps = {
      formState: '',

      //protected
      init: noop,
      onFetch: noop,     //发起请求
      onRefresh: noop,   //刷新
      onFormReset: noop, //表单重置
    };

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      let {init, formState} = this.props;
      init({formState});
    }

    render() {
      return (
        <FormTarget {...this.props} />
      )
    }

  }

  return FSC;
}