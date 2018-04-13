import * as React from 'react';
import { shallow, configure } from 'enzyme';
// import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import Header from '../header_gashapon';
import Recharge from '../recharge';

configure({adapter: new Adapter()});

describe('Gashapon Header 测试', () => {

    it('渲染 Gashapon Header container 测试', () => {
        const header = shallow(<Header/>);
        expect(header.find('.container')).toHaveLength(1);
    });

    it('渲染 Gashapon Header back 测试', () => {
        const header = shallow(<Header/>);
        expect(header.find('.back')).toHaveLength(1);
    });

    it('渲染 Gashapon Header home 测试', () => {
        const header = shallow(<Header/>);
        expect(header.find('.home')).toHaveLength(1);
    });

    it('渲染 Gashapon Header Recharge 测试', () => {
        const header = shallow(<Header/>);
        expect(header.find(Recharge)).toHaveLength(1);
    });
    
});