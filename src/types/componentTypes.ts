export type GashaponProductItem = {
    _id     : string;
    name    : string;
    pics    : string[];
    price   : number;
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
    is_box          ?: boolean;
    is_flash_sale   ?: boolean;
    is_discount     ?: boolean;
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
        price: number;
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
        _id     : string;
        pic     : string;
        desc    : string;
        name    : string;
    }];
    flash_sale: Gashapon;
};

export type DiscountDataType = {
    create_date : Date;
    detail      : object[];
    image       : string;
    machine     : string;
    max_discount: number;
    status      : number;
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
    status: number; /* 0：待确认  1：支付成功 */ 
    type: number; /* 订单类型 1:扭蛋  2:邮费  3:充值 4:变卖 5:系统回收 6:线下收益 */
    user: PayinfoUser;
    value: number;
    _id: string;
};

export type Payinfos = Payinfo[];

export type discount = {
    create_date : Date;
    image       : string;
    machine     : string;
    max_discount: number;
    sum         : number;
    title       : string;
    _id         : string;
};

export type orderAddressConfig = {
    path    ?: string;
    param   ?: string;
};

export type Order = {
    address         : string;
    express         : string;
    create_date     : Date;
    free_express    : boolean;
    freight         : number;
    from_user       : string;
    order_status    : number;
    phone           : string;
    product_list    : GashaponProductItem[];
    receiver        : string;
    _id             : string;
    tracking_number : string;
};

export type LocationItem = {
    desc: string;
    time: Date;
};

export type LocationType = {
    com     : string;
    comid   : string;
    number  : string;
    site    : string;
    tel     : string;
    traces  : LocationItem[];
};

export type OrderCount = number[];

export type InventoryItem = {
    create_date : Date;
    genres      : string[];
    name        : string;
    pics        : string[];
    price       : number;
    quantity    : number;
    _id         : string;
};