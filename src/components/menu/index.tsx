import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import history from '../../history';

/**
 * menus item
 * height 选穿不穿默认 150px
 */
interface Props {
    menus       : MenuItem[];
    height      ?: number;
    iconSize    ?: string;
    menuColor   ?: string;
    menuImage   ?: string;
    iconWidth   ?: string;
    iconHeight  ?: string;
}

interface MenuItem {
    _id             : number;
    img             : string;
    value           ?: string;
    position        ?: string;
    size            ?: string;
    param           ?: string;
    propsClickHandle?: () => void;
}

const onClickHandle = (param?: string): void => {
    history.push(`${param}`);
};

const noParamHandle = (): void => {/*no empty*/};

// const renderSize = (size: string): string => {
//     if (size === 'big') {
//         return 'big';
//     } else if (size === 'normal') {
//         return 'normal';
//     } else if (size === 'small') {
//         return 'small';
//     } else {
//         return size;
//     }
// };

const Menu = ({menus, height, iconSize, menuColor, menuImage, iconWidth, iconHeight}: Props) => (
    <ul 
        styleName="container"
        style={{
            backgroundColor: menuColor
                            ? menuColor
                            : '',
            backgroundImage: menuImage
                            ? `url(${menuImage})`
                            : ''
        }}
    >
        {menus.map((item) => (
            <li 
                key={item._id}
                styleName="item"
                // style={{
                //     height: height 
                //                 ? `${(height / 750) * 100}vw` 
                //                 : `20vw`
                // }}
                onClick={item.propsClickHandle
                        ? item.propsClickHandle
                        : item.param
                            ? () => onClickHandle(item.param)
                            : () => noParamHandle()}
            >
                <i
                    // menu-icon-size={iconSize ? renderSize(iconSize) : 'normal'}
                    styleName="icon"
                    style={{
                        width: iconWidth ? iconWidth : '40px',
                        height: iconHeight ? iconHeight : '40px',
                        backgroundImage: item.img 
                                        ? `url(${item.img})`
                                        : `url(${config.empty_pic.url})`,
                        backgroundPosition: item.position
                                        ? item.position
                                        : '',
                        backgroundSize: item.size
                                        ? item.size
                                        : '100% 100%',
                        
                    }}
                />
                {item.value
                ? <span styleName="text">{item.value}</span>
                : ''}
            </li>
        ))}
    </ul>
);

const MenuHoc = CSSModules(Menu, styles);

export default MenuHoc;