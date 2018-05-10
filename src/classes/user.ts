import { getAccessToken } from '../config/util';
import { NormalReturnObject } from './base';

export interface UserType {
    userId  : string;
    uid     : string;
    address : string;
    receiver: string;
    phone   : string;
    name    : string;
    headimg : string;
    remain  : number;
}

interface Params {
    userId  ?: string;
    uid     ?: string;
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
    /* uuid cookie拿 */
    private userId  : string;
    /* 用户uid 通过uuid请求 */
    private uid     ?: string;
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
        this.init();

        this.userId = getAccessToken();
        this.getUser                = this.getUser.bind(this);
        this.setUser                = this.setUser.bind(this);
        this.doAddAddressMethod     = this.doAddAddressMethod.bind(this);
        this.doChangeAddressMethod  = this.doChangeAddressMethod.bind(this);
    }
    
    public getUser = (): UserType => {
        return {
            uid     : this.uid ? this.uid : '',
            userId  : this.userId,
            address : this.address,
            receiver: this.receiver,
            phone   : this.phone,
            name    : this.name,
            headimg : this.headimg,
            remain  : this.remain,
        };
    }

    /**
     * 启动函数
     * 
     * @memberof User
     */
    public init = async (): Promise<void> => {
        console.log('init');

        const uuid = getAccessToken();

        if (!uuid) {
            return;
        }

        try {
            const result = await fetch(`/accesstoken/${uuid}`).then(res => res.json());
            console.log('result', result);
            if (result.success === true) {
                
                this.uid = result.result._id;
            } else {
                throw new Error('请求accesstoken接口出错');
            }
        } catch (err) {
            console.log('setUserId err', err);
        }
    }

    public setUser = ({uid, userId, address, receiver, phone, name, headimg, remain}: Params): void => {
        this.uid        = uid       
                            ? uid 
                            : this.uid ? this.uid : '',
        this.userId     = userId    
                            ? userId 
                            : this.userId ? this.userId : '',
        this.address    = address   
                            ? address 
                            : this.address ? this.address : '';
        this.receiver   = receiver  
                            ? receiver 
                            : this.receiver ? this.receiver : '';
        this.phone      = phone     
                            ? phone 
                            : this.phone ? this.phone : '';
        this.name       = name      
                            ? name 
                            : this.name ? this.name : '';
        this.headimg    = headimg   
                            ? headimg 
                            : this.headimg ? this.headimg : '';
        this.remain     = remain    
                            ? remain 
                            : this.remain ? this.remain : 0;
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
            } else if (!this.uid) {
                throw new Error('uid');
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
                type: 'PARAM_ERROR',
                message: err.message ? err.message : '数据错误'
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