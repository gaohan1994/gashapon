import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Menu from '../menu';

class Footer extends React.Component<{}, {}> {
    render () {
        const navs = [
            {
                _id: 1,
                param: '/',
                img: 'http://net.huanmusic.com/gasha/gacha-menu.png',
                size: '172px auto',
                position: window.location.pathname === '/' 
                            ? '-.5px -.5px'
                            : '-86.5px -.5px'
            },
            {
                _id: 2,
                param: '/gashapons',
                img: 'http://net.huanmusic.com/gasha/gacha-menu.png',
                size: '172px auto',
                position: window.location.pathname.indexOf('gashapons') !== -1
                            ? '-.5px -71.5px'
                            : '-86.5px -71.5px'
            },
            {
                _id: 3,
                param: '/inventory',
                img: 'http://net.huanmusic.com/gasha/gacha-menu.png',
                size: '172px auto',
                position: window.location.pathname === '/inventory' 
                            ? '-.5px -142.5px'
                            : '-86.5px -142.5px'
            },
            {
                _id: 4,
                param: '/my',
                img: 'http://net.huanmusic.com/gasha/gacha-menu.png',
                size: '172px auto',
                position: window.location.pathname === '/my' 
                            ? '-.5px -213.5px'
                            : '-86.5px -213.5px'
            },
        ];
        return (
            <footer styleName="container">
                <Menu 
                    menus={navs}
                    height={160} 
                    iconWidth="85px"
                    iconHeight="70px"
                    iconSize="big"
                />
            </footer>
        );
    }
}

const FooterHoc = CSSModules(Footer, styles);

export default FooterHoc;