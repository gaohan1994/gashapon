import { MainActions } from '../actions/main';
import { Stores, Main } from '../types/reducerTypes';
import { 
    RECEIVE_MAIN_RECOMMEND_PLAYLIST, 
    RECEIVE_MAIN_RECOMMEND_TRIBE, 
    RECEIVE_MAIN_SWIPER_IMAGES,
    RECEIVE_MAIN_NEW_MUSICS,
} from '../constants/main';
import initState from './initState';
import { merge } from 'lodash';

export default function main (state: Main = initState.main, action: MainActions): Main {
    switch (action.type) {
        
        case RECEIVE_MAIN_RECOMMEND_PLAYLIST:
            const { playlist } = action;
            state.playlist = playlist;
            return merge({}, state, {});

        case RECEIVE_MAIN_RECOMMEND_TRIBE:
            const { tribe } = action;
            state.tribe = tribe;
            return merge({}, state, {});
            
        case RECEIVE_MAIN_SWIPER_IMAGES:
            const { images } = action;
            state.images = images;
            return merge({}, state, {});
            
        case RECEIVE_MAIN_NEW_MUSICS:
            const { musics } = action;
            state.musics = musics;
            return merge({}, state, {});
            
        default :
            return state;
    }
}

export const getPlaylist = (state: Stores) => state.main.playlist;

export const getTribe = (state: Stores) => state.main.tribe;

export const getWrapImages = (state: Stores) => state.main.images;

export const getMainNewMusics = (state: Stores) => state.main.musics;
