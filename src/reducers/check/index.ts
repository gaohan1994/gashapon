import { CheckActions } from '../../actions/check';
import { Stores } from '../type';
import { Check } from './type';
import { 
    RECEIVE_MONTH_CHECK
} from '../../constants/check';
import initState from './state';
import { merge } from 'lodash';

export default function check (state: Check = initState, action: CheckActions): Check {
    switch (action.type) {
     
        case RECEIVE_MONTH_CHECK: 
            const { checks } = action;
            state.checks = checks;
            return merge({}, state, {});
        
        default: return state;   
    }
}

export const getChecks = (state: Stores) => state.check.checks; 