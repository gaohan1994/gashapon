import { getAccessToken } from '../config/util';
import { NormalReturnObject } from './base';

export interface UserType {
    userId  : string;
    address : string;
    receiver: string;
    phone   : string;
    name    : string;
    headimg : string;
    remain  : number;
}

interface Params {
    userId  ?: string;
    address ?: string;
    receiver?: string;
    phone   ?: string;
    name    ?: string;
    headimg ?: string;
    remain  ?: number;
}

export interface DoAddressMethodParam {
    data: {
        receiver    : string;
        phone       : string;
        detail_area : string;
        detail_home : string;
        postal_code : string;
        is_default  ?: boolean;
    };
}

export interface GetUserFromAccesstokenRetrun {
    success ?: boolean;
    type    ?: string;
    message ?: string;
    uid     ?: string;
}

export interface SetUserIdReturn {
    success ?: boolean;
    data    ?: object;
    type    ?: string;
    message ?: string;
}

class User {
    /* id cookie拿 */
    private userId  : string;
    /* 地址 */
    private address : string;
    /* 收货人姓名 */
    private receiver: string;
    /* 手机号 */
    private phone   : string;
    /* 姓名 */
    private name    : string;
    /* 用户头像 */
    private headimg : string;
    /* 余额 */
    private remain  : number;

    constructor () {
        this.userId = getAccessToken();

        this.getUser                = this.getUser.bind(this);
        this.setUser                = this.setUser.bind(this);
        this.doAddAddressMethod     = this.doAddAddressMethod.bind(this);
        this.doChangeAddressMethod  = this.doChangeAddressMethod.bind(this);
        this.setUserId              = this.setUserId.bind(this);
    }
    
    public getUser = (): UserType => {
        return {
            userId  : this.userId,
            address : this.address,
            receiver: this.receiver,
            phone   : this.phone,
            name    : this.name,
            headimg : this.headimg,
            remain  : this.remain,
        };
    }

    public setUserId = async (): Promise <SetUserIdReturn> => {

        const uuid = getAccessToken();

        try {
            if (!uuid) {
                throw new Error('cookie中不存在uuid');
            }
        } catch (err) {
            console.log('setUserId err', err);
            return {
                type    : 'UUID_ERROR',
                message : err.message ? err.message : '数据错误'
            };
        }

        try {
            const result = await fetch(`/accesstoken/${uuid}`).then(res => res.json());

            if (result.success === true) {
                
                this.userId = result._id;

                return {
                    success : true,
                    data    : result.result
                };
            } else {
                throw new Error('请求accesstoken接口出错');
            }
        } catch (err) {
            console.log('setUserId err', err); 
            return {
                type    : 'ERROR_FETCH_UID',
                message : err.message ? err.message : '请求uid出错'
            };
        }
    }

    public setUser = ({userId, address, receiver, phone, name, headimg, remain}: Params): void => {
        this.userId     = userId    ? userId : '',
        this.address    = address   ? address : '';
        this.receiver   = receiver  ? receiver : '';
        this.phone      = phone     ? phone : '';
        this.name       = name      ? name : '';
        this.headimg    = headimg   ? headimg : '';
        this.remain     = remain    ? remain : 0;
    }

    public getUserFromAccesstoken = async (uuid: string): Promise <GetUserFromAccesstokenRetrun> => {
        try {
            if (!uuid) {
                throw new Error('uuid');
            } 
        } catch (err) {
            console.log(err.message);
            return {
                type: 'ERROR_GET_USERID',
                message: err.message ? err.message : '获取用户id错误'
            };
        }

        try {
            
            const result = await fetch(`/accesstoken/${uuid}`).then(res => res.json());

            if (result.success === true) {
                return { 
                    success : true,
                    uid     : result.result
                };
            } else {
                throw new Error(result.message ? result.message : '获取用户id错误');
            }

        } catch (err) {
            console.log('getUserFromAccesstoken', err);
            return {
                type: 'FETCH_ACCESSTOKEN_ERROR',
                message: err.message ? err.message : '获取用户id错误'
            };
        }
    }

    public doAddAddressMethod = async ({data}: DoAddressMethodParam): Promise <NormalReturnObject> => {
        try {
            if (!this.userId) {
                throw new Error('userId');
            } else if (!data.receiver) {
                throw new Error('receiver');
            } else if (!data.phone) {
                throw new Error('phone');
            } else if (!data.detail_area) {
                throw new Error('detail_area');
            } else if (!data.detail_home) {
                throw new Error('detail_home');
            } else if (!data.postal_code) {
                throw new Error('postal_code');
            } 
        } catch (err) {
            console.log(err.message);
            return {
                type: 'ERROR_ADD_ADDRESS',
                message: err.message ? err.message : '增加地址数据错误'
            };
        }

        try {

            const result = await fetch(`/add/address/${this.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res => res.json());

            if (result.success === true) {
                return { success: true };
            } else {
                throw new Error(result.message ? result.message : '增加地址出错');
            }

        } catch (err) {
            console.log('doAddAddressMethod', err);
            return {
                type: 'FETCH_ADD_ADDRESS_ERROR',
                message: err.message ? err.message : '增加地址出错'
            };
        }
    }

    public doChangeAddressMethod = async ({data}: DoAddressMethodParam): Promise <NormalReturnObject> => {
        try {
            if (!this.userId) {
                throw new Error('userId');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'ERROR_CHANGE_ADDRESS',
                message: err.message ? err.message : '修改地址数据错误'
            };
        }

        try {

            const result = await fetch(`/change/address/${this.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res => res.json());

            if (result.success === true) {
                return { success: true };
            } else {
                throw new Error(result.message ? result.message : '修改地址数据错误');
            }
            
        } catch (err) {
            console.log('doChangeAddressMethod', err);
            return {
                type: 'FETCH_CHANGE_ADDRESS_ERROR',
                message: err.message ? err.message : '修改地址数据错误'
            };
        }
    }
}

export default new User();