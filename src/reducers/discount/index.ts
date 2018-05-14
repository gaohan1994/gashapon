import { DiscountActions } from '../../actions/discount';
import { Stores } from '../type';
import { Discount } from './type';
import { 
    RECEIVE_DISCOUNT,
    RECEIVE_HOME_DISOUNT,
    RECEIVE_HOME_DISCOUNTING,
} from '../../constants/discount';
import initState from './state';
import { merge } from 'lodash';

export default function discount (state: Discount = initState, action: DiscountActions): Discount {
    switch (action.type) {

        case RECEIVE_DISCOUNT:
            const { data } = action;
            state.data = data;
            return merge({}, state, {});

        case RECEIVE_HOME_DISOUNT:
            const { discount } = action;
            state.discount = discount;
            return merge({}, state, {});

        case RECEIVE_HOME_DISCOUNTING:
            const { discounting } = action;
            state.discounting = discounting;
            return merge({}, state, {});
 
        default :
            return state;
    }
}

export const getDiscountData = (state: Stores) => state.discount.data;

export const getHomeDiscount = (state: Stores) => state.discount.discount;

export const getHomeDiscounting = (state: Stores) => state.discount.discounting;
