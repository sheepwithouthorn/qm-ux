/**
 * @author gcy[of1518]
 * @date 2017.02
 *
 * @description TableProvider table相关资源获取运算方法提供
 *
 */
import Immutable, { List, Map, Set } from 'immutable';

class TableProvider {

  /**
   * 行添加 
   * @param {object} param 
   */
  insertRow(param) {
    let _this = this;
    let { type = "" } = param || {};
  }

  /**
   * 行删除
   * 
   * @param {object} param 
   */
  deleteRowByIndex(param) {
    let { rowIndex } = param || {};
  }

  /**
   * 行编辑
   * @param {object} param 
   */
  updateRowByIndex(param) {
    let { rowIndex, path, source, value } = param || {};
  }

  /**
   * 行获取
   * @param {object} param 
   */
  selectRowByIndex(param) {
    let { rowIndex, path, source, value } = param || {};
  }

  /**
   * 列增加 
   * @param {object} param 
   */
  insertColumn(param) {
    let { columnIndex, column } = param || {};
  }

  /**
   * 列删除 
   * @param {object} param 
   */
  deleteColumnByIndex(param) {
    let { path, source, value, index } = param || {};
  }

  /**
   * 列修改 
   * @param {object} param 
   */
  updateColumn(param) {
    let { path, source, value, index } = param || {};
  }

  /**
   * 列查询
   *  
   * @param {object} param 
   */
  selectColumnByIndex(param) {
    let { path, source, value, index } = param || {};

  }

  /**
   * 
   * @param {object} param 
   */
  updateCell(param) {

  }

}

export default new TableProvider();