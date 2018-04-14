require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/main';
import { 
    Gashapons,
    BannerType,
} from '../types/componentTypes';
import { Stores } from '../reducers/type';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface LoadGashapons {
    type        : constants.RECEIVE_MAIN_GAHSAPONS;
    gashapons   : Gashapons;
}

export interface LastLoadGenre {
    type        : constants.LAST_LOAD_GASHAPONS_GENRE;
    lastGenre   : string;
}

export interface Loading {
    type    : constants.LOADING_GASHAPONS;
    loading : boolean;
}

export interface LoadBanners {
    type    : constants.RECEIVE_MAIN_BANNERS;
    banners : BannerType[];
}

export interface LoadGenres {
    type    : constants.RECEIVE_GENRES;
    genres  : object[];
}

export interface LoadGashaponsParam {
    genre   ?: string;
    page    ?: number;
    count   ?: number;
    callback?: (page: number) => void;
}

export type MainActions = LoadGashapons | LastLoadGenre | Loading | LoadBanners | LoadGenres;

/**
 * @param {Dispatch<MainActions>} dispatch 
 * 1.拿到genre和page
 * 2.判断当前是否已经存在fetch查询如果有那么return没有继续
 * 3.判断genre和已经存在的数据的genre是否一致，如果一致那么访问genre类型的page数据,如果不一致那么说明切换了类型重置gashapons
 * 4.得到数据之后和已经存在redux内的数据进行合并
 * 5.使用lastLoadGenre传入这次搜索的类型
 */
export const loadGashaponsByGenre = 
    ({genre = '', page = 0, count = 20, callback = (page: number) => {/**/}}: LoadGashaponsParam) => 
    (dispatch: Dispatch<MainActions>, state: () => Stores) => {

    let 
        loadStatus  = state().main.loading,
        lastGenre   = state().main.lastGenre,
        data        = state().main.gashapons;

    if (loadStatus === false) {
        try {
            if (lastGenre === genre) {
                if (page === 0 && data.length > 0) {
                    return;
                } else {
                    dispatch({type: constants.LOADING_GASHAPONS, loading: true});
                    fetch(`/machine/genre/${genre}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            page    : page,
                            count   : count
                        })
                    })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success === true) {
                            dispatch({type: constants.LOADING_GASHAPONS, loading: false});
                            data = data.concat(res.result);
                            dispatch({type: constants.RECEIVE_MAIN_GAHSAPONS, gashapons: data});
                            callback(page + 1);
                        } else {
                            throw new Error('loadGashapons error');
                        }
                    });
                }
            } else {
                dispatch({type: constants.LOADING_GASHAPONS, loading: true});
                fetch(`/machine/genre/${genre}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        page    : page,
                        count   : count
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success === true) {
                        lastLoadGenre(genre);
                        dispatch({type: constants.LOADING_GASHAPONS, loading: false});
                        dispatch({type: constants.RECEIVE_MAIN_GAHSAPONS, gashapons: res.result});
                    } else {
                        throw new Error('loadGashapons error');
                    }
                });
            }
        } catch (err) {
            console.log('loadGashapons err', err);
        }
    } else {
        return;
    }
};

export const lastLoadGenre = (genre: string) => (dispatch: Dispatch<MainActions>) => {
    try {
        if (!genre) {
            throw new Error('未传入gere');
        } else {
            dispatch({type: constants.LAST_LOAD_GASHAPONS_GENRE, lastGenre: genre});
        }
    } catch (err) {
        console.log(err);
    }
};

export const loadGashapons = () => (dispatch: Dispatch<MainActions>) => {

    try {
        fetch('/machine')
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.LAST_LOAD_GASHAPONS_GENRE, lastGenre: ''});
                dispatch({type: constants.RECEIVE_MAIN_GAHSAPONS, gashapons: res.result});
            } else {
                throw new Error('loadGashapons error');
            }
        });
    } catch (err) {
        console.log(err);
    }
};
    
export const loadBanners = () => (dispatch: Dispatch<MainActions>) => {
    try {
        fetch('/banner')
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_MAIN_BANNERS, banners: res.result});
            } else {
                throw new Error('loadBanners error');
            }
        });
    } catch (err) {
        console.log(err);
    }
};
    
export const loadGenres = () => (dispatch: Dispatch<MainActions>) => {
    try {
        fetch(`/genre`)
        .then(res => res.json())
        .then(res => {
            console.log('res', res);
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_GENRES, genres: res.result});
            } else {
                throw new Error('loadGenres error');
            }
        });
    } catch (err) {
        console.log('loadGenres err', err);
    }
};
  