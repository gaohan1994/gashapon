import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import Text from '../text';
// import history from '../../history';

interface Props {

}

interface State {
    
}

class Product extends React.Component<Props, State> {

    render() {
        return (
            <div styleName="container">
                <div 
                    bgimg-center="bgimg-center"
                    styleName="cover"
                    style={{
                        backgroundImage: `url(${config.empty_pic.url})`
                    }}
                />
                <div styleName="detail">
                    <Text 
                        value="" 
                        subValue="hai gao"
                    />
                </div>
            </div>
        );
    }
}

const ProductHoc = CSSModules(Product, styles);

export default ProductHoc;