import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Gashapon } from '../../types/componentTypes';
import config from '../../config';
import history from '../../history';

interface Props {
    item            : Gashapon;
    propsClickHandle?: () => void;
}

const onClickHandle = (_id: string): void => {
    history.push(`/gashapon/${_id}`);
};

/**
 * 蛋柜页面扭蛋组件
 * @param param0 
 */
const Gashapon = ({item, propsClickHandle}: Props) => (
    <div 
        styleName="container"
        onClick={propsClickHandle ? propsClickHandle : () => onClickHandle(item._id)}
    >
        <i 
            styleName="cover"
            style={{
                backgroundImage: 
                    item.pics && item.pics[0] 
                    ? `url(http://${config.host.pic}/${item.pics[0]}?imageView/2/w/170/h/220)`
                    : `url(${config.empty_pic.url}?imageView/2/w/170/h/220)`
            }}
        />
        {/* <span styleName="name">￥{item.price}</span> */}
        <span styleName="name">{item.name}</span>
    </div>
);

const GashaponHoc = CSSModules(Gashapon, styles);

export default GashaponHoc;