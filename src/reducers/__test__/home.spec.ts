import home, { 
    getCollectGashapons, 
    getUserdata, 
    getCode,
    getCount,
    getProvinces,
    getCities,
    getAreas
} from '../home';
import { 
    RECEIVE_HOME_COLLECT, 
    RECEIVE_HOME_USERDATA,
    RECEIVE_OREDER_COUNT,
    RECEIVE_AREAS,
    RECEIVE_CITIES,
    RECEIVE_PROVINCES
} from '../../constants/home';
import initState from '../home/state';
import store from '../initState';

describe('home 测试开始', () => {

    const userdata = {};
    const gashapons = [{}];
    const code = {
        id: 'test'
    };
    const count = [1, 2, 3];
    const province = {code: '123'};
    const city = {code: '123'};
    const area = {code: '123'};

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

    it('should receive province ', () => {
        expect(home(initState, {type: RECEIVE_PROVINCES, provinces: [province]}))
        .toEqual({
            ...initState,
            provinces: [province]
        });
    });

    it('should receive city ', () => {
        expect(home(initState, {type: RECEIVE_CITIES, cities: [city]}))
        .toEqual({
            ...initState,
            cities: [city]
        });
    });
    
    it('should receive area ', () => {
        expect(home(initState, {type: RECEIVE_AREAS, areas: [area]}))
        .toEqual({
            ...initState,
            areas: [area]
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
                provinces   : [{}],
                cities      : [{}],
                areas       : [{}],   
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

        it('should get provinces', () => {
            expect(getProvinces(Store)).toEqual([{}]);
        });

        it('should get cities', () => {
            expect(getCities(Store)).toEqual([{}]);
        });

        it('should get areas', () => {
            expect(getAreas(Store)).toEqual([{}]);
        });
    });
});