require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/inventory';
import { 
    Gashapon
} from '../types/componentTypes';
import { Dispatch } from 'redux';
import { Stores } from '../reducers/type';
// import config from '../config/index';

export interface LoadInventory {
    type: constants.RECEIVE_INVENTORY;
    inventory: Gashapon[];
}

export interface LoadInventoryParam {
    userId  : string;
    page    ?: number;
    count   ?: number;
    word    ?: string;
    genre   ?: string;
    callback?: (page: number) => void;
}

export interface LoadInventoryByWord {
    type: constants.RECEIVE_INVENTORY;
    inventory: Gashapon[];
}

export interface LoadInventoryByGenre {
    type: constants.RECEIVE_INVENTORY;
    inventory: Gashapon[];
}

export interface LoadingInventoryStatus {
    type: constants.LOADING_INVENTORY_STATUS;
    loading: boolean;
}

export interface LoadLastGenre {
    type: constants.LAST_LOAD_INVENTORY_GENRE;
    lastGenre: string;
}

export type InventoryActions = 
    LoadInventory 
    | LoadInventoryByWord 
    | LoadInventoryByGenre
    | LoadingInventoryStatus
    | LoadLastGenre;

export const loadInventory = 
    ({userId, page = 0, count = 20, callback = (page: number) => {/*noempty*/}}: LoadInventoryParam) => 
    (dispatch: Dispatch<InventoryActions>, state: () => Stores): void => {
        
    let data = state().inventory.inventory;

    if (!userId) {
        throw new Error('PARAM ERROR');
    }
    try {
        fetch(`/egg_cabinet/${userId}`, {
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

                if (page === 0) {
                    dispatch({type: constants.RECEIVE_INVENTORY, inventory: res.result});
                } else {
                    data = data.concat(res.result);
                    dispatch({type: constants.RECEIVE_INVENTORY, inventory: data});
                }
                callback(page);
            } else {
                throw new Error('loadInventory res false');
            }
        });
    } catch (err) {
        console.log('loadInventory err', err);
    }
};

export const loadInventoryByWord = 
    ({userId, page = 0, count = 20, word, callback = (page: number) => {/*noempty*/}}: LoadInventoryParam) => 
    (dispatch: Dispatch<InventoryActions>, state: () => Stores) => {
        
    if (!userId) {
        throw new Error('userid错误');
    } else if (!word) {
        throw new Error('word错误');
    }
    try {
        let data = state().inventory.inventory;
        console.log('hello');
        fetch(`/egg_cabinet/${userId}/${encodeURIComponent(word)}`, {
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

                if (page === 0) {
                    dispatch({type: constants.RECEIVE_INVENTORY, inventory: res.result});
                } else {
                    data = data.concat(res.result);
                    dispatch({type: constants.RECEIVE_INVENTORY, inventory: data});
                }
                callback(page);
            } else {
                throw new Error('loadInventoryByWord false');
            }
        });
    } catch (err) {
        console.log('loadInventoryByWord err');
    }
};  

export const loadInventoryByGenre = 
    ({userId, page = 0, count = 20, word, genre, callback = (page: number) => {/*noempty*/}}: LoadInventoryParam) => 
    (dispatch: Dispatch<InventoryActions>, state: () => Stores) => {
        
    try {
        if (!userId) {
            throw new Error('userid错误');
        } else if (!word) {
            throw new Error('word错误');
        } else if (!genre) {
            throw new Error('genre');
        }
    } catch (err) {
        console.log(err.message ? err.message : '数据错误');
    }

    let 
        loadStatus  = state().inventory.loading,
        lastGenre   = state().inventory.lastGenre,
        data        = state().inventory.inventory;

    if (loadStatus === false) {
        try {

            const body = {
                page    : page,
                count   : count,
                genre_id: genre
            };

            if (lastGenre === genre) {

                if (page === 0 && data.length > 0) {
                    return;
                } else {
                    dispatch({type: constants.LOADING_INVENTORY_STATUS, loading: true});

                    fetch(`/egg_cabinet/genre/${userId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body)
                    })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success === true) {

                            dispatch({type: constants.LOADING_INVENTORY_STATUS, loading: false});
                            data = data.concat(res.result);
                            dispatch({type: constants.RECEIVE_INVENTORY, inventory: data});
                            callback(page);
                        } else {
                            throw new Error('loadInventoryByGenre false');
                        }
                    });
                }
            } else {

                dispatch({type: constants.LAST_LOAD_INVENTORY_GENRE, lastGenre: genre});
                dispatch({type: constants.LOADING_INVENTORY_STATUS, loading: true});

                fetch(`/egg_cabinet/genre/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success === true) {
                        dispatch({type: constants.LOADING_INVENTORY_STATUS, loading: false});
                        dispatch({type: constants.RECEIVE_INVENTORY, invetory: res.result});
                    } else {
                        throw new Error('loadInventoryByGenre false');
                    }
                });
            }

        } catch (err) {
            console.log('loadInventoryByGenre err');
        }
    } else {
        return;
    }
};  