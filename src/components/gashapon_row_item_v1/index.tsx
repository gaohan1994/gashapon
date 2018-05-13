import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import Text from '../text';
import { Gashapon } from '../../types/componentTypes';

export interface Props {
    gashapon: Gashapon;
}

/**
 * 扭蛋行组件
 * 
 * @class Product
 * @extends {React.Component<Props, State>}
 */

const GashaponRow = ({gashapon}: Props): JSX.Element => (
    <div 
        styleName="container"
        flex-center="all-center"
    >
        <div 
            bgimg-center="bgimg-center"
            styleName="cover"
            style={{
                backgroundImage: gashapon.pics && gashapon.pics[0]
                                ? `url(//${config.host.pic}/${gashapon.pics[0]})`
                                : `url(${config.empty_pic.url})`
            }}
        />
        <div styleName="detail">
            <Text value={gashapon.name}/>
            <Text value="x1" subValue={`￥${gashapon.price}`}/>
        </div>
    </div>
);

const GashaponRowHoc = CSSModules(GashaponRow, styles);

export default GashaponRowHoc;