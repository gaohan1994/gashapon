import { GashaponActions } from '../../actions/gashapon';
import { Stores } from '../type';
import { Gashapon } from './type';
import { 
    RECEIVE_GASHAPON
} from '../../constants/main';
import initState from './state';
import { merge } from 'lodash';

export default function gashapon (state: Gashapon = initState, action: GashaponActions): Gashapon {
    switch (action.type) {

        case RECEIVE_GASHAPON:
            const { gashapon } = action;
            state.gashapon = gashapon;
            return merge({}, state, {});

        default :
            return state;
    }
}

export const getGashapon = (state: Stores) => state.gashapon.gashapon;