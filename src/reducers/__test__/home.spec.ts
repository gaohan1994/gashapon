import home, { getCollectGashapons, getUserdata } from '../home';
import { RECEIVE_HOME_COLLECT, RECEIVE_HOME_USERDATA } from '../../constants/home';
import initState from '../home/state';
import store from '../initState';

describe('home 测试开始', () => {

    const userdata = {};
    const gashapons = [{}];

    it('should receive userdata', () => {
        expect(home(initState, {type: RECEIVE_HOME_USERDATA, userdata: userdata}))
        .toEqual({
            ...initState,
            userdata: userdata
        });
    });

    it('should receive gashapons', () => {
        expect(home(initState, {type: RECEIVE_HOME_COLLECT, gashapons: gashapons}))
        .toEqual({
            ...initState,
            gashapons: gashapons
        });
    });

    describe('get method test', () => {
        const Store = {
            ...store,
            home: {
                userdata    : userdata,
                gashapons   : gashapons
            }
        };

        it('should get userdata', () => {
            expect(getUserdata(Store)).toEqual(userdata);
        });

        it('should get gashapon', () => {
            expect(getCollectGashapons(Store)).toEqual(gashapons);
        });
    });
});