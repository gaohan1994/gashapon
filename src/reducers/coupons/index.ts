import { CouponsActions } from '../../actions/coupons';
import { Stores } from '../type';
import { Coupons } from './type';
import { 
    RECEIVE_COUPONS
} from '../../constants/coupons';
import initState from './state';
import { merge } from 'lodash';

export default function coupons (state: Coupons = initState, action: CouponsActions): Coupons {
    switch (action.type) {

        case RECEIVE_COUPONS:
            const { coupons } = action;
            state.coupons = coupons;
            return merge({}, state, {});
 
        default :
            return state;
    }
}

export const getCoupons = (state: Stores) => state.coupons.coupons;
