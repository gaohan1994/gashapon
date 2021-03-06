import status, 
{ 
    getSearchHisotry, 
    getSearchStatus, 
    getNewsStatus,
    getNotifies,
    getLoginStatus,
    getRegisterStatus,
    getLoginModalStatus,
    getSignModalStatus,
    getConfig,
    getShareStatus,
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
   SHOW_LOGIN_MODAL,
   HIDE_LOGIN_MODAL,
   SHOW_SIGN_MODAL,
   HIDE_SIGN_MODAL,
   SET_ORDER_ADDRESS_CONFIG,
   SHOW_SHARE_MODAL,
   HIDE_SHARE_MODAL,
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

    it('should set showloginmodal to true', () => {
        expect(status(initState, {type: SHOW_LOGIN_MODAL})).toEqual({
            ...initState,
            showLoginModal: true
        });
    });

    it('should set showloginmodal to false', () => {
        expect(status(initState, {type: HIDE_LOGIN_MODAL})).toEqual({
            ...initState,
            showLoginModal: false
        });
    });

    it('should set showsignmodal to true', () => {
        expect(status(initState, { type: SHOW_SIGN_MODAL})).toEqual({
            ...initState,
            showSignModal: true
        });
    });

    it('should set showsignmodal to false', () => {
        expect(status(initState, { type: HIDE_SIGN_MODAL })).toEqual({
            ...initState,
            showSignModal: false
        });
    });

    it('should set config', () => {
        expect(status(initState, { type: SET_ORDER_ADDRESS_CONFIG, config: {}})).toEqual({
            ...initState,
            config: {}
        });
    });

    it('should show share', () => {
        expect(status(initState, { type: SHOW_SHARE_MODAL })).toEqual({
            ...initState,
            shareStatus: true
        });
    });

    it('should hide share', () => {
        expect(status(initState, { type: HIDE_SHARE_MODAL })).toEqual({
            ...initState,
            shareStatus: false
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
                showLoginModal: true,
                showSignModal: true,
                config: {test: '123'},
                shareStatus: true
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

        it('should get login modal status', () => {
            expect(getLoginModalStatus(Store)).toEqual(true);
        });

        it('should get sign modal status', () => {
            expect(getSignModalStatus(Store)).toEqual(true);
        });

        it('should get config', () => {
            expect(getConfig(Store)).toEqual({test: '123'});
        });

        it('should get shareStatus', () => {
            expect(getShareStatus(Store)).toEqual(true);
        });
    });
});