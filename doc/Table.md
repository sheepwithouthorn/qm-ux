# Table

`Table =
   @TableService 
    TableUI
`
> children
    
<Column/>
<ColumnsManager/>

> 说明

> TableService
  
> TableUI

> 使用方法

> 使用场景

# API

### Table [点击查看Ant原生API](https://ant.design/components/table/#Table)
Table props基本兼容

| Property      |  Original   |  Description  |     Type    |   Default   |
|:------------- |:-----------:|:-------------:|:-----------:| :-----------:|
| rowSelection  |     -       |         -     |       -     |      -      |
| pagination    |     -       | table没有分页  |      -      |     false       |
| size    |     -       |      --       |      -      |     -       |
| dataSource    |     -       |      --       |      -      |     -       |
| columns    |     -       |      --       |      -      |     -       |
| rowKey    |     -       |      --       |      -      |     -       |
| rowClassName    |     -       |      --       |      -      |     -       |
| expandedRowRender    |     -       |      --       |      -      |     -       |
| defaultExpandedRowKeys    |     -       |      --       |      -      |     -       |
| expandedRowKeys    |     -       |      --       |      -      |     -       |
| defaultExpandAllRows    |     -       |      --       |      -      |     -       |
| onExpandedRowsChange    |     -       |      --       |      -      |     -       |
| onExpand    |     -       |      --       |      -      |     -       |
| onChange    |     -       |      --       |      -      |     -       |
| loading    |     -       |      --       |      -      |     -       |
| locale    |     -       |      --       |      -      |     -       |
| indentSize    |     -       |      --       |      -      |     -       |
| onRowClick    |     -       |      --       |      -      |     -       |
| bordered    |     -       |      --       |      -      |     -       |
| showHeader    |     -       |      --       |      -      |     -       |
| footer    |     -       |      --       |      -      |     -       |
| title    |     -       |      --       |      -      |     -       |
| scroll    |     -       |      --       |      -      |     -       |

### Column [点击查看Ant原生API](https://ant.design/components/table/#Column)

| Property      |  Original   |  Description  |     Type    |   Default   |
|:------------- |:-----------:|:-------------:|:-----------:| :-----------:|
| title  |     -       |         -     |       -     |      -      |
| key  |     -       |         -     |       -     |      -      |
| dataIndex  |     -       |         -     |       -     |      -      |
| render  |  renderer of table cell, has three params: text, record and index of this row. The render value should be a ReactNode, or a object for     | -   |   Function({index, text, row: record, cellSelected, dataSource, onRefresh, onCurrentRefresh}){}      |      -      |
| filters  |     -       |         -     |       -     |      -      |
| onFilter  |     -       |         -     |       -     |      -      |
| filterMultiple  |     -       |         -     |       -     |      -      |
| filterDropdown  |     -       |         -     |       -     |      -      |
| filterDropdownVisible  |     -       |         -     |       -     |      -      |
| onFilterDropdownVisibleChange  |     -       |         -     |       -     |      -      |
| filteredValue  |     -       |         -     |       -     |      -      |
| sorter  |     -       |         -     |       -     |      -      |
| colSpan  |     -       |         -     |       -     |      -      |
| width  |     -       |         -     |       -     |      -      |
| className  |     -       |         -     |       -     |      -      |
| fixed  |     -       |         -     |       -     |      -      |
| sortOrder  |     -       |         -     |       -     |      -      |
| onCellClick  |     -       |         -     |       -     |      -      |

### ColumnGroup [点击查看Ant原生API](https://ant.design/components/table/#ColumnGroup)

| Property      |  Original   |  Description  |     Type    |   Default   |
|:------------- |:-----------:|:-------------:|:-----------:| :-----------:|
| title  |     -       |         -     |       -     |      -      |


### rowSelection [点击查看Ant原生API](https://ant.design/components/table/#rowSelection)

| Property      |  Original   |  Description  |     Type    |   Default   |
|:------------- |:-----------:|:-------------:|:-----------:| :-----------:|
| type  |     -       |         -     |       -     |      -      |
| selectedRowKeys  |     -       |         -     |       -     |      -      |
| onChange  |     -       |         -     |       -     |      -      |
| getCheckboxProps  |     -       |         -     |       -     |      -      |
| onSelect  |     -       |         -     |       -     |      -      |
| onSelect  |     -       |         -     |       -     |      -      |

### TableService
| Property      |  value   |  Description  |     Type    |   Default   |
|:------------- |:-----------:|:-------------:|:-----------:| :-----------:|
| viewType  |     undefined       |       视图     |       -     |      -      |
| columns  |     columnsQL       |        列集合     |       -     |      -      |
| dataSourcePath  |     undefined       |    数据路径     |       -     |      -      |
| dataRemote  |     dataRemoteQL       |        远程数据     |       -     |      -      |
| dataTotal  |     dataTotalQL       |        数据总条目,若是本地数据，则返回dataSource.count().若是远程数据返回数据库字段     |       -     |      -      |
| dataSource  |    dataSourceQL      |    数据数组	Array     |       -     |      -      |
| cellKey  |     ''      |         -     |       -     |      -      |
| cellSelected  |     cellSelectedQL       |     原数据选择项     |       -     |      -      |
| cellSelectType  |     cellSelectTypeQL      |         -     |       -     |      -      |
| loading  |     -       |       loadingQL     |       -     |      -      |
| init  |     noop      |         init(param)    |       -     |      -      |
| onRefresh  |    noop       |      table刷新     |       -     |      -      |
| onCurrentRefresh  |     noop      |   当前页刷新     |       -     |      -      |
| onRowClick  |    noop       |      row clickHandle   [Function(record, index)]     |       -     |      -      |
| onCellSelect  |    noop     |     行操作回调    |       -     |      -      |
| onSortChange  |     noop     |      排序响应     |       -     |      -      |

> 备注

Table是使用@TableService进行注入的组件，无法单独使用，