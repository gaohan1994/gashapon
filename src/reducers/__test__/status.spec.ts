import status, { getSearchHisotry, getSearchStatus } from '../status';
import { 
   SHOW_SEARCH_MODAL,
   HIDE_SEARCH_MODAL,
   ADD_SEARCH_ITEM,
   EMPTY_SEARCH_ITEMS, 
} from '../../constants/status';
import initState from '../status/state';
import store from '../initState';

describe('status test begin', () => {
    it('should set status to true', () => {
        expect(status(initState, {type: SHOW_SEARCH_MODAL})).toEqual({
            ...initState,
            searchStatus: true
        });
    });

    it('should set status to false', () => {
        expect(status(initState, {type: HIDE_SEARCH_MODAL})).toEqual({
            ...initState,
            searchStatus: false
        });
    });

    it('should add item to history', () => {
        const item = 'asdasdasd';
        expect(status(initState, {type: ADD_SEARCH_ITEM, value: item})).toEqual({
            ...initState,
            searchHistory: [item]
        });
    });

    it('should clear history items', () => {
        const historys = [
            '1', '2', '3', '4'
        ];

        const clearState = {
            ...initState,
            searchHistory: historys
        };
        
        expect(status(clearState, {type: EMPTY_SEARCH_ITEMS})).toEqual({
            ...initState,
            searchHistory: []
        });
    });

    describe('get method tests', () => {

        const Store = {
            ...store,
            status: {
                searchStatus: true,
                searchHistory: ['123']
            }
        };

        it('should get searchstatus', () => {
            expect(getSearchStatus(Store)).toEqual(true);
        });

        it('should get searchHistory', () => {
            expect(getSearchHisotry(Store)).toEqual(['123']);
        });
    });
});