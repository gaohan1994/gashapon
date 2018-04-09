
import { MainActions } from '../../actions/main';
import { Stores } from '../type';
import { Main } from './type';
import { 
    RECEIVE_MAIN_GAHSAPONS,
    RECEIVE_MAIN_BANNERS,
} from '../../constants/main';
import initState from './state';
import { merge } from 'lodash';

export default function main (state: Main = initState, action: MainActions): Main {
    switch (action.type) {

        case RECEIVE_MAIN_GAHSAPONS:
            const { gashapons } = action;
            state.gashapons = gashapons;
            return merge({}, state, {});

        case RECEIVE_MAIN_BANNERS:
            const { banners } = action;
            state.banners = banners;
            return merge({}, state, {});

        default :
            return state;
    }
}

export const getGashapons = (state: Stores) => state.main.gashapons;

export const getBanners = (state: Stores) => state.main.banners;