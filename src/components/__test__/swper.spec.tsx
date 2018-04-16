import * as React from 'react';
import { shallow, configure } from 'enzyme';
// import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import Swiper from '../swiper';

configure({adapter: new Adapter()});

// const propsClickHandle = sinon.spy();

describe('Swiper 测试', () => {

    const images = [{
        _id     : 'string',
        pic     : 'string',
        type    : 0,
        param   : 'string',
    }];

    describe('渲染 Swiper render 测试', () => {
        it('test container render', () => {
            const swiper = shallow(<Swiper images={images}/>);
            expect(swiper.find('.container')).toHaveLength(1);
        });

        it('test container render', () => {
            const swiper = shallow(<Swiper images={images}/>);
            expect(swiper.find('.wrapItem')).toHaveLength(1);
        });

        it('test trig render', () => {
            const swiper = shallow(<Swiper images={images}/>);
            expect(swiper.find('.trig')).toHaveLength(1);
        });

        it('test render', () => {
            const swiper = shallow(<Swiper images={images}/>);
            const trig = swiper.find('.trig');
            expect(trig.find('span')).toHaveLength(1);
        });

    });

});