import * as React from 'react';
import { shallow, configure } from 'enzyme';
// import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import Gashapon from '../gashapon_item';

configure({adapter: new Adapter()});

describe('Gashapon 测试', () => {

    const data = {
        _id: '123',
        name: 'ghan',
        desc: 'test',
        start_time: new Date(),
        end_time: new Date(),
        open_time: new Date(),
        price: 100,
        pics: ['123'],
        product_list: [{
            _id: '123',
            name: 'gg',
            pics: ['23'],
            quantity: 0,
            price: 1000,
            rate: 0.1,
            status: 0,
        }],
        residue_quantity: 1,
        status: 0,
        music_url: 'test',
        is_discount: true,
        collect_count: 20,
        discount_plan: {
            max_discount: 1,
            create_date : new Date(),
            update_date : new Date(),
        }
    };

    it('渲染 Gashapon div 测试', () => {
        const gashapon = shallow(<Gashapon item={data}/>);
        expect(gashapon.find('div')).toHaveLength(1);
    });

    it('渲染 Gashapon i 测试', () => {
        const gashapon = shallow(<Gashapon item={data}/>);
        expect(gashapon.find('i')).toHaveLength(1);
    });

    it('渲染 Gashapon span 测试', () => {
        const gashapon = shallow(<Gashapon item={data}/>);
        expect(gashapon.find('span')).toHaveLength(1);
    });

    it('渲染 item name 测试', () => {
        const gashapon = shallow(<Gashapon item={data}/>);
        expect(gashapon.find('span').text()).toEqual(data.name);
    });

});