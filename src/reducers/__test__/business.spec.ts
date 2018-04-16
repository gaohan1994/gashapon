import business, { getOrders } from '../business';
import { RECEIVE_ORDERS } from '../../constants/business';
import initState from '../business/state';
import store from '../initState';

describe('business 测试开始', () => {
    const orders = [
        {
            _id: '123',
        }
    ];

    it('应该成功 orders', () => {
        expect(
            business(initState, {type: RECEIVE_ORDERS, orders: orders})
        ).toEqual({orders: orders});
    });  

    it('应该成功 get Orders', () => {
        const Store = {
            ...store,
            business: {
                orders: orders,
            }
        };

        expect(getOrders(Store)).toEqual(orders);
    });
    
});