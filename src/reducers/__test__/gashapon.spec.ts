import gashapon, { getGashapon, getLoadingStatus  } from '../gashapon';
import { RECEIVE_GASHAPON, CHANGE_LOADING_STATUS } from '../../constants/gashapon';
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

    it('should receive gashapon', () => {
        const Store = {
            ...store,
            gashapon: {
                gashapon: testData,
                loading : false,
            }
        };

        expect(getGashapon(Store)).toEqual(testData);
    });

    it('should receive loading status false', () => {
        const Store = {
            ...store,
            gashapon: {
                gashapon: testData,
                loading : false,
            }
        };

        expect(getLoadingStatus(Store)).toEqual(false);
    });

    it('should receive loading status true', () => {
        const Store = {
            ...store,
            gashapon: {
                gashapon: testData,
                loading : true,
            }
        };

        expect(getLoadingStatus(Store)).toEqual(true);
    });
});