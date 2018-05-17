import { getAccessToken } from '../config/util';
import { NormalReturnObject } from './base';

export interface Register {
    name    : string;
    password: string;
    phone   : string;
    code    : string;
    /* 推荐人 */
    referee ?: string;
}

export interface DoLoginMethodReturn {
    success ?: boolean;
    type    ?: string;
    message ?: string;
    uuid    ?: string;
}

export interface DoChangePhoneParam {
    phone: string;
    code : string;
}

export interface DoChangeUserdataParam {
    uid         : string;
    name        ?: string;
    headimgurl  ?: string;
}

export interface Login {
    phone   : string;
    password: string;
}

export interface DoForgetPasswordMethodParam {
    code        : string;
    phone       : string;
    password    : string;
}

interface DoBindHandleParam {
    user    : string;
    spread  : string;
}

class Sign {

    private user: {
        _id?: string;
    };

    constructor () {
        this.user = {
            _id: getAccessToken() ? getAccessToken() : ''
        };
        this.doRegisterMethod       = this.doRegisterMethod.bind(this);
        this.doLoginMethod          = this.doLoginMethod.bind(this);
        this.doLogoutMethod         = this.doLogoutMethod.bind(this);
        this.doCheckAuth            = this.doCheckAuth.bind(this);
        this.getVercode             = this.getVercode.bind(this);
        this.doChangePhoneMethod    = this.doChangePhoneMethod.bind(this);
        this.doChangeUserdata       = this.doChangeUserdata.bind(this);
        this.doBindHandle           = this.doBindHandle.bind(this);
        this.doForgetPasswordMethod = this.doForgetPasswordMethod.bind(this);
    }

    public doBindHandle = async ({user, spread}: DoBindHandleParam): Promise <NormalReturnObject> => {
        
        try {
            if (!user) {
                throw new Error('user');
            } else if (!spread) {
                throw new Error('spread');
            }
        } catch (err) {
            console.log('doBindHandle', err);
            return {
                type    : 'PARAM_ERROR',
                message : err.message ? err.message : '绑定用户出错'
            };
        }

        try {
            const result = await fetch(`/bind/spread`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user    : user,
                    spread  : spread
                })
            }).then(res => res.json());

            if (result.success === true) {
                return { success: true };
            } else {
                throw new Error('fetch /bind/spread err');
            }
        } catch (err) {
            console.log('doBindHandle', err);
            return {
                type    : 'FETCH_BIND_ERROR',
                message : err.message ? err.message : '绑定用户出错'
            };
        }
    }

    /**
     * 注册
     * 
     * @memberof Sign
     */
    public doRegisterMethod = async ({phone, name, password, code, referee}: Register): Promise<NormalReturnObject> => {
        try {
            if (!name) {
                throw new Error('name');
            } else if (!password) {
                throw new Error('password');
            } else if (!phone) {
                throw new Error('phone');
            } else if (!code) {
                throw new Error('code');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message
            };
        }
        
        try {
            const body = {
                phone   : phone,
                name    : name,
                password: password,
                code    : code
            };

            const result = await fetch(`/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(body)
            }).then(res => res.json());

            if (result.success === true) {

                /* 如果有推荐人 提交推荐人的id */
                if (!referee) {
                    return { success: true };
                } else {
                    
                    const uid = await fetch(`/accesstoken/${result.result}`).then(res => res.json());

                    if (uid.success === true) {
                        
                        const res = await this.doBindHandle({
                            user    : referee, 
                            spread  : uid.result._id
                        });
                        
                        if (res.success === true) {
                            return { success: true };
                        } else {
                            return {
                                type    : 'BIND_ERROR',
                                message : '注册成功绑定失败'
                            };
                        }
                    } else {
                        return {
                            type: 'ERROR_FETCH_UID',
                            message: '获取用户UID失败'
                        };
                    }
                }
            } else {
                return {
                    type: 'ERROR_REGISTER',
                    message: result.message
                };
            }
        } catch (err) {
            console.log('注册失败', err);
            return {
                type: 'ERROR_REGISTER',
                message: '注册失败'
            };
        }
    }

    /**
     * 登录
     * 
     * @memberof Sign
     */
    public doLoginMethod = async ({phone, password}: Login): Promise<DoLoginMethodReturn> => {
        try {
            if (!phone) {
                throw new Error('手机号码错误');
            } else if (!password) {
                throw new Error('密码错误');
            }
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message
            };
        }

        try {
            const result = await fetch(`/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    phone       : phone,
                    password    : password,
                })
            })
            .then(res => res.json());
            
            if (result.success === true) {
                return { 
                    success : true,
                    uuid    : result.result
                };
            } else {
                return {
                    type: 'ERROR_LOGIN',
                    message: result.message
                };
            }

        } catch (err) {
            console.log('登录失败', err);
            return {
                type: 'ERROR_LOGIN',
                message: '登录失败'
            };
        }
    }

    /**
     * 登出
     * 
     * @memberof Sign
     */
    public doLogoutMethod = async (): Promise<void> => {

        try {
            await fetch(`/logout`).then(res => res.json());
        } catch (err) {
            console.log('doLogoutMethod', err);
        }
    }

    /**
     * 是否登录 
     * 
     * @memberof Sign
     */
    public doCheckAuth = (): NormalReturnObject => {
        if (!getAccessToken()) {
            return { type: 'NOT_SIGN' };
        } else {
            return { success : true };
        }
    }

    /**
     * 获取验证码
     * 
     * @memberof Sign
     */
    public getVercode = async (phone: string): Promise <NormalReturnObject> => {

        if (!phone) {
            return {
                type: 'ERROR_PARAM',
                message: 'phone'
            };
        }

        try {
            const result = await fetch('/code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone
                })
            }).then(res => res.json());

            if (result.success === true) {
                return { success : true };
            } else {
                return {
                    type: 'ERROR_GETVERCODE',
                    message: '获取验证吗失败'
                };
            }
        } catch (err) {
            return {
                type: 'ERROR_GETVERCODE',
                message: err.message ? err.message : '获取验证吗失败'
            };
        }
    }

    /**
     * 修改手机号码
     * 
     * @memberof Sign
     */
    public doChangePhoneMethod = async ({phone, code}: DoChangePhoneParam): Promise<NormalReturnObject> => {
        try {
            if (!this.user) {
                throw new Error('用户数据错误');
            } else if (!this.user._id) {
                throw new Error('用户数据错误');
            } else if (!phone) {
                throw new Error('用户手机号码错误');
            } else if (!code) {
                throw new Error('用户验证码错误');
            }
        } catch (err) {
            return {
                type: 'ERROR_CHANGE_PHONE',
                message: '数据错误'
            };
        }

        try {
            const result = await fetch(`/change/phone/${this.user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone   : phone,
                    code    : code
                })
            }).then(res => res.json());

            if (result.success === true) {
                return {success: true};
            } else {
                throw new Error('修改验证码失败');
            }
        } catch (err) {
            return {
                type: 'ERROR_CHANGE_PHONE',
                message: err.message
            };
        }
    }

    /**
     * 修改用户数据
     * 
     * @memberof Sign
     */
    public doChangeUserdata = async ({uid, name, headimgurl}: DoChangeUserdataParam): Promise<NormalReturnObject> => {
        try {
            if (!uid) {
                throw new Error('用户数据错误');
            }
        } catch (err) {
            return {
                type: 'ERROR_PARAM',
                message: err.message ? err.message : '数据错误'
            };
        }
        
        try {
            let body: {name?: string; headimgurl?: string} = {};

            if (!!name) {
                body.name = name;
            }

            if (!!headimgurl) {
                body.headimgurl = headimgurl;
            }

            const result = await fetch(`/change/user_info/${this.user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(res => res.json());

            if (result.success === true) {
                return { success: true };
            } else {
                throw new Error(result.message ? result.message : '更改用户数据错误');
            }
        } catch (err) {
            return {
                type: 'ERROR_CHANGE_USERDATA',
                message: err.message ? err.message : '更改用户数据错误'
            };
        }
    }

    /**
     * 忘记密码
     * 
     * @memberof Sign
     */
    public doForgetPasswordMethod = async ({code, phone, password}: DoForgetPasswordMethodParam): Promise <NormalReturnObject> => {
        try {
            if (!code) {
                throw new Error('code');
            } else if (!phone) {
                throw new Error('code');
            } else if (!password) {
                throw new Error('password');
            }
        } catch (err) {
            return {
                type    : 'ERROR_PARAM',
                message : err.message ? err.message : '数据错误'
            };
        }

        try {

            const result = await fetch(`/user/password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    code    : code,
                    phone   : phone,
                    password: password
                })
            }).then(res => res.json());

            if (result.success === true) {
                return { success: true };
            } else {
                throw new Error(result.message ? result.message : '修改密码失败');
            }
        } catch (err) {
            return {
                type    : 'FETCH_ERROR',
                message : err.message ? err.message : '修改密码失败'
            };
        }
    }
}

export default new Sign();