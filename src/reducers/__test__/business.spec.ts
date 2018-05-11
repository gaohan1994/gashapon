import business, 
{ 
    getOrders, 
    getPayinfo,
    getIncome,
} from '../business';
import { 
    RECEIVE_ORDERS, 
    RECEIVE_PAYINFO,
    RECEIVE_INCOME_RECORD,
} from '../../constants/business';
import initState from '../business/state';
import store from '../initState';

describe('business 测试开始', () => {
    const orders = [
        {
            _id: '123',
        }
    ];

    const payinfo = [
        {
            _id: '123',
        },
        {
            _id: '456'
        }
    ];

    const income = {
        result: 200
    };

    it('应该成功 orders', () => {
        expect(
            business(initState, {type: RECEIVE_ORDERS, orders: orders})
        ).toEqual({orders: orders});
    });  

    it('should receive payinfo', () => {
        expect(business(initState, { type: RECEIVE_PAYINFO, payinfo: payinfo})).toEqual({
            ...initState,
            payinfo: payinfo
        });
    });

    it('should receive income', () => {
        expect(business(initState, { type: RECEIVE_INCOME_RECORD, income: income })).toEqual({
            ...initState,
            income: income
        });
    });

    it('应该成功 get Orders', () => {
        const Store = {
            ...store,
            business: {
                orders  : orders,
                payinfo : [{_id: 'test'}],
                income  : { _id: '123' },
            }
        };

        expect(getOrders(Store)).toEqual(orders);

        expect(getPayinfo(Store)).toEqual([{_id: 'test'}]);

        expect(getIncome(Store)).toEqual({ _id: '123' });
    });
    
});