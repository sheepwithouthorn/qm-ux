/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description QMPage基于AntDesign的实现类
 * 基于修饰器API,作为一个桥接用以实现，讲qm-ux的API翻译下
 */
import React from 'react';
import {Pagination as AntPagination} from 'antd';
import PaginationService from './PaginationService';

@PaginationService
export default class Pagination extends AntPagination {
}