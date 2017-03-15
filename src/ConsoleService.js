/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description console 服务提供修饰器
 */
import React, {Component} from 'react';
import {Relax} from 'iflux2';

import {formDataQL, formSnapDataQL} from './FormDefaultQL'

const noop = () => undefined;

export default function ConsoleService(ConsoleTarget) {

  //ConsoleServiceContainer
  @Relax
  class CSC extends Component {

    static defaultProps = {
      //protected
      formData: formDataQL,
      formSnapData: formSnapDataQL,
      formSource: {},
      formState: "",

      onFormReset: noop,  //表单重置
      onFetch: noop,     //
      onSubmit: noop,     //
      onFormState: noop,   //
    };

    render() {
      return <ConsoleTarget {...this.props}/>
    }

  }

  return CSC;
}