import discount, 
{ 
    getDiscountData,
    getHomeDiscount,
    getHomeDiscounting
} from '../discount';
import { 
    RECEIVE_DISCOUNT, 
    RECEIVE_HOME_DISOUNT,
    RECEIVE_HOME_DISCOUNTING,
} from '../../constants/discount';
import initState from '../discount/state';
import store from '../initState';

describe('discount test begin', () => {
    const data: any = {};

    const discountData: any = [];

    it('should receive discount data', () => {
        expect(discount(initState, {type: RECEIVE_DISCOUNT, data: data})).toEqual({
            ...initState,
            data
        });
    });

    it('should receive home discount', () => {
        expect(discount(initState, {type: RECEIVE_HOME_DISOUNT, discount: discountData})).toEqual({
            ...initState,
            discount
        });
    });
    
    it('should receive home discounting', () => {
        expect(discount(initState, {type: RECEIVE_HOME_DISCOUNTING, discounting: discountData})).toEqual({
            ...initState,
            discounting: discountData,
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
                discounting: [{
                    _id: '123'
                }]
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

        it('should get discounting', () => {
            expect(getHomeDiscounting(Store)).toEqual([{_id: '123'}]);
        });
    });
});