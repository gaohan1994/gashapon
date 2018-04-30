
import { StatusActions } from '../../actions/status';
import { Stores } from '../type';
import { Status } from './type';
import { 
    SHOW_SEARCH_MODAL,
    HIDE_SEARCH_MODAL,
    ADD_SEARCH_ITEM,
    EMPTY_SEARCH_ITEMS,
    SHOW_NEWS,
    HIDE_NEWS,
    SHOW_CHANGE_PHONE,
    HIDE_CHANGE_PHONE,
    RECEIVE_NOTIFIES,
    SHOW_LOGIN,
    HIDE_LOGIN,
    SHOW_REGISTER,
    HIDE_REGISTER,
} from '../../constants/status';
import initState from './state';
import { merge } from 'lodash';

export default function status (state: Status = initState, action: StatusActions): Status {
    switch (action.type) {

        case SHOW_SEARCH_MODAL:
            state.searchStatus = true;
            return merge({}, state, {});

        case HIDE_SEARCH_MODAL:
            state.searchStatus = false;
            return merge({}, state, {});

        case ADD_SEARCH_ITEM:
            const { value } = action;
            state.searchHistory.push(value);
            return merge({}, state, {});
        
        case EMPTY_SEARCH_ITEMS:
            state.searchHistory = [];
            return merge({}, state, {});

        case SHOW_NEWS:
            state.newsStatus = true;
            return merge({}, state, {});

        case HIDE_NEWS:
            state.newsStatus = false;
            return merge({}, state, {});

        case SHOW_CHANGE_PHONE:
            state.phoneStatus = true;
            return merge({}, state, {});

        case HIDE_CHANGE_PHONE:
            state.phoneStatus = false;
            return merge({}, state, {});

        case RECEIVE_NOTIFIES:
            const { notifies } = action;
            state.notifies = notifies;
            return merge({}, state, {});

        case SHOW_LOGIN:
            state.showLogin = true;
            return merge({}, state, {});

        case HIDE_LOGIN:
            state.showLogin = false;
            return merge({}, state, {});
            
        case SHOW_REGISTER:
            state.showRegister = true;
            return merge({}, state, {});
            
        case HIDE_REGISTER:
            state.showRegister = false;
            return merge({}, state, {});

        default: return state;
    }
}

export const getSearchStatus = (state: Stores) => state.status.searchStatus;

export const getSearchHisotry = (state: Stores) => state.status.searchHistory;

export const getNewsStatus = (state: Stores) => state.status.newsStatus;

export const getPhoneStatus = (state: Stores) => state.status.phoneStatus;

export const getNotifies = (state: Stores) => state.status.notifies;

export const getLoginStatus = (state: Stores) => state.status.showLogin;

export const getRegisterStatus = (state: Stores) => state.status.showRegister;