/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description dataSource_ql
 */
import { QL } from 'iflux2';

//返回dataSource
const dataSourceQL = QL('dataSourceQL', [
  'dataSource',
  'dataRemote',
  'pageCurrent',
  'pageSize',
  (source, remote, current, size) => {
    if (remote) {
      //若是远程数据,直接返回dataSource
      return source;
    } else {
      if (current && !isNaN(current) && size && !isNaN(size)) {
        //若是本地初始化数据，分页计算后返回
        return source.filter((v, k) => {
          if (k >= (current - 1) * size &&
            k <= (current * size - 1)) {
            return v;
          }
        });
      } else {
        //若分页数据为空或者0，返回素有数据
        return source;
      }
    }
  }
]);
exports.dataSourceQL = dataSourceQL;

//返回数据长度
const dataTotalQL = QL('dataTotalQL', [
  'dataSource',
  'dataTotal',
  'dataRemote',
  (source, total, remote) => {
    if (remote) {
      //若是异步远程获取，长度为请求返回的total,需要主动设置
      return total;
    } else {
      //若是本地通过props所传数据，那么长度为dataSource的长度
      return source ? (source.count ? source.count() : source.length) : 0;
    }
  }
]);
exports.dataTotalQL = dataTotalQL;