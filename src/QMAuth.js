/**
 * @author gaojin
 * @date 2016/08
 *
 * @description 电商云账号建权
 * JWT:方案,token存放在cookie中
 */
import {setCookie, getCookie, removeCookie} from './CookiesUtil';
import QMConst from './QMConst';

/**
 * 判断是否ipv4
 */
function isIpv4(domain) {
  let regex = /^(\d{1,3}\.){3}(\d{1,3})$/g;
  return regex.test(domain);
}
exports.isIpv4 = isIpv4;

/**
 * 判断是否ipv6
 */
function isIpv6(domain) {
  let regex = /^([\dA-F]{4}:){7}([\dA-F]{4})$/g;
  return regex.test(domain);
}
exports.isIpv6 = isIpv6;

/**
 * 获取当前domain
 */
function topDomain() {
  let domain = location.hostname;
  if (isIpv4(domain) || isIpv6(domain)) {
    return domain;
  }
  let arr = domain.split('.');
  if (arr.length > 2) {
    return arr.slice(-2).join('.');
  }
  return domain;
}
exports.topDomain = topDomain;

/**
 * 登录,建权
 */
function load(token) {
  let {name, path} = QMConst.get("right");
  setCookie({name, value: token, domain: topDomain(), path});
}
exports.load = load;

/**
 * 是否登录
 */
function right() {
  let {name, path, type} = QMConst.get("right");
  let ossPath = QMConst.getIn(['host','v_oss']);
  let token = getCookie({name, domain: topDomain(), path});
  return token;
}
exports.right = right;

/**
 * 移除
 */
function logout() {
  let {name, path} = QMConst.get("right");
  removeCookie({name, domain: topDomain(), path});
  console.info("退出登录");
}

exports.logout = logout;