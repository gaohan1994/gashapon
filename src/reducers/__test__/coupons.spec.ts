import coupons, 
{ 
    getLoading,
    getCoupons,
    getLastType
} from '../coupons';
import { 
    RECEIVE_COUPONS,
    LOADING_COUPONS_STATUS,
    LAST_LOAD_COUPONS_TYPE
} from '../../constants/coupons';
import initState from '../coupons/state';
import store from '../initState';

describe('check test begin', () => {

    const coupon = [{
        _id: '123'
    }];

    const loading = true;

    const lastType = 'test';

    it('should receive counpons', () => {
        expect(coupons(initState, { type: RECEIVE_COUPONS, coupons: coupon })).toEqual({
            ...initState,
            coupon: coupon
        });
    });

    it('should receive loading', () => {
        expect(coupons(initState, { type: LOADING_COUPONS_STATUS, loading: loading })).toEqual({
            ...initState,
            loading
        });
    });

    it('should receive lastype', () => {
        expect(coupons(initState, { type: LAST_LOAD_COUPONS_TYPE, lastType: lastType })).toEqual({
            ...initState,
            lastType
        });
    });

    describe('get method tests', () => {

        const Store = {
            ...store,
            coupons: {
                coupons: [{
                    _id: '123'
                }],
                loading: true,
                lastType: 'hello'
            }
        };

        it('should get checks', () => {

            expect(getCoupons(Store)).toEqual([{
                _id: '123'
            }]);

            expect(getLoading(Store)).toEqual(true);

            expect(getLastType(Store)).toEqual('hello');
        });
    });
});