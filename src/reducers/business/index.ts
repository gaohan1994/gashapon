import { BusinessActions } from '../../actions/business';
import { Stores } from '../type';
import { Business } from './type';
import { 
    RECEIVE_ORDERS,
    RECEIVE_PAYINFO,
    RECEIVE_INCOME_RECORD,
    SET_SELECTED_ADDRESS,
    SET_SELECTED_GASHAPONS,
    RECEIVE_PACKAGE_LOCATION,
    RECEIVE_SELECTED_ORDER,
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

        case RECEIVE_INCOME_RECORD:
            const { income } = action;
            state.income = income;
            return merge({}, state, {});

        case SET_SELECTED_ADDRESS:
            const { address } = action;
            state.address = address;
            return merge({}, state, {});

        case SET_SELECTED_GASHAPONS:
            const { gashapons } = action;
            state.gashapons = gashapons;
            return merge({}, state, {});

        case RECEIVE_PACKAGE_LOCATION:
            const { location } = action;
            state.location = location;
            return merge({}, state, {});

        case RECEIVE_SELECTED_ORDER:
            const { order } = action;
            state.selectedOrder = order;
            return merge({}, state, {});

        default :
            return state;
    }
}

export const getOrders = (state: Stores) => state.business.orders;

export const getPayinfo = (state: Stores) => state.business.payinfo;

export const getIncome = (state: Stores) => state.business.income;

export const getSelectedAddress = (state: Stores) => state.business.address;

export const getSelectedGashapons = (state: Stores) => state.business.gashapons;

export const getLocation = (state: Stores) => state.business.location;

export const getSelectedOrder = (state: Stores) => state.business.selectedOrder;