import { UserType } from './user';
import * as numeral from 'numeral';
import { NormalReturnObject } from './base';

type Products = object[];

export interface DoRecycleMethodParam {
    userId  : string;
    products: Products;
}

class Business {

    constructor () {
        this.doOrderMethod      = this.doOrderMethod.bind(this);
        this.doRecycleMethod    = this.doRecycleMethod.bind(this);
        this.doRechargeMethod   = this.doRechargeMethod.bind(this);
    }

    /**
     * doOrderMethod 下单
     * 
     */
    public doOrderMethod = async (user: UserType, products: Products): Promise<NormalReturnObject> => {
        try {
            if (!user) {
                throw new Error('用户数据错误');
            } else if (!user.userId) {
                throw new Error('用户_id错误');
            } else if (!user.address) {
                throw new Error('用户address错误');
            } else if (!user.receiver) {
                throw new Error('用户receiver错误');
            } else if (!user.phone) {
                throw new Error('用户phone错误');
            } else if (!products) {
                throw new Error('产品错误');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message
            };
        }
        
        try {
            const result = await fetch(`/product/order/${user.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address     : user.address,
                    receiver    : user.receiver,
                    phone       : user.phone,
                    product_list: products,
                })
            })
            .then(res => res.json());
            if (result.success) {
                return { success: true };
            } else {
                return {
                    type: 'ERROR_ORDER',
                    message: '下单失败'
                };
            }
        } catch (err) {
            console.log('下单失败', err);
            return {
                type: 'ERROR_ORDER',
                message: '下单失败'
            };
        }
    }

    /**
     * 回收扭蛋
     * userID   : 用户ID
     * products : 回收列表
     * 
     * @memberof Business
     */
    public doRecycleMethod = async ({userId, products}: DoRecycleMethodParam): Promise<NormalReturnObject> => {
        try {
            if (!userId) {
                throw new Error('用户数据错误');
            } else if (!products) {
                throw new Error('产品错误');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message
            };
        }

        try {
            const result = await fetch(`/egg_cabinet/recycle/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_list: products,
                })
            }).then(res => res.json());

            if (result.success === true) {
                return { success: true };
            } else {
                throw new Error(result.message ? result.message : '回收失败');
            }
        } catch (err) {
            console.log('回收失败', err);
            return {
                type: 'ERROR_ORDER',
                message: '回收失败'
            };
        }
    }

    /**
     * 充值
     * user : 充值用户信息
     * value: 充值金额
     * 
     * @memberof Business
     */
    public doRechargeMethod = async (user: UserType, value: number): Promise<NormalReturnObject> => {
        try {
            if (!user) {
                throw new Error('用户数据错误');
            } else if (!user.userId) {
                throw new Error('用户_id错误');
            } else if (!user.name) {
                throw new Error('用户name错误');
            } else if (!user.headimg) {
                throw new Error('用户headimg错误');
            } else if (!value) {
                throw new Error('value错误');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message
            };
        }

        try {
            const money = numeral(value).value();
            console.log('money', money);
            const result = await fetch(`/pay/recharge/${user.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    value               : money,
                    from_user_name      : user.name,
                    from_user_headimgurl: user.headimg
                })
            })
            .then(res => res.json());

            if (result.success) {
                return { success: true };
            } else {

                return {
                    type: 'ERROR_RECHARGE',
                    message: '充值失败'
                };
            }

        } catch (err) {
            console.log('充值失败', err);
            return {
                type: 'ERROR_RECHARGE',
                message: '充值失败'
            };
        }
    }
}

export default new Business();