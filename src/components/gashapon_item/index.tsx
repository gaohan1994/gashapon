import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config';

interface Props {
    item?: Item;
}

interface Item {
    img     : string;
    title   : string;
    bges    : Array<Object>;
}

const bges = [
    {
        _id: 1,
        value: '预告'
    },
    {
        _id: 2,
        value: '新品'
    },
    {
        _id: 3,
        value: '热卖'
    }
];

const onClickHandle = (): void => {
    alert('Gashapon');
};

const Gashapon = ({item}: Props) => (
    <div 
        styleName="container"
        onClick={onClickHandle}
    >
        <i 
            styleName="cover"
            style={{
                backgroundImage: `url(${config.empty_pic.url})`
            }}
        />
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
        <div styleName="collect">1123</div>
        <span styleName="name">span</span>
    </div>
);

const GashaponHoc = CSSModules(Gashapon, styles);

export default GashaponHoc;