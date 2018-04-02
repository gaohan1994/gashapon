export type Gashapon = {
    name: string;
    desc: string;
    start_time: string;
    end_time: string;
    open_time: string;
    price: number;
    pics: string[];
    product_list: object[];
    genres: object[];
    status: number;
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
    publish_date: string;
    status      : number;
};

export type WrapImagesType = Array<WrapImageType>;