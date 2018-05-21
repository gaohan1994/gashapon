import check, 
{ 
    getChecks
} from '../check';
import { 
    RECEIVE_MONTH_CHECK
} from '../../constants/check';
import initState from '../check/state';
import store from '../initState';

describe('check test begin', () => {
    
    const checks = [{}];

    it('should receive month check', () => {
        expect(check(initState, { type: RECEIVE_MONTH_CHECK, checks: checks})).toEqual({
            ...initState,
            checks: checks
        });
    });

    describe('get method tests', () => {

        const Store = {
            ...store,
            check: {
                checks: [
                    {
                        _id: '123'
                    }
                ]
            }
        };

        it('should get checks', () => {
            expect(getChecks(Store)).toEqual([{
                _id: '123'
            }]);
        });
    });
});