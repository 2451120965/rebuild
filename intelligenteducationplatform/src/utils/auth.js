/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
 export function _throttle(fn, interval = 200) {
  let cd = true;
  return function() {
    const th = this
    const args = arguments
    if(cd) {
      fn.apply(th, args);
      cd = false;
      setTimeout(() => {
        cd = true;
      }, interval);
    }
  }
}
// 防抖
export function _debounce(fn, delay = 200) {
  var timer
  return function() {
    const th = this;
    const args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function() {
      timer = null
      fn.apply(th, args)
    }, delay);
  }
}

//深拷贝
export function deepCopy(obj){
  let type = Object.prototype.toString.call(obj)
  if(type == "[object Array]"){
      let backObj = [];
      for(let val of obj){
          backObj.push(deepCopy(val))
      };
      return backObj;
  }
  if(type == "[object Object]"){
      let backObj = {};
      for(let key in obj){
          if(obj.hasOwnProperty(key)){
              backObj[key] = deepCopy(obj[key])
          }
      };
      return backObj;
  }
  return obj;
}
