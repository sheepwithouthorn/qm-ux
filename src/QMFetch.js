/**
 * @author gcy[of1518]
 * @date
 * @description 请求工具类
 * @require whatwg-fetch
 */
import 'whatwg-fetch';
import { message } from 'antd';
import * as auth from './QMAuth';
import QMConst from './QMConst';
let statusController = {}

let QMFetch = (param) => {
  let { host = "", url, timeout = 10, netErrorCall } = param;
  let APIHost = QMConst.get("project.APIHost") || "";
  host = !!host ? host : (APIHost || "");
  url = (QMConst.get(['host', host]) || "") + "/" + url;

  let option = packParam(param);
  return new Promise((resolve, reject) => {
    //请求超时处理
    const timeoutCall = setTimeout(() => {
      message.warning('网络不给力');
      resolve({ res: {}, err: new Error('timeout') });
    }, timeout * 1000);
    fetch(url, option)
      .then((res) => {
        if (__DEV__) console.log(`fetch:url:${url},option${JSON.stringify(option)}`);
        let _status = parseInt(res.status);
        let func = statusController[_status];
        if (typeof func === 'function') {
          func.bind(this, res).apply();
        }
        clearTimeout(timeoutCall);
        let _resp = res.json();
        _resp.then((_res) => {
          if (!!_res.token) {
            auth.load(_res.token);
          }
          resolve(packResponse(_res, netErrorCall));
        })
      })
      .catch((err) => {
        clearTimeout(timeoutCall);
        console.error(err);
        message.warning('请求发生错误，请检查您的网络，稍后重试!');
        resolve({ res: {}, err: err });
      })
  });
};

/**
 * pack param
 * @param {*} param
 */
function packParam(param) {
  delete param['url'];
  delete param['host'];
  delete param['timeout'];
  let { Platform, SystemId } = QMConst.get('project') || {};
  //获取票据
  const Authorization = auth.right();
  //default
  let req = {
    method: "GET",
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Platform': Platform,
      'systemId': SystemId,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    }
  };
  if (param && param['body'] && typeof param['body'] == 'object') {
    param['body'] = unescape(JSON.stringify(param['body']).replace(/\\u/g, '%u'));
  }
  return Object.assign(req, param)
}

/**
 * pack response
 */
function packResponse(res, netErrorCall) {
  const { status, message: msg, data } = res;
  let response = { err: null, res: {} };
  switch (status) {
    case 1:
      response = { data, message: msg };
      break;
    case -1:
    case -2:
      response = { data: {}, err: new Error(msg) };
      break;
    case -4:
      message.error(`${msg || "网络好像不太好使!"}`)
      response = { data: {}, err: new Error(msg) };
      break;
    case -5:
      message.error("加班太多,体力跟不上了.(･･;)");
      response = { data: {}, err: new Error(msg) };
      break;
    default:
      if (netErrorCall && typeof netErrorCall === 'function') {
        netErrorCall(new Error(msg), res);
      } else {
        //message.warning(msg);
        response = { data: {}, err: new Error(msg), message: msg };
      }
      break;
  }
  return response;
}

QMFetch.register = (code, func) => {
  let _code = parseInt(code);
  if (_code) {
    statusController[code] = func;
  }
}

export default QMFetch;