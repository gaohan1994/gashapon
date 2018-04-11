import { HomeActions } from '../../actions/home';
import { Stores } from '../type';
import { Home } from './type';
import { 
    RECEIVE_HOME_USERDATA
} from '../../constants/home';
import initState from './state';
import { merge } from 'lodash';

export default function gashapon (state: Home = initState, action: HomeActions): Home {
    switch (action.type) {

        case RECEIVE_HOME_USERDATA:
            const { userdata } = action;
            state.userdata = userdata;
            return merge({}, state, {});

        default :
            return state;
    }
}

export const getUserdata = (state: Stores) => state.home.userdata;