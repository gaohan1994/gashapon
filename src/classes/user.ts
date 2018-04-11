export interface UserType {
    _id     : string;
    address : string;
    receiver: string;
    phone   : string;
}

export interface BusinessUser {
    _id     : string;
    address : string;
    receiver: string;
    phone   : string;
}

export interface GashaponUser {
    _id     : string;
    name    : string;
    headimg : string;
}

interface Params {
    _id     : string;
    address ?: string;
    receiver?: string;
    phone   ?: string;
    name    ?: string;
    headimg ?: string;
}

class User {

    private _id     : string;
    private address : string;
    private receiver: string;
    private phone   : string;
    private name    : string;
    private headimg : string;

    constructor ({_id, address, receiver, phone, name, headimg}: Params) {
        this._id        = _id;
        this.address    = address   ? address : '';
        this.receiver   = receiver  ? receiver : '';
        this.phone      = phone     ? phone : '';
        this.name       = name      ? name : '';
        this.headimg    = headimg   ? headimg : '';
    }
    
    public getUser = (): UserType => {
        return {
            _id     : this._id,
            address : this.address,
            receiver: this.receiver,
            phone   : this.phone
        };
    }

    public getGashaponUser = (): GashaponUser => {
        return {
            _id     : this._id,
            name    : this.name,
            headimg : this.headimg,
        };
    }

    public getBusinessUser = (): BusinessUser => {
        return {
            _id     : this._id,
            address : this.address,
            receiver: this.receiver,
            phone   : this.phone
        };
    }
}

export default User;