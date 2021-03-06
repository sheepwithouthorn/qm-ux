# QM-UX

> 说明

actor
defaultState :-> table
action :-> update\delete\insert sql

ql:
QL :-> select sql

store-provider:-> zookeeper

store:
bindActor:-> dao|jdbc
dispatch:-> transaction

relax|service :-> core
actorState:-> bean

component:
handle|event :-> controller

> Actor 保留字

- BasicActor
    - __init: false
    
- DataSourceActor
    - dataTotal: 0,                       //数据总条目,若是本地数据，则返回dataSource.count().若是远程数据返回数据库字段
    - dataRemote: true,                  //是否为远程数据
    - dataSource: fromJS([]),             //本地初始化数据
    
- FormActor
    - formState: '',          //'' || 'edit' || 'audit', 默认状态,编辑状态,审核状态,校验状态
    - formSource: Map({}),    //form elements 集合
    - validState: '',         // '' || 'validating' || 'success' || 'error' || 'warning'
    - validResult: Map({}),   //form elements 校验结果  
    - remoteDate: Map({})    //{key:'name',value:'value'}  键值对  OrderedSet
    
- NetWorkActor
    - netHost: "",        //获取数据，请求域
    - netUrl: "",         //获取数据，url
    - netResponse: OrderedMap({}),   //获取数据，返回对象存储
    - netPre: undefined,   //请求前
    - net: undefined,     //请求体,return Promise
    - netPost: undefined,  //请求后
    - pushHost: "",      //请求域,自带端口
    - pushUrl: "",       //数据提交请求url
    - pushPre: undefined,     //提交请求前
    - push: undefined,        //提交请求,return Promise
    - pushPost: undefined,    //提交请求后
    - loading: false	   //页面是否显示加载中

- PaginationActor
    - pageCurrent: null,        //当前页数 number
    - pageSize: null,            //每页条数	number
    - pageCache: false,    //分页缓存：场景：滚动分页，数据叠加
    
- TableActor
    - columns: fromJS([])      //列集合
    
- TaskFlowActor
    - step: 1,          //任务流数据机
    - flow: {}          //任务流数据集
    
- ViewCellActor
    - cellKey: '',   //原数据唯一标示
    - cellSelectType: 'checkbox',        //'checkbox' || 'radio'
    - cellSelected: OrderedMap({}),     //勾选项{key:index,value:v}对象异步存储容器
    - cellSelectLimit: false,           //Array  ||  [Function]  ||  (false || null)
    
- ViewTypeActor
    - viewType: '',    //数据面板展现标示
    - viewTypes: []    //数据面板展现形式集

> 定位
    
- 解决场景

> 环境 

- NODE > 6.0.0
- babel(建议全局安装)
- yarn(建议安装)
- falcon-cli (控制台项目，建议安装)     
- 依赖webpack插件
 
> 模块的输入方式
    
    import React,{Component} from 'react';
    import {QMDataView,SearchForm,Table,Toolbar,Pagination} from 'qm-ux';
    const Item = SearchForm.Item;
    const Column = Table.Column;
    const ColumnsManager = Table.ColumnsManager;
    
    export default class GoodsList extends Component{
        render(){
            return (
                <QMDataView>
                    <SearchForm>
                        <Item>
                            <Input/>
                        </Item>
                        <Item>
                            <Select/>
                        </Item>
                    </SearchForm>
                    
                    <Toolbar>
                    </Toolbar>
                    
                    <Table/>
                    
                    <Pagination/>
                    
                </QMDataView>
            )
        }
    }
    
> QM***
    
> like Console | Table | SearchForm
   
> ***Actor

> ***DefaultQL

> ***Service

> ***Store

> ***Util