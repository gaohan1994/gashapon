import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Menu from '../menu_v1';

/**
 * footer 组件
 * 功能：实现页面跳转
 * 
 * @class Footer
 * @extends {React.Component<{}, {}>}
 */
class Footer extends React.Component<{}, {}> {
    render () {
        const navs = [
            {
                _id: 1,
                param: '/',
                value: '推荐',
                img: window.location.pathname === '/'
                    ? '//net.huanmusic.com/gasha/%E6%8E%A8%E8%8D%90-%E7%82%B9%E5%87%BB%E5%90%8E.png'
                    : '//net.huanmusic.com/gasha/%E5%BD%A2%E7%8A%B6702.png'
            },
            {
                _id: 2,
                param: '/gashapons',
                value: '扭蛋',
                img: window.location.pathname.indexOf('gashapons') !== -1 
                    ? '//net.huanmusic.com/gasha/gashapon/%E6%89%AD%E8%9B%8B-%E7%82%B9%E5%87%BB%E5%90%8E.png'
                    : '//net.huanmusic.com/gasha/%E6%89%AD%E8%9B%8B-%E6%9C%AA%E7%82%B9%E5%87%BB.png'
            },
            {
                _id: 3,
                param: '/inventory',
                value: '蛋柜',
                img: window.location.pathname.indexOf('inventory') !== -1  
                    ? '//net.huanmusic.com/gasha/inventory/%E8%9B%8B%E6%9F%9C%E7%82%B9%E5%87%BB%E5%90%8E.png'
                    : '//net.huanmusic.com/gasha/%E8%9B%8B%E6%9F%9C-%E7%82%B9%E5%87%BB%E5%89%8D.png'
            },
            {
                _id: 4,
                param: '/my',
                value: '我的',
                img: window.location.pathname === '/my'
                    ? '//net.huanmusic.com/gasha/my/%E6%88%91%E7%9A%84-%E7%82%B9%E5%87%BB%E5%90%8E.png'
                    : '//net.huanmusic.com/gasha/%E6%88%91%E7%9A%84-%E7%82%B9%E5%87%BB%E5%89%8D.png',
            },
        ];
        return (
            <footer styleName="container">
                <Menu 
                    menus={navs}
                    iconWidth="6.66vw"
                    iconHeight="6.66vw"
                />
            </footer>
        );
    }
}

const FooterHoc = CSSModules(Footer, styles);

export default FooterHoc;