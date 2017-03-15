# QMDataView
> 说明
  QMDataView是一个前端基础，对业务有一定的侵入

> 使用场景
    
- 标准SearchForm、Toolbar、Table||ListView||Gallery、Pagination等类table业务
- 标准
- 
    
# DataViewStore

### bindActor
| Bind      |  Original   |  Description  |     Type    |   Default   |
|:------------- |:-----------:|:-------------:|:-----------:| :-----------:|
| [BasicActor](/src/web_modules/qm-ux/src/BasicActor.js)    |     -       |      --       |      -      |     -       |
| [NetWorkActor](/src/web_modules/qm-ux/src/NetWorkActor.js)   |     -       |      --       |      -      |     -       |
| [DataSourceActor](/src/web_modules/qm-ux/src/DataSourceActor.js)    |     -       |      --       |      -      |     -       |
| [ViewTypeActor](/src/web_modules/qm-ux/src/ViewTypeActor.js)    |     -       |      --       |      -      |     -       |
| [FormActor](/src/web_modules/qm-ux/src/FormActor.js)    |     -       |      --       |      -      |     -       |
| [PaginationActor](/src/web_modules/qm-ux/src/PaginationActor.js)    |     -       |      --       |      -      |     -       |
| [ViewCellActor](/src/web_modules/qm-ux/src/ViewCellActor.js)    |     -       |      --       |      -      |     -       |
| [TableActor](/src/web_modules/qm-ux/src/TableActor.js)    |     -       |      --       |      -      |     -       |

### Function
| Func      |  Dispatch    |  Description  |     Type    |   Default   |
|:------------- |:-----------:|:-------------:|:-----------:| :-----------:|
|  initial   |  __init     |       顶层组件初始化      |      -      |     -       |
|  init   |    init       |    组件初始化通用方法      |      -      |     -       |
|  elementInit   |    element:init       |  表单组件元素初始化       |      -      |     -       |
|  itemOnChange   |   element:change | form:change       |   搜索表单元素值变化    |      -      |     -       |
|  onReset   |   form:reset    |   搜索条件清除     |      -      |     -       |
|   formValid  |     -       |      --       |      -      |     -       |
|   fetchData  |     -       |      --       |      -      |     -       |
|   onFetch  |     -       |      --       |      -      |     -       |
|   getParam  |     -       |      --       |      -      |     -       |
|   packFormData  |     -       |      --       |      -      |     -       |
|   onPagination  |     -       |      --       |      -      |     -       |
|   onPageSizeChange  |     -       |      --       |      -      |     -       |
|   onPageChange  |     -       |      --       |      -      |     -       |
|   onColumnsManager  |     -       |      --       |      -      |     -       |
|   onCellSelect  |     -       |      --       |      -      |     -       |
|   onCellSelectedClear  |     -       |      --       |      -      |     -       |
|   onCellEdit  |     -       |      --       |      -      |     -       | 
    
  