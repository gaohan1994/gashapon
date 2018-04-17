import * as React from 'react';
import { shallow, configure } from 'enzyme';
// import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import Gashapon from '../gashapon_row_item';

configure({adapter: new Adapter()});

describe('Gashapon.row.item 测试', () => {

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

    it('渲染 Gashapon div 测试', () => {
        const gashapon = shallow(<Gashapon gashapon={data}/>);
        expect(gashapon.find('div')).toHaveLength(6);
    });

});