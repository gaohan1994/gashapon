
import { MainActions } from '../../actions/main';
import { Stores } from '../type';
import { Main } from './type';
import { 
    RECEIVE_MAIN_GAHSAPONS,
    RECEIVE_MAIN_BANNERS,
    RECEIVE_GENRES,
    LAST_LOAD_GASHAPONS_GENRE,
    LOADING_GASHAPONS,
} from '../../constants/main';
import initState from './state';
import { merge } from 'lodash';

/**
 * @export
 * @param {Main} [state=initState] 
 * @param {MainActions} action 
 * @returns {Main} 
 * 
 * RECEIVE_MAIN_GAHSAPONS: 获取扭蛋机
 * 
 * LAST_LOAD_GASHAPONS_GENRE: 上次查询扭蛋机的类型
 * 
 * LOADING_GASHAPONS: 目前是否正在查询数据
 * 
 * RECEIVE_MAIN_BANNERS: 主页的轮播图
 * 
 * RECEIVE_GENRES: 获取所有扭蛋机的类型
 */

export default function main (state: Main = initState, action: MainActions): Main {
    switch (action.type) {

        case RECEIVE_MAIN_GAHSAPONS:
            const { gashapons } = action;
            state.gashapons = gashapons;
            return merge({}, state, {});

        case LAST_LOAD_GASHAPONS_GENRE:
            const { lastGenre } = action;
            state.lastGenre = lastGenre;
            return merge({}, state, {});

        case LOADING_GASHAPONS:
            const { loading } = action;
            state.loading = loading;
            return merge({}, state, {});

        case RECEIVE_MAIN_BANNERS:
            const { banners } = action;
            state.banners = banners;
            return merge({}, state, {});

        case RECEIVE_GENRES:
            const { genres } = action;
            state.genres = genres;
            return merge({}, state, {});

        default: return state;
    }
}

export const getGashapons   = (state: Stores) => state.main.gashapons;

export const getLastGenre   = (state: Stores) => state.main.lastGenre;

export const getLoading     = (state: Stores) => state.main.loading;

export const getBanners     = (state: Stores) => state.main.banners;

export const getGenres      = (state: Stores) => state.main.genres;