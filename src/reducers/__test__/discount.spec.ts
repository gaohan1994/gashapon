import discount, 
{ 
    getDiscountData,
} from '../discount';
import { 
    RECEIVE_DISCOUNT,
} from '../../constants/discount';
import initState from '../discount/state';
import store from '../initState';

describe('discount test begin', () => {
    const data = {
        _id: 1,
        value: 'test'
    };
    it('should receive discount data', () => {
        expect(discount(initState, {type: RECEIVE_DISCOUNT, data: data})).toEqual({
            ...initState,
            data
        });
    });

    describe('get method tests', () => {

        const Store = {
            ...store,
            discount: {
                data: {
                    name: 'test',
                    value: 'testvalue'
                }
            }
        };

        it('should get searchstatus', () => {
            expect(getDiscountData(Store)).toEqual({
                name: 'test',
                value: 'testvalue'
            });
        });
    });
});