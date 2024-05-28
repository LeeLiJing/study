/**
 * @description 输入任意数据类型，返回数据类型
 * @param {any} data
 * @returns String
 */

const getType = (data) => {
  return Object.prototype.toString.call(data).slice(8, -1);
};

/**
 * @description 输入任意数据类型，判断是否是引用类型，null除外
 * @param {any} data
 * @returns Boolean
 */

const isObject = (data) => {
  return (
    (typeof data === "object" && data !== null) || getType(data) === "Function"
  );
};

/**
 * @description 深拷贝
 * @param {any} data
 * @param {}
 */
