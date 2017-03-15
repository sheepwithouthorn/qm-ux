/**
 * @author gcy[of1518]
 * @date 17/01/05
 *
 * @description QMEditView
 */
import React, { Component } from 'react';
import { StoreProvider, Relax } from 'iflux2';
import { DataViewUI } from 'qm-ui';

import DataViewStore from './DataViewStore';
import QMDataView from './QMDataView';
import QMDataViewCore from './QMDataViewCore';

export default class QMEditViewPlus extends Component {

  constructor(props) {
    super(props);
    @StoreProvider(DataViewStore, { debug: !!__DEBUG__ })
    @Relax
    class QMEditView extends QMDataViewCore {
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