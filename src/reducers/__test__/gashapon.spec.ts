import gashapon, 
{ 
    getGashapon, 
    getLoadingStatus, 
    getComments,
    getDiscount
} from '../gashapon';
import { RECEIVE_GASHAPON, CHANGE_LOADING_STATUS, RECEIVE_GASHAPON_DISCOUNT } from '../../constants/gashapon';
import initState from '../gashapon/state';
import store from '../initState';

describe('gashapon test', () => {
    const testData = {
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
    };

    it('test gashapon', () => {
        expect(
            gashapon(
                initState, 
                {
                    type: RECEIVE_GASHAPON,
                    gashapon: testData
                }
            )
        ).toEqual({gashapon: testData, loading: false});
    });

    it('test loading', () => {
        expect(
            gashapon(
                initState,
                {
                    type: CHANGE_LOADING_STATUS,
                    status: true
                }
            )
        ).toEqual({gashapon: testData, loading: true});
    });
    
    it('should receive gashapon discount', () => {
        expect(
            gashapon(
                initState,
                {
                    type: RECEIVE_GASHAPON_DISCOUNT,
                    discount: 5
                }
            )
        ).toEqual({...initState, discount: 5});
    });

    describe('get method test', () => {

        const Store = {
            ...store,
            gashapon: {
                gashapon: testData,
                loading : false,
                comments: [{test: 1}],
                shows   : [],
                discount: 5,
            }
        };

        it('should receive gashapon', () => {
            expect(getGashapon(Store)).toEqual(testData);
        });
    
        it('should receive loading status false', () => {
            expect(getLoadingStatus(Store)).toEqual(false);
        });
        
        it('should receive comments', () => {
            expect(getComments(Store)).toEqual([{test: 1}]);
        });

        it('should get discount', () => {
            expect(getDiscount(Store)).toEqual(5);
        });
    });
});