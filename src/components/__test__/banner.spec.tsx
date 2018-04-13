import * as React from 'react';
import { shallow, configure } from 'enzyme';
// import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import Banner from '../banner';

configure({adapter: new Adapter()});

describe('Banner测试', () => {

    it('渲染测试', () => {
        const banner = shallow(<Banner/>);
        expect(banner.find('div')).toHaveLength(1);
    });

    it('渲染测试', () => {
        const banner = shallow(<Banner/>);
        expect(banner.find('i')).toHaveLength(2);
    });

});