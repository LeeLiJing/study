/**
 * @description 节流(throttle)
 * @param {Function} handler    回调函数
 * @param {Number}   delay      延迟事件(ms),不传默认200ms
 * @param {Boolean}  flag       触发时是否立即执行一次，默认不执行
 * @return {Function}
 * 不管事件触发频率多高，只在单位时间内执行一次。（频繁触发，还是按照时间间隔执行）
 * 应用场景:
 * 1.鼠标不断点击触发，mousedown（单位时间内只触发一次）
 * 2.监听滚动时间，比如是否滑到底部自动加载更多，用throttle来判断
 * 节流实现:
 * 1.和防抖不同的是，防抖中是取消定时器，节流中是定时器到时间自动执行，仅仅是将timer变量设置为null
 */

function throttle(handler, delay = 200, flag = false) {
  let timer = null;
  return function (...args) {
    if (flag && !timer) {
      handler.apply(this, args);
      flag = false;
    }

    if (!timer) {
      console.log(1);
      timer = setTimeout(() => {
        handler.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
