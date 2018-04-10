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
    menus   : MenuItem[];
    height  ?: number;
    
}

interface MenuItem {
    _id             : number;
    img             : string;
    param           ?: string;
    propsClickHandle?: () => void;
}

const onClickHandle = (param?: string): void => {
    history.push(`${param}`);
};

const noParamHandle = (): void => {/*no empty*/};

const Menu = ({menus, height}: Props) => (
    <ul styleName="container">
        {menus.map((item) => (
            <li 
                bgimg-center="bgimg-center"
                key={item._id}
                styleName="item"
                style={{
                    backgroundImage: `url(${config.empty_pic.url})`,
                    height: height 
                            ? `${(height / 750) * 100}vw` 
                            : `20vw`
                }}
                onClick={item.propsClickHandle
                        ? item.propsClickHandle
                        : item.param
                            ? () => onClickHandle(item.param)
                            : () => noParamHandle()}
            />
        ))}
    </ul>
);

const MenuHoc = CSSModules(Menu, styles);

export default MenuHoc;