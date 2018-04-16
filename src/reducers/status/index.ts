
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

        default: return state;
    }
}

export const getSearchStatus = (state: Stores) => state.status.searchStatus;

export const getSearchHisotry = (state: Stores) => state.status.searchHistory;

export const getNewsStatus = (state: Stores) => state.status.newsStatus;