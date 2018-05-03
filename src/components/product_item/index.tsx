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
            <div 
                styleName="container"
                flex-center="all-center"
            >
                <div styleName="border">
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
                            size="bold"
                        />
                        <Text 
                            value={`X${data.quantity}`} 
                            subValue={`￥10`}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const ProductHoc = CSSModules(Product, styles);

export default ProductHoc;