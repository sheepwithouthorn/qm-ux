/**
 * @author gcy[of1518]
 * @date 17/01/05
 *
 * @description QMEditView
 */
import React, {Component} from 'react';
import {StoreProvider, Relax, msg} from 'iflux2';
import {DataViewUI} from 'qm-ui';

import EditViewStore from './EditViewStore';

const noop = () => undefined;

@StoreProvider(EditViewStore, {debug: !!__DEBUG__})
@Relax
export default class QMEditView extends Component {

  static defaultProps = {
    initial: noop,
    hash: Math.random(),

    _dispatch: noop,
    _batchDispatch: noop
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {hash} = this.props;
    this.props.initial({hash});
  }

  render() {
    let {className}=this.props;
    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }

}