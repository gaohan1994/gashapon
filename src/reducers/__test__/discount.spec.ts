import discount, 
{ 
    getDiscountData,
    getHomeDiscount,
} from '../discount';
import { 
    RECEIVE_DISCOUNT, RECEIVE_HOME_DISOUNT,
} from '../../constants/discount';
import initState from '../discount/state';
import store from '../initState';

describe('discount test begin', () => {
    const data = {
        _id: 1,
        value: 'test'
    };

    const discount = [{
        _id: '123'
    }];

    it('should receive discount data', () => {
        expect(discount(initState, {type: RECEIVE_DISCOUNT, data: data})).toEqual({
            ...initState,
            data
        });
    });

    it('should receive home discount', () => {
        expect(discount(initState, {type: RECEIVE_HOME_DISOUNT, discount: discount})).toEqual({
            ...initState,
            discount
        });
    });

    describe('get method tests', () => {

        const Store = {
            ...store,
            discount: {
                data: {
                    name: 'test',
                    value: 'testvalue'
                },
                discount: [{
                    _id: '123',
                }],
            }
        };

        it('should get searchstatus', () => {
            expect(getDiscountData(Store)).toEqual({
                name: 'test',
                value: 'testvalue'
            });
        });

        it('should get home discount', () => {
            expect(getHomeDiscount(Store)).toEqual([{_id: '123'}]);
        });
    });
});