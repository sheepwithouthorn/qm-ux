# QMEditView

> 使用场景
    
- Editable Table
- 复杂Form
- Form+Editable Table

> 不兼容

- table,no pagination
- table,no netWork
   
> 思考
        
一个可编辑的视图组件应该是什么样的？
- editable table

    - async || sync
        1. 异步场景
        
        2. 同步场景

    - table
        1. 清空
        
    - cell
        1. 直接编辑，修改store,re-render
        这里的数据没有组件内缓存，直接onChange完后，对上提交数据。适配合radio、checkout、select...
        2. 异步触发，提交修改，修改store，re-render
        这里的数据需要组件内缓存，有锚点事件对上提交数据。适配合input,inputNum
        3. ？
        
    - row：实现方法
        1. 行添加
        2. 行删除
        3. 行编辑
        4. 行获取？
        5. 同步
         
    - column：实现方法
        1. 列增加
        2. 列删除
        3. 列修改？
        4. 列查询？
    
- form
    - element联动
    - view展示

- and more?
   
# EditViewStore

- bindActor
    - [BasicActor](/src/web_modules/qm-ux)
    - [DataSourceActor](/src/web_modules/qm-ux)
    - [FormActor](/src/web_modules/qm-ux)
    - [ViewCellActor](/src/web_modules/qm-ux)
    - [TableActor](/src/web_modules/qm-ux)
    
> 备注

  QMEditView是一个前端基础，对业务有一定的侵入