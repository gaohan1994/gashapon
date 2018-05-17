import home, { 
    getCollectGashapons, 
    getUserdata, 
    getCode,
    getCount
} from '../home';
import { 
    RECEIVE_HOME_COLLECT, 
    RECEIVE_HOME_USERDATA,
    RECEIVE_OREDER_COUNT,
} from '../../constants/home';
import initState from '../home/state';
import store from '../initState';

describe('home 测试开始', () => {

    const userdata = {};
    const gashapons = [{}];
    const code = {
        id: 'test'
    };
    const count = {test: '123'};

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

    it('should receive count', () => {
        expect(home(initState, {type: RECEIVE_OREDER_COUNT, count: count}))
        .toEqual({
            ...initState,
            count: count
        });
    });

    describe('get method test', () => {
        const Store = {
            ...store,
            home: {
                userdata    : userdata,
                gashapons   : gashapons,
                code        : code,
                count       : count,
            }
        };

        it('should get userdata', () => {
            expect(getUserdata(Store)).toEqual(userdata);
        });

        it('should get gashapon', () => {
            expect(getCollectGashapons(Store)).toEqual(gashapons);
        });

        it('should get code', () => {
            expect(getCode(Store)).toEqual(code);
        });

        it('should get Count', () => {
            expect(getCount(Store)).toEqual(count);
        });
    });
});