import * as React from 'react';
import { shallow, configure } from 'enzyme';
// import * as sinon from 'sinon';
import * as Adapter from 'enzyme-adapter-react-16';
import Product from '../product_item';
import Text from '../text';

configure({adapter: new Adapter()});

// const propsClickHandle = sinon.spy();

describe('Product 测试', () => {

    const data = {
        _id     : 'string',
        name    : 'string',
        pics    : ['string'],
        quantity: 1,
        rate    : 1,
        status  : 1,
    };

    describe('渲染 Product render 测试', () => {
        it('test container render', () => {
            const product = shallow(<Product data={data}/>);
            expect(product.find('.container')).toHaveLength(1);
        });

        it('test cover render', () => {
            const product = shallow(<Product data={data}/>);
            expect(product.find('.cover')).toHaveLength(1);
        });

        it('test detail render', () => {
            const product = shallow(<Product data={data}/>);
            expect(product.find('.detail')).toHaveLength(1);
        });

        it('test Text render', () => {
            const product = shallow(<Product data={data}/>);
            expect(product.find(Text)).toHaveLength(2);
        });

        // it('test text value', () => {
        //     const product = shallow(<Product data={data}/>);
        //     product.find(Text).map((item, i) => {
        //         i === 0
        //         ? expect(item.find('span').text()).toEqual(data.name || data.quantity)
        //         : expect(item.find('span').text()).toEqual(data.quantity || data.quantity);
        //     });
        // });
    });

});