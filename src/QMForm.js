/**
 * @author gcy[of1518]
 * @date 16/09/30
 *
 * @description
 */
import React, { Component } from 'react';
import { StoreProvider, Relax, msg } from 'iflux2';
import { FormUI } from 'qm-ui';

import FormStore from './FormStore';

const noop = () => undefined;

@StoreProvider(FormStore, { debug: false })
@Relax
export default class QMForm extends Component {

  static defaultProps = {
    pushHost: "",
    pushUrl: "",
    hash: "",      //
    formState: '',

    init: noop,
    initial: noop,
    onFetch: noop
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let {
      init, formState,
      netUrl, netHost, net, netPost,
      pushUrl, pushHost, pushPre, push, pushPost
    } = this.props;

    init({
      formState,
      netUrl, netHost, net, netPost,
      pushUrl, pushHost, pushPre, push, pushPost
    });
  }

  render() {
    return (
      <FormUI {...this.props}>
        {this.props.children}
      </FormUI>
    )
  }

  componentDidMount() {
    let {
      hash, onFetch, initial,
      netUrl, netHost, net, netPost,
    } = this.props;
    initial({ hash });

    if (!!netUrl) {
      //如果配置异步请求url则开始发送请求
      onFetch({ url: netUrl, host: netHost, net, netPost, createSnap: true });
    }
  }

}
