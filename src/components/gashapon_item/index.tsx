import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Gashapon } from '../../types/componentTypes';
import config from '../../config';
import history from '../../history';

interface Props {
    item: Gashapon;
}

// const bges = [
//     {
//         _id: 1,
//         value: '预告'
//     },
//     {
//         _id: 2,
//         value: '新品'
//     },
//     {
//         _id: 3,
//         value: '热卖'
//     }
// ];

const onClickHandle = (_id: string): void => {
    history.push(`/gashapon/${_id}`);
};

/**
 * 扭蛋组件，gashapons页中展示的每个扭蛋
 * bge 和 collect 暂时未显示 
 * 
 * @param param0 
 */
const Gashapon = ({item}: Props) => (
    <div 
        styleName="container"
        onClick={() => onClickHandle(item._id)}
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
        {/*
        <div styleName="bges">
            {bges.map((item) => (
                <div
                    key={item._id}
                    styleName="bge"
                >
                    {item.value}
                </div>
            ))}
        </div>
        */}
        {/* 
        <div styleName="collect">
            1123
        </div> 
        */}
        <span styleName="name">{item.name}</span>
    </div>
);

const GashaponHoc = CSSModules(Gashapon, styles);

export default GashaponHoc;