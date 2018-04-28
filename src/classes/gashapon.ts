import { UserType } from './user';
import { GashaponProductItem, Gashapon as GashaponType } from '../types/componentTypes';
import * as Numeral from 'numeral';
import { NormalReturnObject } from './base';

interface Param {
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
    machine : string;
}

class Gashapon {

    /* 进行扭蛋业务的用户 */
    private user    : UserType;
    /* 进行扭蛋的次数 */
    private count   : number;
    /* 扭蛋机 */
    private machine : GashaponType;
    
    constructor ({user, count, machine}: Param) {
        this.user       = user;
        this.count      = count || 0;
        this.machine    = machine;
    }
    
    /**
     * 扭蛋 Method
     */
    public doGashaponMethod = async (): Promise<DoGashaponMethodReturnObject> => {

        try {
            if (!this.user) {
                throw new Error('用户数据错误');
            } else if (!this.user.userId) {
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

            const result = await fetch(`/pay/product/${this.user.userId}`, {
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

    public doCollectGashaponMethod = async (): Promise<NormalReturnObject> => {

        try {
            if (!this.user) {
                throw new Error('用户数据错误');
            } else if (!this.user.userId) {
                throw new Error('用户_id错误');
            } else if (!this.machine._id) {
                throw new Error('扭蛋数据错误');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message
            };
        }

        try {

            const result = await fetch(`/collect/machines/renew/${this.user.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    machines: [this.machine._id],
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

    public doCancelCollectGashaponMethod = async (): Promise<NormalReturnObject> => {

        try {
            if (!this.user) {
                throw new Error('用户数据错误');
            } else if (!this.user.userId) {
                throw new Error('用户_id错误');
            } else if (!this.machine._id) {
                throw new Error('扭蛋数据错误');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message
            };
        }

        try {

            const result = await fetch(`/collect/machines/delete/${this.user.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    machines: [this.machine._id],
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
    public doAddCommentMethod = async ({uid, content}: DoAddCommentMethodParam): Promise<NormalReturnObject> => {
        try {
            if (!uid) {
                throw new Error('uid');
            } else if (!content) {
                throw new Error('content');
            } else if (!this.machine._id) {
                throw new Error('扭蛋数据错误');
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
                machine: this.machine._id,
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

export default Gashapon;