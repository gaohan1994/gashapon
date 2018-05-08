
export interface Address {
    detail_area : string;
    detail_home : string;
    phone       : string;
    postal_code : string;
    receiver    : string;
}

export interface Userdata {
    name            : string;
    phone           : string;
    remain          : number;
    _id             : string;
    address         : Address;
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
