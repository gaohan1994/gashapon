import * as React from 'react';
import { shallow, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Achievement from '../achievement';

configure({adapter: new Adapter()});

describe('Achievement test begin', () => {
    
    const achievement = {
        name: '我的处女蛋',
        desc: '扭蛋1次',
        img: 'http://net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E8%9B%8B%E5%9C%88.png',
        progress: 0,
        totalProgress: 1,
    };

    describe('container test', () => {
        it('should render container', () => {
            expect(
                shallow(<Achievement achievement={achievement}/>).find('.container')
            ).toHaveLength(1);
        });
    });
    
    describe('cover test', () => {
        it('should render cover', () => {
            expect(
                shallow(<Achievement achievement={achievement}/>).find('.cover')
            ).toHaveLength(1);
        });
    });

    describe('detail test', () => {

        it('should render name', () => {
            expect(
                shallow(<Achievement achievement={achievement}/>).find('.name')
            ).toHaveLength(1);
        });

        it('should render name text', () => {
            expect(
                shallow(<Achievement achievement={achievement}/>).find('.name').text()
            ).toEqual('我的处女蛋');
        });

        it('should render desc', () => {
            expect(
                shallow(<Achievement achievement={achievement}/>).find('.desc')
            ).toHaveLength(1);
        });

    });

});