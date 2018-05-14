import { UserType } from './user';
import * as numeral from 'numeral';
import { NormalReturnObject } from './base';

type Products = object[];

export interface DoRecycleMethodParam {
    uid     : string;
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
                throw new Error('user');
            } else if (!user.uid) {
                throw new Error('uid');
            } else if (!user.address) {
                throw new Error('address');
            } else if (!user.receiver) {
                throw new Error('receiver');
            } else if (!user.phone) {
                throw new Error('phone');
            } else if (!products) {
                throw new Error('products');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type    : 'GET_WRONG_PARAM',
                message : err.message ? err.message : '数据错误'
            };
        }
        
        try {
            const result = await fetch(`/product/order/${user.uid}`, {
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
    public doRecycleMethod = async ({uid, products}: DoRecycleMethodParam): Promise<NormalReturnObject> => {
        try {
            if (!uid) {
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
            const result = await fetch(`/egg_cabinet/recycle/${uid}`, {
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
    public doRechargeMethod = async (user: UserType, value: number, app: boolean): Promise<NormalReturnObject> => {
        try {
            if (!user) {
                throw new Error('用户数据错误');
            } else if (!user.uid) {
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
            const result = await fetch(`/pay/recharge/${user.uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    value               : money,
                    from_user_name      : user.name,
                    from_user_headimgurl: user.headimg,
                    app                 : app
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