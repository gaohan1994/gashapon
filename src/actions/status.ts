require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/status';
import { Dispatch } from 'redux';
import { Notifies } from '../components/news/index';
import { orderAddressConfig } from '../types/componentTypes';

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

export interface LoadNotifies {
    type: constants.RECEIVE_NOTIFIES;
    notifies: Notifies[];
}

export interface ShowLogin {
    type: constants.SHOW_LOGIN;
}

export interface HideLogin {
    type: constants.HIDE_LOGIN;
}

export interface ShowRegister {
    type: constants.SHOW_REGISTER;
}

export interface HideRegister {
    type: constants.HIDE_REGISTER;
}

export interface ShowLoginModal {
    type: constants.SHOW_LOGIN_MODAL;
}

export interface HideLoginModal {
    type: constants.HIDE_LOGIN_MODAL;
}

export interface ShowSignModal {
    type: constants.SHOW_SIGN_MODAL;
}

export interface HideSignModal {
    type: constants.HIDE_SIGN_MODAL;
}

export interface SetOrderAddressConfig {
    type    : constants.SET_ORDER_ADDRESS_CONFIG;
    config  : orderAddressConfig;
}

export type StatusActions = 
    ShowSearch 
    | HideSearch 
    | AddSearchItem 
    | EmptySearchItems 
    | ShowNews 
    | HideNews
    | ShowPhone
    | HidePhone
    | LoadNotifies
    | ShowLogin
    | HideLogin
    | ShowRegister
    | HideRegister
    | ShowLoginModal
    | HideLoginModal
    | ShowSignModal
    | HideSignModal
    | SetOrderAddressConfig;

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

export const loadNotifies = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        fetch(`/notifies`)
        .then(res => res.json())
        .then(res => {
            dispatch({type: constants.RECEIVE_NOTIFIES, notifies: res.result});
        });
    } catch (err) {
        console.log('loadNotifies err', err);
    }
};

export const showLogin = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.SHOW_LOGIN});
    } catch (err) {
        console.log('showLogin', err);
    }
};

export const hideLogin = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.HIDE_LOGIN});
    } catch (err) {
        console.log('hideLogin', err);
    }
};

export const showRegister = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.SHOW_REGISTER});
    } catch (err) {
        console.log('showRegister', err);
    }
};

export const hideRegister = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.HIDE_REGISTER});
    } catch (err) {
        console.log('hideRegister', err);
    }
};

export const showLoginModal = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.SHOW_LOGIN_MODAL});
    } catch (err) {
        console.log('showLoginModal', err);
    }
};

export const hideLoginModal = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.HIDE_LOGIN_MODAL});
    } catch (err) {
        console.log('hideLoginModal', err);
    }
};

export const showSignModal = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.SHOW_SIGN_MODAL});
    } catch (err) {
        console.log('showSignModal', err);
    }
};

export const hideSignModal = () => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.HIDE_SIGN_MODAL});
    } catch (err) {
        console.log('hideSignModal', err);
    }
};

export const setOrderAddressConfig = (config: orderAddressConfig) => (dispatch: Dispatch<StatusActions>): void => {
    try {
        dispatch({type: constants.SET_ORDER_ADDRESS_CONFIG, config: config});
    } catch (err) {
        console.log(err.message ? err.message : 'setOrderAddressConfig err');
    }
};