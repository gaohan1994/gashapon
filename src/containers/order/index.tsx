
import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/haeder_set';
import ProductItem from '../../components/product_item';
// import history from '../../history';

interface Props {}

interface State {}

class Order extends React.Component<Props, State> {
    render () {
        return (
            <div styleName="container">
                <Header title="我的订单"/>
                <ProductItem/>
                <ProductItem/>
            </div>
        );
    }
}

const OrderHoc = CSSModules(Order, styles);

export default OrderHoc;