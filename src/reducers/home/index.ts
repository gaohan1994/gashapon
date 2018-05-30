import { HomeActions } from '../../actions/home';
import { Stores } from '../type';
import { Home } from './type';
import { 
    RECEIVE_HOME_USERDATA, 
    RECEIVE_HOME_COLLECT,
    RECEIVE_CODE,
    RECEIVE_OREDER_COUNT,
    RECEIVE_PROVINCES,
    RECEIVE_CITIES,
    RECEIVE_AREAS,
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

        case RECEIVE_OREDER_COUNT:
            const { count } = action;
            state.count = count;
            return merge({}, state, {});

        case RECEIVE_PROVINCES:
            const { provinces } = action;
            state.provinces = provinces;
            return merge({}, state, {});

        case RECEIVE_CITIES:
            const { cities } = action;
            state.cities = cities;
            return merge({}, state, {});

        case RECEIVE_AREAS:
            const { areas } = action;
            state.areas = areas;
            return merge({}, state, {});

        default :
            return state;
    }
}

export const getUserdata = (state: Stores) => state.home.userdata;

export const getCollectGashapons = (state: Stores) => state.home.gashapons;

export const getCode = (state: Stores) => state.home.code;

export const getCount = (state: Stores) => state.home.count;

export const getProvinces = (state: Stores) => state.home.provinces;

export const getCities = (state: Stores) => state.home.cities;

export const getAreas = (state: Stores) => state.home.areas;