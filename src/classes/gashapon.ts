import { GashaponUser } from './user';
import { GashaponProductItem } from '../types/componentTypes';

interface Param {
    user: GashaponUser;
    count: number;
    machineId: string;
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

    private user: GashaponUser;
    private count: number;
    private machineId: string;
    
    constructor ({user, count, machineId}: Param) {
        this.user       = user;
        this.count      = count;
        this.machineId  = machineId;
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
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_USER_PARAM',
                message: err.message
            };
        }

        try {
            const result = await fetch(`/pay/product/${this.user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    count               : this.count,
                    machine_id          : this.machineId,
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