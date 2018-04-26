require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/main';
import { 
    Gashapons,
    BannerType,
    MainData,
} from '../types/componentTypes';
import {
    HotSearchWord
} from '../components/search';
import { Stores } from '../reducers/type';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface LoadGashapons {
    type        : constants.RECEIVE_MAIN_GAHSAPONS;
    gashapons   : Gashapons;
}

export interface Loading {
    type    : constants.LOADING_GASHAPONS;
    loading : boolean;
}

export interface LoadGenres {
    type    : constants.RECEIVE_GENRES;
    genres  : object[];
}

export interface LoadTopics {
    type    : constants.RECEIVE_TOPICS;
    topics  : object[];
}

export interface LoadLastGenre {
    type        : constants.LAST_LOAD_GASHAPONS_GENRE;
    lastGenre   : string;
}

export interface LoadLastTopic {
    type        : constants.LAST_LOAD_GASHAPONS_TOPIC;
    lastTopic   : string;
}

export interface LoadLastWord {
    type        : constants.LAST_LOAD_GASHAPONS_WORD;
    lastWord    : string;
}

export interface LoadMainData {
    type: constants.RECEIVE_MAIN_DATA;
    data: MainData;
}

export interface LoadGashaponsParam {
    genre       ?: string;
    topic       ?: string;
    word        ?: string;
    page        ?: number;
    count       ?: number;
    min_price   ?: number;
    max_price   ?: number;
    callback    ?: (page: number) => void;
}

export interface LoadBanners {
    type    : constants.RECEIVE_MAIN_BANNERS;
    banners : BannerType[];
}

export interface LoadBannersByGenre {
    type            : constants.RECEIVE_BANNERS_BY_GENRE;
    gashaponBanner  : BannerType[];
}

export interface LoadBannersByTopic {
    type            : constants.RECEIVE_BANNERS_BY_TOPIC;
    gashaponBanner  : BannerType[];
}

export interface LoadHotSearchWords {
    type        : constants.RECEIVE_HOT_SEARCH_WORDS;
    searchWords : HotSearchWord[];
}

export type MainActions = 
    LoadGashapons 
    | Loading 
    | LoadBanners 
    | LoadGenres 
    | LoadTopics
    | LoadBannersByGenre
    | LoadBannersByTopic
    | LoadHotSearchWords
    | LoadLastGenre
    | LoadLastTopic
    | LoadLastWord
    | LoadMainData;

/**
 * @param {Dispatch<MainActions>} dispatch 
 * 1.拿到genre和page
 * 2.判断当前是否已经存在fetch查询如果有那么return没有继续
 * 3.判断genre和已经存在的数据的genre是否一致，如果一致那么访问genre类型的page数据,如果不一致那么说明切换了类型重置gashapons
 * 4.得到数据之后和已经存在redux内的数据进行合并
 * 5.使用lastLoadGenre传入这次搜索的类型
 */
export const loadGashaponsByGenre = 
    ({genre = '', page = 0, count = 20, min_price, max_price, callback = (page: number) => {/**/}}: LoadGashaponsParam) => 
    (dispatch: Dispatch<MainActions>, state: () => Stores) => {

    let 
        loadStatus  = state().main.loading,
        lastGenre   = state().main.lastGenre,
        data        = state().main.gashapons;

    if (loadStatus === false) {
        
        try {
            const body = typeof(min_price) === 'number' && typeof(max_price) === 'number'
                        ? {
                            page    : page,
                            count   : count,
                            min_price: min_price,
                            max_price: max_price,
                        }
                        : {
                            page    : page,
                            count   : count
                        };

            console.log('body', body);
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
                        body: JSON.stringify(body)
                    })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        if (res.success === true) {
                            dispatch({type: constants.LOADING_GASHAPONS, loading: false});
                            data = data.concat(res.result);
                            dispatch({type: constants.RECEIVE_MAIN_GAHSAPONS, gashapons: data});
                            callback(page);
                        } else {
                            throw new Error('loadGashapons error');
                        }
                    });
                }
            } else {
                dispatch({type: constants.LAST_LOAD_GASHAPONS_GENRE, lastGenre: genre});
                dispatch({type: constants.LOADING_GASHAPONS, loading: true});

                fetch(`/machine/genre/${genre}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success === true) {
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

export const loadGashaponsByTopic = 
    ({topic = '', page = 0, count = 20, min_price, max_price, callback = (page: number) => {/**/}}: LoadGashaponsParam) => 
    (dispatch: Dispatch<MainActions>, state: () => Stores) => {
        
    let 
        loadStatus  = state().main.loading,
        lastTopic   = state().main.lastTopic,
        data        = state().main.gashapons;

    if (loadStatus === false) {
        try {
            const body = min_price && max_price
                        ? {
                            page    : page,
                            count   : count,
                            min_price: min_price,
                            max_price: max_price,
                        }
                        : {
                            page    : page,
                            count   : count
                        };

            if (lastTopic === topic) {
                if (page === 0 && data.length > 0) {
                    return;
                } else {
                    dispatch({type: constants.LOADING_GASHAPONS, loading: true});
                    fetch(`/machine/topic/${topic}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body)
                    })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success === true) {
                            dispatch({type: constants.LOADING_GASHAPONS, loading: false});
                            data = data.concat(res.result);
                            dispatch({type: constants.RECEIVE_MAIN_GAHSAPONS, gashapons: data});
                            callback(page);
                        } else {
                            throw new Error('loadGashaponsByTopic error');
                        }
                    });
                }
            } else {
                dispatch({type: constants.LOADING_GASHAPONS, loading: true});
                fetch(`/machine/topic/${topic}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success === true) {
                        dispatch({type: constants.LAST_LOAD_GASHAPONS_TOPIC, lastTopic: topic});
                        dispatch({type: constants.LOADING_GASHAPONS, loading: false});
                        dispatch({type: constants.RECEIVE_MAIN_GAHSAPONS, gashapons: res.result});
                    } else {
                        throw new Error('loadGashaponsByTopic error');
                    }
                });
            }
        } catch (err) {
            console.log('loadGashaponsByTopic err', err);
        }
    } else {
        return;
    }
};

export const loadGashaponsByWord = 
    ({word = '', page = 0, count = 20, callback = (page: number) => {/**/}}: LoadGashaponsParam) => 
    (dispatch: Dispatch<MainActions>, state: () => Stores) => {
    
    let 
        loadStatus  = state().main.loading,
        lastWord    = state().main.lastWord,
        data        = state().main.gashapons;
    
    if (loadStatus === false) {
        try {
            if (lastWord === word) {
                console.log('lastGenre === genre', lastWord === word);
                if (page === 0 && data.length > 0) {
                    return;
                } else {
                    dispatch({type: constants.LOADING_GASHAPONS, loading: true});
                    fetch(`/search/machines/${encodeURIComponent(word)}`, {
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
                            callback(page);
                        } else {
                            throw new Error('loadGashaponsByWord error');
                        }
                    });
                }
            } else {

                dispatch({type: constants.LOADING_GASHAPONS, loading: true});
                fetch(`/search/machines/${encodeURIComponent(word)}`, {
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
                        dispatch({type: constants.LAST_LOAD_GASHAPONS_WORD, lastWord: word});

                        dispatch({type: constants.LOADING_GASHAPONS, loading: false});
                        dispatch({type: constants.RECEIVE_MAIN_GAHSAPONS, gashapons: res.result});
                    } else {
                        throw new Error('loadGashaponsByWord error');
                    }
                });
            }
        } catch (err) {
            console.log('loadGashaponsByWord error');
        }
    } else {
        return;
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

export const loadBannersByGenre = (genre: string) => (dispatch: Dispatch<MainActions>) => {
    try {
        fetch(`/banner/genre/${genre}`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_BANNERS_BY_GENRE, gashaponBanner: res.result.contents});
            } else {
                throw new Error('loadBannersByGenre error');
            }
        });
    } catch (err) {
        console.log(err);
    }
};

export const loadBannersByTopic = (topic: string) => (dispatch: Dispatch<MainActions>) => {
    try {
        fetch(`/banner/genre/${topic}`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_BANNERS_BY_TOPIC, gashaponBanner: res.result.contents});
            } else {
                throw new Error('loadBannersByTopic error');
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

export const loadTopics = () => (dispatch: Dispatch<MainActions>) => {
    try {
        fetch('/topic')
        .then(res => res.json())
        .then(res => {
            console.log('res', res);
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_TOPICS, topics: res.result});
            } else {
                throw new Error('loadTopics error');
            }
        });
    } catch (err) {
        console.log('loadTopics err', err);
    }
};

export const loadHotSearchWords = () => (dispatch: Dispatch<MainActions>) => {
    try {
        fetch(`hot_search_word`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_HOT_SEARCH_WORDS, searchWords: res.result});
            } else {
                throw new Error('loadHotSearchWords error');
            }
        });
    } catch (err) {
        console.log('loadHotSearchWords', err);
    }
};

export const loadMainData = () => (dispatch: Dispatch<MainActions>) => {
    try {
        fetch('/machine/home')
        .then(res => res.json())
        .then(res => {
            console.log('loadMainData', res);
        });
    } catch (err) {
        console.log('loadMainData', err);
    }
};