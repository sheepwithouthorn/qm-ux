/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description ViewType 服务修饰器
 */
import React, {Component} from 'react';
import {Relax} from 'iflux2';

import {viewTypeQL, viewTypesQL} from './ViewTypeDefaultQL';

const noop = () => undefined;

export default function ViewTypeService(ViewTypeTarget) {

  @Relax
  class ViewTypeServiceContainer extends Component {

    static defaultProps = {
      //public
      //private
      //protected:store里的保留字段，Relax会做merge处理


      viewType: viewTypeQL,
      viewTypes: viewTypesQL,

      changeViewType: noop
    };

    constructor(props) {
      super(props);
    }

    render() {
      return <ViewTypeTarget {...this.props}/>
    }

  }

  return ViewTypeServiceContainer;
}