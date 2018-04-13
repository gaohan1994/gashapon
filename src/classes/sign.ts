import { getAccessToken } from '../config/util';

interface Register {
    name    : string;
    password: string;
    phone   : string;
}

export interface DoRegisterMethodReturnObject {
    success ?: boolean;
    type    ?: string;
    message ?: string;
}

export interface CheckAuthReturnObject {
    success ?: boolean;
    type    ?: string;
    message ?: string;
}

interface Login {
    phone: string;
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
    }

    public doRegisterMethod = async ({name, password, phone}: Register): Promise<DoRegisterMethodReturnObject> => {
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
            const result = await fetch(`/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name    : name,
                    password: password,
                    phone   : phone
                })
            })
            .then(res => res.json());
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

    public doLoginMethod = async ({phone, password}: Login): Promise<object> => {
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
                    phone: phone,
                    password: password,
                })
            })
            .then(res => res.json());

            if (result.success === true) {
                return { success: true };
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

    public doCheckAuth = (): CheckAuthReturnObject => {
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
}

export default new Sign();