import { getAccessToken } from '../config/util';

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
        this.userId = getAccessToken() ? getAccessToken() : '';

        this.getUser = this.getUser.bind(this);
        this.setUser = this.setUser.bind(this);
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

    public setUser = ({userId, address, receiver, phone, name, headimg, remain}: Params): void => {
        this.userId     = userId    ? userId : '',
        this.address    = address   ? address : '';
        this.receiver   = receiver  ? receiver : '';
        this.phone      = phone     ? phone : '';
        this.name       = name      ? name : '';
        this.headimg    = headimg   ? headimg : '';
        this.remain     = remain    ? remain : 0;
    }
}

export default new User();