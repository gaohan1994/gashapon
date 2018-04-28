export type GashaponProductItem = {
    _id     : string;
    name    : string;
    pics    : string[];
    quantity: number;
    rate    : number;
    status  : number;
};

export type Gashapon = {
    _id             : string;
    name            : string;
    desc            : string;
    music_url       : string;
    start_time      : Date;
    end_time        : Date;
    open_time       : Date;
    price           : number;
    is_discount     : 1 | 2;
    collect_count   : number;
    discount_plan   : {
        max_discount: number;
        create_date : Date;
        update_date : Date;  
    };
    pics            : string[];
    product_list    : GashaponProductItem[];
    residue_quantity: number;
    status          : number;
};

export type Gashapons = Gashapon[];

export type WrapImageType = {
    _id     : string;
    pic     : string;
    type    : number;
    param   : string;
    tag     : string;
    title   : string;
};

export type BannerType = {
    _id     : string;
    pic     : string;
    type    : number;
    param   : string;
};

export type ReceiveBanner = {
    contents    : BannerType[];
    publish_date: Date;
    status      : number;
};

export type WrapImagesType = Array<WrapImageType>;

export type Genre = {
    _id     : string;
    name    : string;
    desc    : string;
    status  : number;
};

export type Genres = Genre[];

export type Ticket = {
    price: number;
    value: string;
    end_time: Date;
};

export type MainData = {
    content: [{
        _id: string;
        name: string;
        content: [{
            type    : number;
            pic     : string;
            name    : string;
            param   : string;
        }];
        banner: BannerType
    }];
    advice: [{
        type    : number;
        param   : string;
        pic     : string;
    }]
};

export type DiscountDataType = {
    create_date : Date;
    detail      : object[];
    image       : string;
    machine     : string;
    max_discount: number;
    statu       : number;
    sum         : number;
    title       : string;
    user        : string;
    _id         : string;
};