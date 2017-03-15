/**
 * @author gcy[of1518]
 * @date 16/09/30
 *
 * @description Table service加持
 */
import React, {Component} from 'react';
import {StoreProvider, Relax} from 'iflux2';
import {DataViewUI} from 'qm-ui';

import DataViewStore from './DataViewStore';
import QMDataViewCore from './QMDataViewCore'

@StoreProvider(DataViewStore, {debug: !!__DEBUG__})
@Relax
export default class QMDataView extends QMDataViewCore {

  static defaultProps = QMDataViewCore.defaultProps;

  constructor(props) {
    super(props);
  } 
}