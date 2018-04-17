import * as React from 'react';
import { shallow, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Achievement from '../achievement';

configure({adapter: new Adapter()});

describe('Achievement test begin', () => {
    
    describe('container test', () => {
        it('should render container', () => {
            expect(
                shallow(<Achievement/>).find('.container')
            ).toHaveLength(1);
        });
    });
    
    describe('cover test', () => {
        it('should render cover', () => {
            expect(
                shallow(<Achievement/>).find('.cover')
            ).toHaveLength(1);
        });
    });

    describe('detail test', () => {

        const achievement = {
            name: '我的处女蛋',
            desc: '扭蛋1次',
            progress: 0,
            totalProgress: 1,
        };

        it('should render detail', () => {
            expect(
                shallow(<Achievement/>).find('.detail')
            ).toHaveLength(1);
        });

        it('should render name', () => {
            expect(
                shallow(<Achievement/>).find('.name')
            ).toHaveLength(1);
        });

        it('should render name text', () => {
            expect(
                shallow(<Achievement achievement={achievement}/>).find('.name').text()
            ).toEqual('我的处女蛋');
        });

        it('should render desc', () => {
            expect(
                shallow(<Achievement/>).find('.desc')
            ).toHaveLength(1);
        });

        it('should render desc text', () => {
            expect(
                shallow(<Achievement achievement={achievement}/>).find('.desc').text()
            ).toEqual('扭蛋1次');
        });

        it('should render progress', () => {
            expect(
                shallow(<Achievement/>).find('.bar')
            ).toHaveLength(1);
        });

        it('should render progress value', () => {
            expect(
                shallow(<Achievement achievement={achievement}/>).find('.bar').text()
            ).toEqual(`0/1`);
        });

    });

});