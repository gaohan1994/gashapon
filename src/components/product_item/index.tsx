import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import Text from '../text';
import { GashaponProductItem } from '../../types/componentTypes';
// import history from '../../history';

interface Props {
    data: GashaponProductItem;
}

interface State {}

class Product extends React.Component<Props, State> {

    render() {
        const { data } = this.props;
        return (
            <div styleName="container">
                <div 
                    bgimg-center="bgimg-center"
                    styleName="cover"
                    style={{
                        backgroundImage: data.pics && data.pics[0]
                        ? `url(http://${config.host.pic}/${data.pics[0]})`
                        : `url(${config.empty_pic.url})`
                    }}
                />
                <div styleName="detail">
                    <Text 
                        value={data.name} 
                        subValue={`￥0`}
                        size="bold"
                    />
                    <Text 
                        value="" 
                        subValue={`X${data.quantity}`}
                    />
                </div>
            </div>
        );
    }
}

const ProductHoc = CSSModules(Product, styles);

export default ProductHoc;