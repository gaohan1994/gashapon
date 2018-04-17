import * as React from 'react';
import { shallow, configure } from 'enzyme';
import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import Header from '../header_achievement';

configure({adapter: new Adapter()});

describe('Header 测试', () => {

    it('渲染 Header container 测试', () => {
        const header = shallow(<Header/>);
        expect(header.find('.container')).toHaveLength(1);
    });

    it('渲染 Header icon 测试', () => {
        const header = shallow(<Header/>);
        expect(header.find('.icon')).toHaveLength(1);
    });

    describe('点击测试', () => {

        it('点击测试 icon', () => {
            const propsClick = sinon.spy();
            const header = shallow(<Header propsClick={propsClick}/>);
            header.find('.icon').simulate('click');
            expect(propsClick.calledOnce).toEqual(true);
        });

    });

});