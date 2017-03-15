/**
 * @author gcy[of1518]
 * @date 16/09/30
 *
 * @description Table service加持
 */
import React, {Component} from 'react';

const noop = () => undefined;

export default class QMDataViewCore extends Component {

  static defaultProps = {
    netUrl: "",   //异步请求url
    netHost: "",  //请求域
    netPre: undefined,
    net: undefined,
    netPost: undefined,
    hash: '',             //

    init: noop,
    initial: noop,
    onFetch: noop,
    onRefresh: noop,
    onCurrentRefresh: noop,

    manual: false,

    _dispatch: noop,
    _batchDispatch: noop
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let {netUrl, netHost, init, netPre, net, netPost} = this.props;
    init({netUrl, netHost, netPre, net, netPost});
  }

  render() {
    let {className}= this.props;
    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }

  componentDidMount() {
    let {onFetch, netUrl, netHost, initial, netPre, net, netPost, hash, manual} = this.props;
    initial({hash});

    if (!!netUrl && !manual) {
      //如果配置异步请求url则开始发送请求
      onFetch({url: netUrl || "", host: netHost || "", netPre, net, netPost, createSnap: true});
    }
  }

}