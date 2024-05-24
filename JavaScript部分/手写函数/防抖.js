/**
 * @description 防抖(debounce)
 * @param {Function} handler    回调函数
 * @param {Number}   delay      延迟事件(ms),不传默认200ms
 * @param {Boolean}  flag       触发时是否立即执行一次，默认不执行
 * @return {Function}
 * 原理:
 * 不管事件触发频率多高，一定在事件触发的n秒后才执行，如果你在一个事件触发的n秒内又触发了这个事件，
 * 就以新的事件的事件为准，n秒后才执行。总之，触发完事件n秒内不再触发事件，n秒后再执行。（频率触发就执行最后一次）
 * 应用场景:
 * 1.窗口大小变化，调整样式
 * 2.搜索框，输入后1000毫秒搜索
 * 3.表单验证，输入1000毫秒后验证
 * 4.频繁点击按钮，使用防抖避免重复提交请求
 * 防抖实现：
 * 1.debounce实则是个包装函数，通过传入操作函数和时间间隔，来返回一个新函数
 * 2.新函数中主要是通过定时器来设置函数调用的频率
 * 3.flag只有第一次触发的时候会立即执行。
 */

function debounce(handler, delay = 200, flag = false) {
  let timer = null;
  return function (...arg) {
    if (flag && !timer) {
      handler.apply(this, arg);
    }
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      handler.apply(this, arg);
      timer = null;
    }, delay);
  };
}
