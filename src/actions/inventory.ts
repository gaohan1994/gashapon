require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/inventory';
import { 
    Gashapon
} from '../types/componentTypes';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface LoadInventory {
    type: constants.RECEIVE_INVENTORY;
    inventory: Gashapon[];
}

export type InventoryActions = LoadInventory;

export const loadInventory = (userId: string) => (dispatch: Dispatch<InventoryActions>): void => {
    if (!userId) {
        throw new Error('PARAM ERROR');
    }
    try {
        fetch(`/egg_cabinet/${userId}`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_INVENTORY, inventory: res.result});
            } else {
                throw new Error('loadInventory res false');
            }
        });
    } catch (err) {
        console.log('loadInventory err', err);
    }
};
