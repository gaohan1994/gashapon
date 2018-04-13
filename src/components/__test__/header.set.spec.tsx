import * as React from 'react';
import { shallow, configure } from 'enzyme';
import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import Header from '../haeder_set';

configure({adapter: new Adapter()});

describe('Header 测试', () => {

    it('渲染 Header 测试', () => {
        const header = shallow(<Header title="test"/>);
        expect(header.find('.container')).toHaveLength(1);
    });

    it('渲染 Header 测试', () => {
        const header = shallow(<Header title="test"/>);
        expect(header.find('.icon')).toHaveLength(1);
    });

    it('渲染 Header 测试', () => {
        const header = shallow(<Header title="test"/>);
        expect(header.find('.text')).toHaveLength(1);
    });

    describe('点击测试', () => {

        it('点击测试 icon', () => {
            const propsClick = sinon.spy();
            const header = shallow(<Header title="test" propsClick={propsClick}/>);
            header.find('.icon').simulate('click');
            expect(propsClick.calledOnce).toEqual(true);
        });

        it('点击测试 text', () => {
            const propsClick = sinon.spy();
            const header = shallow(<Header title="test" propsClick={propsClick}/>);
            header.find('.text').simulate('click');
            expect(propsClick.calledOnce).toEqual(true);
        });

    });

});