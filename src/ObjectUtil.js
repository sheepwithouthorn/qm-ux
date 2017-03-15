/**
 * @author gcy[of1518]
 * @date 2017.02
 *
 * @description 对象拓展工具类
 */
class ObjectUtil {

  isEmptyObject(obj = {}) {
    return typeof obj == 'object' && Object.keys(obj).length === 0;
  };
}

export default new ObjectUtil();