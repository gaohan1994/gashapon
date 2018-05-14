
export interface Address {
    _id         : string;
    receiver    : string;
    phone       : string;
    detail_area : string;
    detail_home : string;
    postal_code : string;
    create_date : Date;
    status      : 0 | 1;
}

export interface Userdata {
    name            : string;
    phone           : string;
    remain          : number;
    _id             : string;
    address         : Address[];
    collect_machines: {
        _id: string;
        machines: string[];
    };

    comment_count: number;
    discount_count: number;
    discounts: object[];
    experience: number;
    play_count: number;
    sell_count: number;
}
