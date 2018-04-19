require('es6-promise').polyfill();
// import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/status';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface ShowSearch {
    type: constants.SHOW_SEARCH_MODAL;
}

export interface HideSearch {
    type: constants.HIDE_SEARCH_MODAL;
}

export interface AddSearchItem {
    type: constants.ADD_SEARCH_ITEM;
    value: string;
}

export interface EmptySearchItems {
    type: constants.EMPTY_SEARCH_ITEMS;
}

export interface ShowNews {
    type: constants.SHOW_NEWS;
}

export interface HideNews {
    type: constants.HIDE_NEWS;
}

export interface ShowPhone {
    type: constants.SHOW_CHANGE_PHONE;
}

export interface HidePhone {
    type: constants.HIDE_CHANGE_PHONE;
}

export type StatusActions = 
    ShowSearch 
    | HideSearch 
    | AddSearchItem 
    | EmptySearchItems 
    | ShowNews 
    | HideNews
    | ShowPhone
    | HidePhone;

export const showSearchModal = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.SHOW_SEARCH_MODAL});
    } catch (err) {
        console.log('showSearchModal err', err);
    }
};

export const hideSearchModal = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.HIDE_SEARCH_MODAL});
    } catch (err) {
        console.log('showSearchModal err', err);
    }
};

export const addSearchItem = (value: string) => (dispatch: Dispatch<StatusActions>): void => {
    if (!value) {
        throw new Error('ERROR_PARAM');
    }

    try {
        dispatch({type: constants.ADD_SEARCH_ITEM, value: value});
    } catch (err) {
        console.log('addSearchItem err', err);
    }
};

export const emptySearchItems = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.EMPTY_SEARCH_ITEMS});
    } catch (err) {
        console.log('emptySearchItems err', err);
    }
};

export const showNews = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.SHOW_NEWS});
    } catch (err) {
        console.log('showNews err', err);
    }
};

export const hideNews = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.HIDE_NEWS});
    } catch (err) {
        console.log('hideNews err', err);
    }
};

export const showPhone = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.SHOW_CHANGE_PHONE});
    } catch (err) {
        console.log('showPhone err', err);
    }
};

export const hidePhone = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.HIDE_CHANGE_PHONE});
    } catch (err) {
        console.log('hidePhone err', err);
    }
};