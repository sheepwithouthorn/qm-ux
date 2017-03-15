/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description TaskFlow事物流服务修饰器
 */
import React, {Component} from 'react';
import {Relax} from 'iflux2';

export default function TaskFlowService(TaskTarget) {

  @Relax
  class TaskFlowServiceContainer extends Component {

    static defaultProps = {
      step: ''
    };

    render() {
      return (<TaskTarget {...this.props}/>)
    }
  }

  return TaskFlowServiceContainer;
}