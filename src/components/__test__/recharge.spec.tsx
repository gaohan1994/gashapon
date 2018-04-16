// import * as React from 'react';
import { configure } from 'enzyme';
// import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
// import Recharge from '../recharge';

configure({adapter: new Adapter()});

describe('Recharge test', () => {
    
    describe('Rearge render 测试', () => {
        // it('money render test', () => {
        //     const recharge = shallow(<Recharge/>);
        //     expect(recharge.find('.money')).toHaveLength(1);
        // });   

        // it('moneyIcon render test', () => {
        //     const recharge = shallow(<Recharge/>);
        //     expect(recharge.find('.moneyIcon')).toHaveLength(1);
        // });   

        // it('pay render test', () => {
        //     const recharge = shallow(<Recharge/>);
        //     expect(recharge.find('.pay')).toHaveLength(1);
        // });   
        it('should behave...', () => {
            expect(1);
        });
    });

});