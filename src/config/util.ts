/**
 * 获取 0 ~ num 的随机数（闭区间）
 */
export const randomNum = (num: number): number => 
    Math.floor(Math.random() * num);
    // Math.floor(Math.random() * (num + 1));

/*
 * 获取范围随机数 （闭区间）
 */
export const randomRange = (start: number, end: number): number => 
    Math.floor(Math.random() * (end - start + 1)) + start;

export const getAccessToken = (): string => {
  // const userId = '5ac1f31087e83ef4915abc02';
  // return userId;
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)huanyin\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  return cookieValue ? cookieValue : '';
  // return '5ac1f31087e83ef4915abc02';
};

export const accessToken = () => {
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)huanyin\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  return cookieValue ? cookieValue.slice(4, 28) : void 0;
};

// 到达页尾事件
export const arriveFooter = (function() {

    // 如果是服务器，那么就不存在 window 和 document 全局变量，因此不继续执行
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return {
        add: (name: any, fn: any) => {/**/},
        remove: (name: any) => {/**/}
      };
    }
  
    let list: any = [];
    let clientHeight = document.documentElement.clientHeight;
  
    const resize = (e: any) => {
      clientHeight = document.documentElement.clientHeight;
    };
  
    const scroll = (e: any) => {
  
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0;
      let scrollHeight = document.body.scrollHeight || document.documentElement.scrollTop;
  
      if (scrollTop + clientHeight >= scrollHeight - 150) {
        list.map((val: any) => {
          val.callback();
        });
      }
    };
  
    window.addEventListener('scroll', scroll, false);
    window.addEventListener('resize', resize, false);

    // if (window.attachEvent) {
    //   window.attachEvent('onscroll', scroll);
    //   window.attachEvent('onresize', resize);
    // } else {
    //   window.addEventListener('scroll', scroll, false);
    //   window.addEventListener('resize', resize, false);
    // }
  
    return {
      add: (name: any, fn: any) => {
        list.push({ name: name, callback: fn });
      },
      remove: (name: any) => {
        for (let i = 0, max = list.length; i < max; i++) {
          if (list[i].name === name) {
            list.splice(i, 1);
            break;
          }
        }
      }
    };
}());
  
export const browser = {
  isAndroid: function() {
      return navigator.userAgent.match(/Android/i) ? true : false;
  },
  isMobileQQ : function() {
      var ua = navigator.userAgent;
      return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(ua) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(ua);
  },
  isIOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
  },
  isWx : function() {
      return navigator.userAgent.match(/micromessenger/i) ? true : false;
  }
};

export const inApp = !!navigator.userAgent.toLowerCase().match('gacha'); 

export const timeFn = (d1: Date): string => {
    /* 
    /di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    */ 

    /*//将-转化为/，使用new Date*/
    var dateBegin = new Date(d1);
    var dateEnd = new Date();
    var dateDiff = dateEnd.getTime() - dateBegin.getTime(); 
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
    var leave1 = dateDiff % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));
    var leave2 = leave1 % (3600 * 1000);   
    var minutes = Math.floor(leave2 / (60 * 1000));
    var leave3 = leave2 % (60 * 1000);
    var seconds = Math.round(leave3 / 1000);
    // console.log(' 相差 ' + dayDiff + '天 ' + hours + '小时 ' + minutes + ' 分钟' + seconds + ' 秒');
    return ' 距离开始还有 ' + dayDiff + '天 ' + hours + '小时 ' + minutes + ' 分钟' + seconds + ' 秒';
    // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
    //     ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
};

/* 节流 */
// export function debounce (func: () => void, wait: number, immediate?: boolean) {

//   let timeout: any;
//   let result: any;

//   var debounced = function () {

//       if (timeout) {
//         console.log(timeout);
//         clearTimeout(timeout);
//       }
//       if (immediate) {
//           // 如果已经执行过，不再执行
//           var callNow = !timeout;
//           timeout = setTimeout(function () {
//               timeout = null;
//           }, wait);
//           if (callNow) {
//             result = () => func();
//           }
//       } else {
//           timeout = setTimeout(() => func(), wait);
//       }
//       return result;
//   };

//   return debounced;
// }

export const debounce = (func: () => void, wait: number) => {

  let timeout: any;

  return () => {

    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };  
};