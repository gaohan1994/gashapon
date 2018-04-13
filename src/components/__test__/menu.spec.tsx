import * as React from 'react';
import { shallow, configure } from 'enzyme';
import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import Menu from '../menu';

configure({adapter: new Adapter()});

const propsClickHandle = sinon.spy();

describe('Menu 测试', () => {
    const menus = [
        {
            _id: 1,
            img: '1',
            propsClickHandle: propsClickHandle
        },
        {
            _id: 2,
            img: '2',
            propsClickHandle: propsClickHandle
        },
    ];

    describe('渲染Menu UL 测试', () => {
        it('', () => {
            const menu = shallow(<Menu menus={menus}/>);
            expect(menu.find('ul')).toHaveLength(1);
        });
    });

    describe('', () => {
        it('渲染Menu LI 测试', () => {
            const menu = shallow(<Menu menus={menus}/>);
            expect(menu.find('li')).toHaveLength(2);
        });
    });

    describe('', () => {
        it('点击测试', () => {
            const menu = shallow(<Menu menus={menus}/>);
            menu.find('ul').children().map((item, i) => {
                item.simulate('click');
                expect(propsClickHandle.callCount).toEqual(i + 1);
            });
        });    
    });

    describe('', () => {
        it('span value 测试', () => {
            const menuValue = [
                {
                    _id: 1,
                    img: '1',
                    value: 'text1',
                },
                {
                    _id: 2,
                    img: '2',
                    value: 'text2'
                },
            ];
            const menu = shallow(<Menu menus={menuValue}/>);
            menu.find('ul').children().map((item, i) => {
                expect(item.find('span').text()).toEqual(menuValue[i].value);
            });
        });
    });
    
});