import { InventoryActions } from '../../actions/inventory';
import { Stores } from '../type';
import { Inventory } from './type';
import { 
    RECEIVE_INVENTORY
} from '../../constants/inventory';
import initState from './state';
import { merge } from 'lodash';

export default function inventory (state: Inventory = initState, action: InventoryActions): Inventory {
    switch (action.type) {

        case RECEIVE_INVENTORY:
            const { inventory } = action;
            state.inventory = inventory;
            return merge({}, state, {});

        default :
            return state;
    }
}

export const getInventory = (state: Stores) => state.inventory.inventory;