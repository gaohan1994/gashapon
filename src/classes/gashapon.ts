import { UserType } from './user';
import { GashaponProductItem, Gashapon as GashaponType } from '../types/componentTypes';
import * as Numeral from 'numeral';

interface Param {
    user        : UserType;
    count       : number;
    machine     : GashaponType;
}

export interface DoGashaponMethodReturnObject {
    success ?: boolean;
    type    ?: string;
    message ?: string;
    data    ?: {
        channel: number;
        create_date: Date;
        desc: string;
        fixed_value: number;
        from_user: string;
        from_user_headimgurl: string;
        from_user_name: string;
        name: string;
        product_list: GashaponProductItem[];
        status: number;
        type: number;
        value: number;
        _id: string;
    };
}

class Gashapon {

    private user    : UserType;
    private count   : number;
    private machine : GashaponType;
    
    constructor ({user, count, machine}: Param) {
        this.user       = user;
        this.count      = count;
        this.machine    = machine;
    }
    
    public doGashaponMethod = async (): Promise<DoGashaponMethodReturnObject> => {

        try {
            if (!this.user) {
                throw new Error('用户数据错误');
            } else if (!this.user._id) {
                throw new Error('用户_id错误');
            } else if (!this.user.name) {
                throw new Error('用户name错误');
            } else if (!this.user.headimg) {
                throw new Error('用户headimg错误');
            } else if (!this.user.remain) {
                throw new Error('用户余额错误');
            } else if (!this.machine._id) {
                throw new Error('扭蛋数据错误');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_USER_PARAM',
                message: err.message
            };
        }

        try {

            if (this.user.remain < (this.count * Numeral(this.machine.price / 100).value())) {
                return {
                    type: 'ERROR_GASHAPON',
                    message: '余额不足'
                };
            }

            const result = await fetch(`/pay/product/${this.user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    count               : this.count,
                    machine_id          : this.machine._id,
                    from_user_name      : this.user.name,
                    from_user_headimgurl: this.user.headimg
                })
            })
            .then(res => res.json());
            if (result.success) {
                return { 
                    success: true,
                    data: result.result
                };
            } else {
                return {
                    type: 'ERROR_GASHAPON',
                    message: result.message
                };
            }
        } catch (err) {
            console.log('扭蛋失败', err);
            return {
                type: 'ERROR_GASHAPON',
                message: '扭蛋失败'
            };
        }
    }
}

export default Gashapon;