/**
 * @author gcy[of1518]
 * @date 2017.02
 *
 * @description TableProvider table相关资源获取运算方法提供
 *
 */
import Immutable, {OrderedMap} from 'immutable';

class ViewCellProvider {

  /**
   * 行勾选回调
   */
  onSelect = (record, selected) => {
    let {cellKey, cellSelected, onCellSelect, cellSelectType} = this.props;
    let cellSelect = cellSelected && cellSelected.toJS ? cellSelected.toJS() : cellSelected;
    if (cellSelectType == 'radio') {

    }
    if (selected) {
      cellSelect[record[cellKey]] = record;
    } else {
      delete cellSelect[record[cellKey]];
    }
    onCellSelect(fromJS(cellSelect));
  };

  /**
   * 批量勾选||本页全选回调
   */
  onSelectAll = (selected, selectedRows, changeRows) => {
    let {cellKey, cellSelected, onCellSelect, cellSelectType} = this.props;
    let cellSelect = cellSelected && cellSelected.toJS ? cellSelected.toJS() : cellSelected;
    if (selected) {
      changeRows.forEach((v) => {
        cellSelect[v[cellKey]] = v;
      })
    } else {
      changeRows.forEach((v) => {
        delete cellSelect[v[cellKey]];
      })
    }
    onCellSelect(fromJS(cellSelect));
  };


}

export default new TableProvider();