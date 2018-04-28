import { HomeActions } from '../../actions/home';
import { Stores } from '../type';
import { Home } from './type';
import { 
    RECEIVE_HOME_USERDATA, 
    RECEIVE_HOME_COLLECT,
    RECEIVE_CODE,
} from '../../constants/home';
import initState from './state';
import { merge } from 'lodash';

export default function home (state: Home = initState, action: HomeActions): Home {
    switch (action.type) {

        case RECEIVE_HOME_USERDATA:
            const { userdata } = action;
            state.userdata = userdata;
            return merge({}, state, {});

        case RECEIVE_HOME_COLLECT:
            const { gashapons } = action;
            state.gashapons = gashapons;
            return merge({}, state, {});

        case RECEIVE_CODE:
            const { code } = action;
            state.code = code;
            return merge({}, state, {});

        default :
            return state;
    }
}

export const getUserdata = (state: Stores) => state.home.userdata;

export const getCollectGashapons = (state: Stores) => state.home.gashapons;

export const getCode = (state: Stores) => state.home.code;