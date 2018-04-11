export interface Address {
    detail_area: string;
    detail_home: string;
    phone: string;
    postal_code: string;
    receiver: string;
}

export interface Userdata {
    name: string;
    phone: string;
    remain: number;
    _id: string;
    address: Address;
}
