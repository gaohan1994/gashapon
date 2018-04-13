import * as React from 'react';
import { shallow, configure } from 'enzyme';
import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import Button from '../button';

configure({adapter: new Adapter()});

describe('Main', () => {
    
    it('渲染button', () => {
        const button = shallow(<Button btnText="123"/>);
        expect(button.find('div')).toHaveLength(1);
    });

    it('渲染btnText', () => {
        const button = shallow(<Button btnText="123"/>);
        expect(button.find('div').text()).toEqual('123');
    });
    
    it('测试button点击事件', () => {
        const onButtonClick = sinon.spy();
        const button = shallow(<Button btnText="123" clickHandle={onButtonClick}/>);
        button.find('div').simulate('click');
        expect(onButtonClick.calledOnce).toEqual(true);
    });

});