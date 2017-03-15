/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description QMSearchForm 通过store与其他组件（table,grid）耦合
 */
import React, {Component} from 'react';
import {SearchFormUI} from 'qm-ui';

import SearchFormService from './SearchFormService';
import SearchItemService from './SearchItemService';

@SearchFormService
export default class SearchForm extends SearchFormUI {
}

@SearchItemService
class Item extends SearchFormUI.ItemUI {
}
SearchForm.Item = Item;