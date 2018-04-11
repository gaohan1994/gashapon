import { UserType } from './user';
import * as numeral from 'numeral';

type Products = object[];

interface ReturnObject {
    success ?: boolean;
    type    ?: string;
    message ?: string;
}

class Business {

    /**
     * doOrderMethod 下单
     * 
     */
    public doOrderMethod = async (user: UserType, products: Products): Promise<ReturnObject> => {
        try {
            if (!user) {
                throw new Error('用户数据错误');
            } else if (!user._id) {
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
            const result = await fetch(`/product/order/${user._id}`, {
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

    public doRechargeMethod = async (user: UserType, value: number): Promise<ReturnObject> => {
        try {
            if (!user) {
                throw new Error('用户数据错误');
            } else if (!user._id) {
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
            const result = await fetch(`/pay/recharge/${user._id}`, {
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