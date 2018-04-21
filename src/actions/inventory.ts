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
    callback?: (page: number) => void;
}

export interface LoadInventoryByWord {
    type: constants.RECEIVE_INVENTORY;
    inventory: Gashapon[];
}

export type InventoryActions = LoadInventory | LoadInventoryByWord;

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