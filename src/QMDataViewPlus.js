/**
 * @author gcy[of1518]
 * @date 16/09/30
 *
 * @description Table service加持
 */
import React, { Component } from 'react';
import { StoreProvider, Relax } from 'iflux2';
import { DataViewUI } from 'qm-ui';

import DataViewStore from './DataViewStore';
import QMDataView from './QMDataView';
import QMDataViewCore from './QMDataViewCore';


import NetWorkActor from './NetWorkActor';

export default class QMDataViewPlus extends Component {

  constructor(props) {
    super(props);
    let defaultActor = props.defaultActor || [];
    @StoreProvider(DataViewStore, { debug: !!__DEBUG__, defaultActor })
    @Relax
    class QMDataView extends QMDataViewCore {
      static defaultProps = QMDataViewCore.defaultProps;
      constructor(props) {
        super(props);
      }
    }

    this.state = { DataView: <QMDataView {...props} /> }
  }


  render() {
    let {DataView} = this.state;
    return DataView
  }


}