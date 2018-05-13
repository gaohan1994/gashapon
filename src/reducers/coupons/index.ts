import { CouponsActions } from '../../actions/coupons';
import { Stores } from '../type';
import { Coupons } from './type';
import { 
    RECEIVE_COUPONS,
    LAST_LOAD_COUPONS_TYPE,
    LOADING_COUPONS_STATUS,
} from '../../constants/coupons';
import initState from './state';
import { merge } from 'lodash';

export default function coupons (state: Coupons = initState, action: CouponsActions): Coupons {
    switch (action.type) {

        case RECEIVE_COUPONS:
            const { coupons } = action;
            state.coupons = coupons;
            return merge({}, state, {});

        case LOADING_COUPONS_STATUS:
            const { loading } = action;
            state.loading = loading;
            return merge({}, state, {});

        case LAST_LOAD_COUPONS_TYPE:
            const { lastType } = action;
            state.lastType = lastType;
            return merge({}, state, {});
 
        default :
            return state;
    }
}

export const getCoupons = (state: Stores) => state.coupons.coupons;

export const getLoading = (state: Stores) => state.coupons.loading;

export const getLastType = (state: Stores) => state.coupons.lastType;
