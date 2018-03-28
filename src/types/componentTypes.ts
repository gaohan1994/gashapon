export type UserType = {
    _id         : string;
    name        : string;
    headimgurl  ?: string;
    singer      ?: string;
};

export type SingerType = {
    _id     : string;
    name    : string;
    pics    ?: Array<string>; 
};

export type MusicType = {
    _id     : string;
    avs     : Array<Object>;
    collect : number;
    labels  : Array<any>;
    name    : string;
    origin  : number;
    pics    : Array<string>;
    singers : Array<SingerType>;
    status  ?: number;
    user    : UserType;
    words   : Array<string>;
};

export type MainNewMusicsType = {
    _id             : string;
    desc            : string;
    musics          : Array<MusicType>;
    pic             : string;
    publish_date    ?: string;
    tribes          ?: Array<Object>;
    type            : number;
};

export type PlaylistType = {
    _id         : string;
    collect     : number;
    create_date : string;
    desc        ?: string;
    r_desc      ?: string;
    genres      : Array<Object>;
    musics      : Array<MusicType>;
    name        : string;
    pics        : Array<string>;
    renew_at    ?: string;
    status      : number;
    user        : UserType;
};

export type PlaylistsType = Array<PlaylistType>;

export type MainPlaylistsType = Array<{
    _id         : string;
    playlists   : Array<PlaylistType>;
    publish_date: string;
    status      ?: number;
    __v         ?: number;
}>;

export type TribeType = {
    _id             : string;
    article_count   : number;
    comment_count   : number;
    desc            : string;
    headimg         : string;
    member_count    : number;
    name            : string
};

export type TribesType = Array<{
    _id         : string;
    create_date : string;
    status      : number;
    tribe       : TribeType;
    type        : number;
}>;

export type WrapImageType = {
    param   : string;
    pic     : string;
    tag     : string;
    title   : string;
    type    : 2;
};

export type WrapImagesType = Array<WrapImageType>;
