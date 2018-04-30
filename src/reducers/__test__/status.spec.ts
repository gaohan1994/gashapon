import status, 
{ 
    getSearchHisotry, 
    getSearchStatus, 
    getNewsStatus,
    getNotifies,
    getLoginStatus,
    getRegisterStatus,
} from '../status';
import { 
   SHOW_SEARCH_MODAL,
   HIDE_SEARCH_MODAL,
   ADD_SEARCH_ITEM,
   EMPTY_SEARCH_ITEMS, 
   SHOW_NEWS,
   HIDE_NEWS,
   SHOW_LOGIN,
   HIDE_LOGIN,
   SHOW_REGISTER,
   HIDE_REGISTER,
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

    it('should set news status to true', () => {
        expect(status(initState, {type: SHOW_NEWS})).toEqual({
            ...initState,
            newsStatus: true
        });
    });

    it('should set news status to false', () => {
        expect(status(initState, {type: HIDE_NEWS})).toEqual({
            ...initState,
            newsStatus: false
        });
    });

    it('should set login status to true', () => {
        expect(status(initState, {type: SHOW_LOGIN})).toEqual({
            ...initState,
            showLogin: true,
        });
    });

    it('should set login status to false', () => {
        expect(status(initState, {type: HIDE_LOGIN})).toEqual({
            ...initState,
            showLogin: false,
        });
    });

    it('should set register status to true', () => {
        expect(status(initState, {type: SHOW_REGISTER})).toEqual({
            ...initState,
            showRegister: true,
        });
    });

    it('should set register status to true', () => {
        expect(status(initState, {type: HIDE_REGISTER})).toEqual({
            ...initState,
            showRegister: false,
        });
    });

    describe('get method tests', () => {

        const Store = {
            ...store,
            status: {
                searchStatus: true,
                searchHistory: ['123'],
                newsStatus: true,
                phoneStatus: true,
                notifies: [{_id: '123'}],
                showLogin: true,
                showRegister: true,
            }
        };

        it('should get searchstatus', () => {
            expect(getSearchStatus(Store)).toEqual(true);
        });

        it('should get searchHistory', () => {
            expect(getSearchHisotry(Store)).toEqual(['123']);
        });

        it('should get searchHistory', () => {
            expect(getNewsStatus(Store)).toEqual(true);
        });

        it('should get searchHistory', () => {
            expect(getNotifies(Store)).toEqual([{_id: '123'}]);
        });

        it('should get login status', () => {
            expect(getLoginStatus(Store)).toEqual(true);
        });

        it('should get register status', () => {
            expect(getRegisterStatus(Store)).toEqual(true);
        });
    });
});