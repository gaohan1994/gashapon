import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';

/**
 * 
 * 尽量使用纯组件
 * @param {any} {} 
 */

interface NavType {
    _id     : number;
    nav     : string;
    title   : string;
    img     : string;
}

const navs: Array<NavType> = [
    {
        _id: 1,
        nav: '/',
        title: 'recommend',
        img: '',
    },
    {
        _id: 2,
        nav: '/gashapon',
        title: 'gashapon',
        img: '',
    },
    {
        _id: 3,
        nav: '/inventory',
        title: 'inventory',
        img: '',
    },
    {
        _id: 4,
        nav: '/my',
        title: 'my',
        img: '',
    },
];

const onNavHandle = (index: string): void => {
    console.log('index', index);
    history.push(index);
};

const Footer = ({}) => (
    <footer styleName="container">
        {navs.map((item: NavType) => (
            <div
                key={item._id}
                styleName="item" 
                onClick={() => onNavHandle(item.nav)}
            >
                {item.title}
            </div>
        ))}
    </footer>
);

const FooterHoc = CSSModules(Footer, styles);

export default FooterHoc;