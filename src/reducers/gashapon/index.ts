import { GashaponActions } from '../../actions/gashapon';
import { Stores } from '../type';
import { Gashapon } from './type';
import { 
    RECEIVE_GASHAPON,
    CHANGE_LOADING_STATUS,
    RECEIVE_GAHSAPON_COMMENTS,
    RECEIVE_GASHAPON_DISCOUNT,
} from '../../constants/gashapon';
import initState from './state';
import { merge } from 'lodash';

export default function gashapon (state: Gashapon = initState, action: GashaponActions): Gashapon {
    switch (action.type) {

        case RECEIVE_GASHAPON:
            const { gashapon } = action;
            state.gashapon = gashapon;
            return merge({}, state, {});

        case CHANGE_LOADING_STATUS:
            const { status } = action;
            state.loading = status;
            return merge({}, state, {});

        case RECEIVE_GAHSAPON_COMMENTS:
            const { comments } = action;
            state.comments = comments;
            return merge({}, state, {});

        case RECEIVE_GASHAPON_DISCOUNT:
            const { discount } = action;
            state.discount = discount;
            return merge({}, state, {});
            
        default :
            return state;
    }
}

export const getGashapon = (state: Stores) => state.gashapon.gashapon;

export const getLoadingStatus = (state: Stores) => state.gashapon.loading;

export const getComments = (state: Stores) => state.gashapon.comments;

export const getDiscount = (state: Stores) => state.gashapon.discount;