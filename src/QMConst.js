/**
 * @author gcy[of1518]
 * @date 17/02/16
 *
 * @description 常量类 Const
 */
import { fromJS, Map } from 'immutable';

class QMConst {
  store = {};
  constructor() {
    let project = typeof $CONST_PROJECT != 'undefined' ?
      (typeof $CONST_PROJECT === 'string' ? JSON.parse($CONST_PROJECT || "{}") : $CONST_PROJECT) : {};
    let right = typeof $CONST_RIGHT != 'undefined' ?
      typeof $CONST_RIGHT === 'string' ? JSON.parse($CONST_RIGHT || "{}") : $CONST_RIGHT : {};
    let host = typeof $CONST_HOST != 'undefined' ?
      typeof $CONST_HOST === 'string' ? JSON.parse($CONST_HOST || "{}") : $CONST_HOST : {};
    this.store = fromJS({ project, right, host });
    this.HOST = host;
    this.PROJECT = project;
    this.RIGHT =right;
  }

  get(path) {
    let result = undefined;
    if (typeof path === 'string') {
      path = path.split(".");
      if (path.length > 0) {
        result = this.store.getIn(path);
      } else {
        result = this.store.get(path[0]);
      }
    } else if (path instanceof Array) {
      result = this.store.getIn(path);
    } else {
      result = this.store;
    }
    return result && result.toJS ? result.toJS() : (result || {});
  }

  getIn(array){
    let result = undefined;
    if (array instanceof Array) {
      result = this.store.getIn(array);
    } else {
      result = this.store;
    }
    return result;
  }

}

export default new QMConst();