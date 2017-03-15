# QMDataView
> 说明
  QMDataView是一个前端基础，对业务有一定的侵入

> 使用场景
    
- 标准SearchForm、Toolbar、Table||ListView||Gallery、Pagination等类table业务
- 标准
- 
    
# DataViewStore



00:09
<Element index="regionId;provinceName;cityName"/>
未读
onSubmit 提交时会分解成  {[regionId]:'',[provinceName]:'',[cityName]:''}
未读
初始化时，你只需要传     {[regionId]:'',[provinceName]:'',[cityName]:''}过来即可
未读
我会聚合到：  formSource:{'regionId;provinceName;cityName':{index:'regionId;provinceName;cityName"',value:{regionId:'',provinceName:'',cityName:''}}}
未读
00:13:27
你只需要在<Elelment/> 的target内做好value的处理即可，当让 onChange也要 提交  onChange({regionId:'',provinceName:'',cityName:''}})