export interface UserType {
    _id     : string;
    address : string;
    receiver: string;
    phone   : string;
    name    : string;
    headimg : string;
    remain  : number;
}

interface Params {
    _id     : string;
    address ?: string;
    receiver?: string;
    phone   ?: string;
    name    ?: string;
    headimg ?: string;
    remain  ?: number;
}

class User {
    /* id */
    private _id     : string;
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

    constructor ({_id, address, receiver, phone, name, headimg, remain}: Params) {
        this._id        = _id;
        this.address    = address   ? address : '';
        this.receiver   = receiver  ? receiver : '';
        this.phone      = phone     ? phone : '';
        this.name       = name      ? name : '';
        this.headimg    = headimg   ? headimg : '';
        this.remain     = remain    ? remain : 0;
    }
    
    public getUser = (): UserType => {
        return {
            _id     : this._id,
            address : this.address,
            receiver: this.receiver,
            phone   : this.phone,
            name    : this.name,
            headimg : this.headimg,
            remain  : this.remain,
        };
    }
}

export default User;