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

export interface MenuItem {
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
                onClick={item.propsClickHandle
                        ? item.propsClickHandle
                        : item.param
                            ? () => onClickHandle(item.param)
                            : () => noParamHandle()}
            >
                <i
                    styleName="icon"
                    style={{
                        width: iconWidth ? iconWidth : '12vw',
                        height: iconHeight ? iconHeight : '12vw',
                        backgroundImage: item.img 
                                        ? `url(${item.img})`
                                        : `url(${config.empty_pic.url})`
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