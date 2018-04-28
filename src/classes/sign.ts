import { getAccessToken } from '../config/util';
import { NormalReturnObject } from './base';

export interface Register {
    name    : string;
    password: string;
    phone   : string;
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

export interface DoChangeUserdata {
    success ?: boolean;
    type    ?: string;
    message ?: string;
}

export interface DoChangeUserdataParam {
    name        ?: string;
    headimgurl  ?: string;
}

export interface Login {
    phone   : string;
    password: string;
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
        this.doCheckAuth            = this.doCheckAuth.bind(this);
        this.getVercode             = this.getVercode.bind(this);
        this.doChangePhoneMethod    = this.doChangePhoneMethod.bind(this);
        this.doChangeUserdata       = this.doChangeUserdata.bind(this);
    }

    public doRegisterMethod = async ({name, password, phone, referee}: Register): Promise<NormalReturnObject> => {
        try {
            if (!name) {
                throw new Error('姓名错误');
            } else if (!password) {
                throw new Error('密码错误');
            } else if (!phone) {
                throw new Error('手机号码错误');
            } 
        } catch (err) {
            console.log(err.message);
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message
            };
        }
        
        try {
            /* 如果有推荐人 提交推荐人的id */
            const body = !!referee
            ? {
                name    : name,
                password: password,
                phone   : phone,
                referee : referee
            }
            : {
                name    : name,
                password: password,
                phone   : phone,
            };

            const result = await fetch(`/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(res => res.json());

            if (result.success === true) {
                return { success: true };
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

    public doLogoutMethod = async (): Promise<NormalReturnObject> => {

        const result = await fetch(`/logout`).then(res => res.json());

        if (result.success === true) {
            return {
                success: true
            };
        } else {
            return {
                type: 'ERROR_LOGOUT',
                message: result.message ? result.message : '登出失败'
            };
        }
    }

    public doCheckAuth = (): NormalReturnObject => {
        try {
            console.log(this.user);
            if (!this.user) {
                throw new Error('用户数据错误');
            } else if (!this.user._id) {
                throw new Error('用户数据错误');
            } else {
                return {
                    success: true
                };
            }
        } catch (err) {
            console.log('未登录');
            return {
                type: 'FAIL_LOGIN',
                message: '未登录'
            };
        }
    }

    public getVercode = async (phone: string): Promise<NormalReturnObject> => {
        try {
            if (!this.user) {
                throw new Error('用户数据错误');
            } else if (!this.user._id) {
                throw new Error('用户数据错误');
            } 
        } catch (err) {
            return {
                type: 'FAIL_LOGIN',
                message: '未登录'
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
                return {success: true};
            } else {
                return {
                    type: 'ERROR_GETVERCODE',
                    message: '获取验证吗失败'
                };
            }
        } catch (err) {
            return {
                type: 'ERROR_GETVERCODE',
                message: err
            };
        }
    }

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

    public doChangeUserdata = async ({name, headimgurl}: DoChangeUserdataParam): Promise<DoChangeUserdata> => {
        try {
            if (!this.user) {
                throw new Error('用户数据错误');
            } else if (!this.user._id) {
                throw new Error('用户数据错误');
            }
        } catch (err) {
            return {
                type: 'ERROR_PARAM',
                message: '数据错误'
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
}

export default new Sign();