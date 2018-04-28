import inventory, { getInventory } from '../inventory';
import { RECEIVE_INVENTORY } from '../../constants/inventory';
import initState from '../inventory/state';
import store from '../initState';

describe('inventory test begin', () => {

    const inventoryData = [{
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
        is_discount: 2,
        collect_count: 20,
        discount_plan: {
            max_discount: 1,
            create_date : new Date(),
            update_date : new Date(),
        }
    }];

    it('should receive inventory', () => {
        expect(inventory(initState, {type: RECEIVE_INVENTORY, inventory: inventoryData}))
        .toEqual({
            ...initState,
            inventory: inventoryData
        });
    });

    describe('get method test', () => {
        it('should get inventory', () => {
            const Store = {
                ...store,
                inventory: {
                    inventory: inventoryData
                }
            };

            expect(getInventory(Store)).toEqual(inventoryData);
        });
    });
});