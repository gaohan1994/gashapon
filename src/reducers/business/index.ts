import { BusinessActions } from '../../actions/business';
import { Stores } from '../type';
import { Business } from './type';
import { 
    RECEIVE_ORDERS,
    RECEIVE_PAYINFO
} from '../../constants/business';
import initState from './state';
import { merge } from 'lodash';

export default function business (state: Business = initState, action: BusinessActions): Business {
    switch (action.type) {

        case RECEIVE_ORDERS:
            const { orders } = action;
            state.orders = orders;
            return merge({}, state, {});

        case RECEIVE_PAYINFO:
            const { payinfo } = action;
            state.payinfo = payinfo;
            return merge({}, state, {});

        default :
            return state;
    }
}

export const getOrders = (state: Stores) => state.business.orders;

export const getPayinfo = (state: Stores) => state.business.payinfo;