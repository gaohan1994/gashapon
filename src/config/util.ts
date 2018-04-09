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