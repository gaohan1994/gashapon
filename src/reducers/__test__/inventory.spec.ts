import inventory, 
{ 
    getInventory,
    getLoading,
    getLastGenre,
} from '../inventory';
import { 
    RECEIVE_INVENTORY, 
    LOADING_INVENTORY_STATUS, 
    LAST_LOAD_INVENTORY_GENRE,
} from '../../constants/inventory';
import initState from '../inventory/state';
import store from '../initState';

describe('inventory test begin', () => {

    const inventoryData = [{
        _id: '123',
        name: 'ghan',
        create_date: new Date(),
        genres: ['123'],
        pics: ['123'],
        price: 100,
        quantity: 10
    }];

    it('should receive inventory', () => {
        expect(inventory(initState, {type: RECEIVE_INVENTORY, inventory: inventoryData}))
        .toEqual({
            ...initState,
            inventory: inventoryData
        });
    });

    it('should set loading to true', () => {
        expect(inventory(initState, { type: LOADING_INVENTORY_STATUS, loading: true }))
        .toEqual({
            ...initState,
            loading: true
        });
    });

    it('should receive last genre', () => {
        expect(inventory(initState, { type: LAST_LOAD_INVENTORY_GENRE, lastGenre: '123' }))
        .toEqual({
            ...initState,
            lastGenre: '123'
        });
    });

    describe('get method test', () => {

        const Store = {
            ...store,
            inventory: {
                inventory: inventoryData,
                loading: true,
                lastGenre: 'test'
            }
        };

        it('should get inventory', () => {
            expect(getInventory(Store)).toEqual(inventoryData);
        });

        it('should get ladoign', () => {
            expect(getLoading(Store)).toEqual(true);
        });

        it('should get last genre', () => {
            expect(getLastGenre(Store)).toEqual('test');
        });
    });
});