// import { NormalReturnObject } from './base';

/**
 * userId: 用户Id
 * machine: 扭蛋机id
 * max_discount: 最大折扣
 * title: 扭蛋title
 * image: 扭蛋图片
 */
export interface CreateDiscountPlayParam {
    userId      : string;
    machine     : string;
    max_discount: number;
    title       : string;
    image       : string;
}

/**
 * 返回值
 */
export interface CreateDiscountPlayReturn {
    success     ?: boolean;
    type        ?: string;
    message     ?: string;
    discountId  ?: string;
}

/**
 * userId: 用户Id
 * discountId: 创建的折扣id
 * nick: 用户昵称
 * image: image
 */
export interface HelpDiscountMethodParam {
    userId      : string;
    discountId  : string;
    nick        : string;
    image       : string;
}

/**
 * 返回值
 */
export interface HelpDiscountMethodReturn {
    success ?: boolean;
    type    ?: string;
    message ?: string;
    result  ?: number;
}

class Discount {

    constructor () {
        this.createDiscoutPlay  = this.createDiscoutPlay.bind(this);
        this.helpDiscountMethod = this.helpDiscountMethod.bind(this);
    }

    public createDiscoutPlay = async ({userId, machine, max_discount, title, image}: CreateDiscountPlayParam): Promise<CreateDiscountPlayReturn> => {
        try {
            if (!machine) {
                throw new Error('machine');
            } else if (!userId) {
                throw new Error('userId');
            } else if (!max_discount) {
                throw new Error('max_discount');
            } else if (!title) {
                throw new Error('title');
            } else if (!image) {
                throw new Error('image');
            } 
        } catch (err) {
            return {
                type    : 'PARAM_ERROR',
                message : err.message ? err.message : '数据错误'
            };
        }

        try {
            const result = await fetch(`/create/discount_plan/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    machine     : machine,
                    max_discount: max_discount,
                    title       : title,
                    image       : image,
                })
            }).then(res => res.json());

            if (result.success === true) {
                return {
                    success     : true,
                    discountId  : result.result
                };
            } else {
                throw new Error('FETCH_DISCOUNT_ERROR');
            }
        } catch (err) {
            return {
                type    : 'DISCOUNT_ERROR',
                message : err.message ? err.message : '创建砍价错误'
            };
        }
    }

    public helpDiscountMethod = async ({userId, discountId, nick, image}: HelpDiscountMethodParam): Promise<HelpDiscountMethodReturn> => {
        try {
            if (!userId) {
                throw new Error('userId错误');
            } else if (!discountId) {
                throw new Error('discountId错误');
            } else if (!nick) {
                throw new Error('nick错误');
            } else if (!image) {
                throw new Error('image错误');
            }
        } catch (err) {
            return {
                type    : 'PARAM_ERROR',
                message : err.message ? err.message : '数据错误'
            };
        }

        try {
            const result = await fetch(`/discount_plan/help/${userId}/${discountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nick    : nick,
                    image   : image
                })
            }).then(res => res.json());

            if (result.success === true) {
                return {
                    success : true,
                    result  : result.result
                };
            } else {
                throw new Error('HELP_DISCOUNT_ERROR');
            }
        } catch (err) {
            return {
                type    : 'DISCOUNT_ERROR',
                message : err.message ? err.message : '帮忙砍价错误'
            };
        }
    }

}

export default new Discount();