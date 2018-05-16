import business, 
{ 
    getOrders, 
    getPayinfo,
    getIncome,
    getSelectedAddress,
    getSelectedGashapons,
    getLocation
} from '../business';
import { 
    RECEIVE_ORDERS, 
    RECEIVE_PAYINFO,
    RECEIVE_INCOME_RECORD,
    SET_SELECTED_ADDRESS,
    SET_SELECTED_GASHAPONS,
    RECEIVE_PACKAGE_LOCATION,
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

    const address = {
        _id: '123'
    };

    const gashapons = [{
        _id: '123',
        name: 'ghan',
        desc: 'test',
        start_time: new Date(),
        end_time: new Date(),
        open_time: new Date(),
        price: 100,
        pics: ['123'],
        product_list: [{
            _id: '123',
            name: 'gg',
            pics: ['23'],
            quantity: 0,
            rate: 0.1,
            status: 0,
        }],
        residue_quantity: 1,
        status: 0,
        music_url: 'test',
        is_discount: true,
        collect_count: 20,
        discount_plan: {
            max_discount: 1,
            create_date : new Date(),
            update_date : new Date(),
        }
    }];

    const location = {id: '123'};

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

    it('should set address', () => {
        expect(business(initState, { type: SET_SELECTED_ADDRESS, address: address })).toEqual({
            ...initState,
            address: address,
        });
    });

    it('should set selected gashapons', () => {
        expect(business(initState, { type: SET_SELECTED_GASHAPONS, gashapons: gashapons})).toEqual({
            ...initState,
            gashapons: gashapons
        });
    });

    it('should receive location', () => {
        expect(business(initState, { type: RECEIVE_PACKAGE_LOCATION, location: location})).toEqual({
            ...initState,
            location: location
        });
    });

    it('应该成功 get Orders', () => {
        const Store = {
            ...store,
            business: {
                orders  : orders,
                payinfo : [{_id: 'test'}],
                income  : { _id: '123' },
                address : { id: '123' },
                gashapons: gashapons,
                location: { id: '123' },
            }
        };

        expect(getOrders(Store)).toEqual(orders);

        expect(getPayinfo(Store)).toEqual([{_id: 'test'}]);

        expect(getIncome(Store)).toEqual({ _id: '123' });
        
        expect(getSelectedAddress(Store)).toEqual({ id: '123' });

        expect(getSelectedGashapons(Store)).toEqual(gashapons);

        expect(getLocation(Store)).toEqual(location);
    });
    
});