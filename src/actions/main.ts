require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/main';
import { WrapImagesType, MainNewMusicsType } from '../types/componentTypes';
import { Dispatch } from 'redux';
import config from '../config/index';

export interface LoadRecommendPlaylist {
    type: constants.RECEIVE_MAIN_RECOMMEND_PLAYLIST;
    playlist: Array<Object>;
}

export interface LoadRecommendTribe {
    type: constants.RECEIVE_MAIN_RECOMMEND_TRIBE;
    tribe: Array<Object>;
}

export interface LoadMainImages {
    type: constants.RECEIVE_MAIN_SWIPER_IMAGES;
    images: WrapImagesType;
}

export interface LoadMainNewMusics {
    type: constants.RECEIVE_MAIN_NEW_MUSICS;
    musics: MainNewMusicsType;
}

export type MainActions = LoadRecommendPlaylist | LoadRecommendTribe | LoadMainImages | LoadMainNewMusics;

export const loadRecommendPlaylist = () => (dispatch: Dispatch<MainActions>) => {
    return  fetch(`/trend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    count: 1
                })
            })
            .then(res => res.json())
            .then(dates => {
                const promise = dates.map((item: string) => {
                    return fetch(`http://${config.qnssl_old}${item}`).then(res => res.json());
                });

                Promise.all(promise)
                    .then(data => {
                        dispatch({type: constants.RECEIVE_MAIN_RECOMMEND_PLAYLIST, playlist: data});
                    });
            });
};

export const loadRecommendTribe = () => (dispatch: Dispatch<MainActions>) => {
    return  fetch(`/hot/tribes/6`)
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    dispatch({type: constants.RECEIVE_MAIN_RECOMMEND_TRIBE, tribe: res.result});
                } else {
                    throw new Error('loadRecommendTribe Error');
                }
            });
};

export const loadMainImages = () => (dispatch: Dispatch<MainActions>) => { 
    return  fetch(`/entry/v2`)
            .then(res => res.json())
            .then(token => {
                const { slide } = token;
                let key = '';
                if (process.env.NODE_ENV === 'production') {
                    key = 's2_';
                } else {
                    key = 'ds2_';
                }
                fetch(`http://${config.host.pic}/${key}${slide}`)
                .then(res => res.json())
                .then(res => {
                    dispatch({type: constants.RECEIVE_MAIN_SWIPER_IMAGES, images: res});
                });
            });
};

export const loadMainNewMusics = () => (dispatch: Dispatch<MainActions>) => { 
    return  fetch(`/daily`)
            .then(res => res.json())
            .then(res => {
                fetch(`${res.url}`)
                .then(res => res.json())
                .then(res => {
                    dispatch({type: constants.RECEIVE_MAIN_NEW_MUSICS, musics: res});
                });
            });
};