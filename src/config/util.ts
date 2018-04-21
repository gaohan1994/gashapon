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
    const userId = '5ac1f31087e83ef4915abc02';
    return userId;
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
        list.map((val: any) => { val.callback(); });
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
  