import { InventoryActions } from '../../actions/inventory';
import { Stores } from '../type';
import { Inventory } from './type';
import { 
    RECEIVE_INVENTORY,
    LOADING_INVENTORY_STATUS,
    LAST_LOAD_INVENTORY_GENRE,
} from '../../constants/inventory';
import initState from './state';
import { merge } from 'lodash';

export default function inventory (state: Inventory = initState, action: InventoryActions): Inventory {
    switch (action.type) {

        case RECEIVE_INVENTORY:
            const { inventory } = action;
            state.inventory = inventory;
            return merge({}, state, {});

        case LOADING_INVENTORY_STATUS:
            const { loading } = action;
            state.loading = loading;
            return merge({}, state, {});
            
        case LAST_LOAD_INVENTORY_GENRE:
            const { lastGenre } = action;
            state.lastGenre = lastGenre;
            return merge({}, state, {});

        default :
            return state;
    }
}

export const getInventory = (state: Stores) => state.inventory.inventory;

export const getLoading = (state: Stores) => state.inventory.loading;

export const getLastGenre = (state: Stores) => state.inventory.lastGenre;