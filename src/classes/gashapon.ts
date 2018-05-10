import { UserType } from './user';
import { GashaponProductItem, Gashapon as GashaponType } from '../types/componentTypes';
import * as Numeral from 'numeral';
import { NormalReturnObject } from './base';

// interface Param {
//     user        : UserType;
//     count       ?: number;
//     machine     : GashaponType;
// }

export interface DoGashaponMethodParam {
    user        : UserType;
    count       ?: number;
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

/**
 * uid: 用户id
 * content: 弹幕内容
 * machine: 扭蛋机id
 * 
 * @export
 * @interface DoAddCommentMethodParam
 */
export interface DoAddCommentMethodParam {
    uid     : string;
    content : string;
    machine : GashaponType;
}

class Gashapon {

    /* 进行扭蛋业务的用户 */
    // private user    : UserType;
    /* 进行扭蛋的次数 */
    // private count   : number;
    /* 扭蛋机 */
    // private machine : GashaponType;
    
    constructor (/* {user, count, machine}: Param */) {
        // this.user       = user;
        // this.count      = count || 0;
        // this.machine    = machine;

        this.doGashaponMethod               = this.doGashaponMethod.bind(this);
        this.doCollectGashaponMethod        = this.doCollectGashaponMethod.bind(this);
        this.doCancelCollectGashaponMethod  = this.doCancelCollectGashaponMethod.bind(this);
        this.doAddCommentMethod             = this.doAddCommentMethod.bind(this);
    }
    
    /**
     * 扭蛋 Method
     */
    public doGashaponMethod = async ({user, count = 1, machine}: DoGashaponMethodParam): Promise<DoGashaponMethodReturnObject> => {

        try {
            if (!user) {
                throw new Error('user');
            } else if (!user.uid) {
                throw new Error('uid');
            } else if (!user.name) {
                throw new Error('name');
            } else if (!user.headimg) {
                throw new Error('headimg');
            } else if (!user.remain) {
                throw new Error('remain');
            } else if (!machine._id) {
                throw new Error('_id');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_USER_PARAM',
                message: err.message ? err.message : '数据错误'
            };
        }

        try {

            if (user.remain < (count * Numeral(machine.price / 100).value())) {
                return {
                    type: 'ERROR_GASHAPON',
                    message: '余额不足'
                };
            }

            const result = await fetch(`/pay/product/${user.uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    count               : count,
                    machine_id          : machine._id,
                    from_user_name      : user.name,
                    from_user_headimgurl: user.headimg
                })
            }).then(res => res.json());
            
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

    public doCollectGashaponMethod = async ({user, machine}: DoGashaponMethodParam): Promise<NormalReturnObject> => {

        try {
            if (!user) {
                throw new Error('user');
            } else if (!user.uid) {
                throw new Error('uid');
            } else if (!machine._id) {
                throw new Error('machine._id');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message ? err.message : '数据错误'
            };
        }

        try {

            const result = await fetch(`/collect/machines/renew/${user.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    machines: [machine._id],
                })
            })
            .then(res => res.json());

            if (result.success) {
                return { 
                    success: true
                };
            } else {
                return {
                    type: 'ERROR_COLLECT_GASHAPON',
                    message: result.message
                };
            }
        } catch (err) {
            console.log('收藏失败', err);
            return {
                type: 'ERROR_COLLECT_GASHAPON',
                message: '收藏失败'
            };
        }
    }

    public doCancelCollectGashaponMethod = async ({user, machine}: DoGashaponMethodParam): Promise<NormalReturnObject> => {

        try {
            if (!user) {
                throw new Error('user');
            } else if (!user.uid) {
                throw new Error('uid');
            } else if (!machine._id) {
                throw new Error('machine._id');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message ? err.message : '数据错误'
            };
        }

        try {

            const result = await fetch(`/collect/machines/delete/${user.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    machines: [machine._id],
                })
            })
            .then(res => res.json());

            if (result.success) {
                return { 
                    success: true
                };
            } else {
                return {
                    type: 'ERROR_CANCEL_COLLECT_GASHAPON',
                    message: result.message
                };
            }

        } catch (err) {
            console.log('取消收藏失败', err);
            return {
                type: 'ERROR_CANCEL_COLLECT_GASHAPON',
                message: '取消收藏失败'
            };
        }
    }

    /**
     * 添加弹幕
     * 
     * @memberof Gashapon
     */
    public doAddCommentMethod = async ({uid, content, machine}: DoAddCommentMethodParam): Promise<NormalReturnObject> => {
        try {
            if (!uid) {
                throw new Error('uid');
            } else if (!content) {
                throw new Error('content');
            } else if (!machine._id) {
                throw new Error('_id');
            }
        } catch (err) {
            return {
                type    : 'PARAM_ERROR',
                message : err.message ? err.message : '数据错误'
            };
        }

        const result = await fetch(`/add/comment/${uid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: content,
                machine: machine._id,
            })
        }).then(res => res.json());
        
        if (result.success === true) {
            return { success: true };
        } else {
            return {
                type    : 'ADD_COMMENT_ERROR',
                message : result.message ? result.message : '添加弹幕失败'
            };
        }
    }
}

export default new Gashapon();