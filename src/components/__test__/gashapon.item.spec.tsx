import * as React from 'react';
import { shallow, configure } from 'enzyme';
// import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import Gashapon from '../gashapon_item';

configure({adapter: new Adapter()});

describe('Gashapon 测试', () => {

    const data = {
        _id             : 'string',
        name            : 'string',
        desc            : 'string',
        start_time      : new Date(),
        end_time        : new Date(),
        open_time       : new Date(),
        price           : 1,
        pics            : ['string'],
        product_list    : [{
            _id     : 'string',
            name    : 'string',
            pics    : ['string'],
            quantity: 1,
            rate    : 1,
            status  : 1,
        }],
        residue_quantity: 1,
        status          : 1,
    };

    it('渲染Gashapon测试', () => {
        const gashapon = shallow(<Gashapon item={data}/>);
        expect(gashapon.find('div')).toHaveLength(1);
        expect(gashapon.find('i')).toHaveLength(1);
        expect(gashapon.find('span')).toHaveLength(1);
    });

    it('渲染item.name测试', () => {
        const gashapon = shallow(<Gashapon item={data}/>);
        expect(gashapon.find('span').text()).toEqual(data.name);
    });

});