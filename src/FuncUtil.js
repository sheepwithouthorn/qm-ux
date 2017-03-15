/**
 * @author gcy[of1518]
 * @date 16/10/21
 *
 * @description 函数（方法）工具类
 */

/**
 *  函数合成
 */
const funcMeger = (...fs) => (...args) =>
  fs.map(
    f => args = [f.apply(null, args)]
  ).pop()[0];
exports.funcMeger = funcMeger;

/**
 *  参数倒置
 */
const flip = fn => (a, b, ...args) => fn(b, a, ...args.reverse());
exports.flip = flip;
/**
 * 方法递归执行，直到满足条件
 */
const until = (condition, f) => (...args) => {
  let r = f.apply(null, args);
  return condition(r) ? r : until(condition, f)(r);
};
exports.until = until;

/**
 *  合并
 */
const zip = (...xs) => {
  let r = [];
  let nple = [];
  let length = Math.min.apply(null, xs.map(x => x.length));

  for (let i = 0; i < length; i++) {
    xs.forEach(
      x => nple.push(x[i])
    );

    r.push(nple);
    nple = [];
  }
  return r;
};
exports.zip = zip;

/**
 * 合并
 */
const zipWith = (op, ...xs) => {
  return zip.apply(null, xs).map(
    (x) => x.reduce(op)
  );
};
exports.zipWith = zipWith;



/**
 * component props 拆分props
 * @param {object} obj props
 * @param {object} parts props container
 */
const splitObject = (obj, parts) => {
  let extra = {};
  let orign = {};
  Object.keys(obj).forEach((v) => {
    if (parts.indexOf(v) !== -1) {
      extra[v] = obj[v];
    } else {
      orign[v] = obj[v];
    }
  });
  return [extra, orign];
}
exports.splitObject = splitObject;