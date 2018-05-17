import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Gashapon } from '../../types/componentTypes';
import config from '../../config';
import history from '../../history';

interface Props {
    item: Gashapon;
    propsClickHandle?: () => void;
}

type Bges = {
    id  : number;
    img : string;
}[];

const onClickHandle = (_id: string): void => {
    history.push(`/gashapon/${_id}`);
};

const renderBge = (item: Gashapon): JSX.Element => {

    const bges: Bges = [];

    if (item.is_box === true) {
        bges.push({id: 1, img: 'http://net.huanmusic.com/gasha/gashapon/Box%EF%BC%81.png'});
    }

    if (item.is_discount === true) {
        bges.push({id: 2, img: 'http://net.huanmusic.com/gasha/gashapon/Cut%EF%BC%81.png'});
    }

    if (item.is_flash_sale === true) {
        bges.push({id: 3, img: 'http://net.huanmusic.com/gasha/gashapon/Next%EF%BC%81%EF%BC%81.png'});
    }

    return (
        <div styleName="bges">
            {bges.map((bge) => (
                <span
                    key={bge.id}
                    bgimg-center="100"
                    styleName="bge"
                    style={{backgroundImage: `url(${bge.img})`}}
                />
            ))}
        </div>
    );
};

/**
 * 扭蛋组件，gashapons页中展示的每个扭蛋
 * bge 和 collect 暂时未显示 
 * 
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
        {renderBge(item)}
        <span styleName="name">{item.name}</span>
    </div>
);

const GashaponHoc = CSSModules(Gashapon, styles);

export default GashaponHoc;