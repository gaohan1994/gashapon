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
    start_time      ?: Date;
    end_time        ?: Date;
    open_time       : Date;
    price           : number;
    is_discount     : boolean;
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
    create_date: Date;
    user: string;
    _id: string;
    discount: {
        condition: number;
        expire: Date;
        pic: string;
        price: string;
    }
};

export type MainData = {
    content: [{
        _id: string;
        name: string;
        head: string;
        status: number;
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
    }];
    flash_sale: Gashapon;
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

export type PayinfoUser = {
    name: string;
    phone: string;
    remain: number;
    _id: string;
};

export type Payinfo = {
    channel: number;
    create_date: Date;
    desc: string;
    from_user: PayinfoUser;
    machine: {
        name: string;
        _id: string;
    };
    name: string;
    product_list: object[];
    status: number;
    type: number;
    user: PayinfoUser;
    value: number;
    _id: string;
};

export type Payinfos = Payinfo[];