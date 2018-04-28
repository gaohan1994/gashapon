import { DiscountActions } from '../../actions/discount';
import { Stores } from '../type';
import { Discount } from './type';
import { 
    RECEIVE_DISCOUNT
} from '../../constants/discount';
import initState from './state';
import { merge } from 'lodash';

export default function discount (state: Discount = initState, action: DiscountActions): Discount {
    switch (action.type) {

        case RECEIVE_DISCOUNT:
            const { data } = action;
            state.data = data;
            return merge({}, state, {});
 
        default :
            return state;
    }
}

export const getDiscountData = (state: Stores) => state.discount.data;
