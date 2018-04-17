import * as React from 'react';
import { shallow, configure } from 'enzyme';
// import * as sinon from 'sinon';
import * as moment from 'moment';
import * as Adapter from 'enzyme-adapter-react-16';
import Coupon from '../coupon';

configure({adapter: new Adapter()});

describe('Coupon Test begin', () => {
    
    const couponData = {
        price: 1,
        value: 'hello',
        end_time: new Date()
    };

    describe('container test', () => {
        it('render Coupon container test', () => {
            const coupon = shallow(<Coupon/>);
            expect(coupon.find('.container')).toHaveLength(1);
        });
    });

    describe('icon test ', () => {
        it('render bge test', () => {
            const coupon = shallow(<Coupon/>);
            expect(coupon.find('.bge')).toHaveLength(1);
        });
    });

    describe('price test ', () => {
        it('render price test', () => {
            const coupon = shallow(<Coupon/>);
            expect(coupon.find('.price')).toHaveLength(1);
        });

        it('render price props test', () => {
            
            const coupon = shallow(<Coupon ticket={couponData}/>);
            expect(coupon.find('.price').text()).toEqual(`￥1`);
        });
    });

    describe('fullcut test ', () => {
        it('render fullcut test', () => {
            const coupon = shallow(<Coupon/>);
            expect(coupon.find('.fullcut')).toHaveLength(1);
        });

        it('render fullcut props test', () => {
            
            const coupon = shallow(<Coupon ticket={couponData}/>);
            expect(coupon.find('.fullcut').text()).toEqual('满0可用');
        });
    });

    describe('name test ', () => {
        it('render name test', () => {
            const coupon = shallow(<Coupon/>);
            expect(coupon.find('.name')).toHaveLength(1);
        });

        it('render name props test', () => {
            
            const coupon = shallow(<Coupon ticket={couponData}/>);
            expect(coupon.find('.name').text()).toEqual('hello');
        });
    });

    describe('endtime test ', () => {
        it('render endtime test', () => {
            const coupon = shallow(<Coupon/>);
            expect(coupon.find('.time')).toHaveLength(1);
        });

        it('render endtime props test', () => {
            
            const coupon = shallow(<Coupon ticket={couponData}/>);
            expect(coupon.find('.time').text()).toEqual(`有效期：${moment(couponData.end_time).format('YYYY-MM-DD')}`);
        });
    });
});