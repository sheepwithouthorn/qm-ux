/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description from_ql
 */
import {QL} from 'iflux2';
import {Map} from 'immutable';

//获取表单对象集合
const formDataQL = QL('formDataQL', [
  'formSource',
  source => {
    let data = {};
    source.forEach((v, k) => {
      data[k] = Map.isMap(v) ? v.get('value') : v['value'];
    });
    return data;
  }
]);
exports.formDataQL = formDataQL;

//获取快照表单集合
const formSnapDataQL = QL("formSnapDataQL", [
  'formSnapSource',
  source => {
    let data = {};
    source.forEach((v, k) => {
      data[k] = Map.isMap(v) ? v.get('value') : v['value'];
    });
    return data;
  }
]);
exports.formSnapDataQL= formSnapDataQL;

//获取表单对象过滤集合
const formDataFilterQL = QL('formDataFilterQL', [
  'formSource',
  source => {
    let data = {};
    source.forEach((v, k) => {
      data[k] = Map.isMap(v) ? v.get('value') : v['value'];
    });
    return data;
  }
]);
exports.formDataFilterQL= formDataFilterQL;