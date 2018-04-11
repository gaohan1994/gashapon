import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Header from '../../components/haeder_set';
import ProductItem from '../../components/product_item';
// import history from '../../history';
import { Stores } from '../../reducers/type';
import { BusinessActions } from '../../actions/business';
import { 
    Gashapon,
} from '../../types/componentTypes';

import { 
    loadOrders
} from '../../actions/business';

import { 
    getOrders,
} from '../../reducers/business';

interface Props {
    getOrders   : Gashapon[];
    loadOrders  : (userId: string) => void;
}

interface State {}

class Order extends React.Component<Props, State> {

    componentDidMount() {
        const { loadOrders } = this.props;
        const userId = '5ac1f31087e83ef4915abc02';
        loadOrders(userId);
    }

    render () {
        const { getOrders } = this.props;
        return (
            <div styleName="container">
                <Header title="我的订单"/>
                {getOrders.length > 0
                ? getOrders.map((item: Gashapon) => (
                    item.product_list.map((data, i) => (
                        <ProductItem 
                            data={data}
                            key={i}
                        />  
                    ))
                ))
                : 'empty'}
            </div>
        );
    }
}

const OrderHoc = CSSModules(Order, styles);

const mapStateToProps = (state: Stores) => ({
    getOrders: getOrders(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>) => ({
    loadOrders: bindActionCreators(loadOrders, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(OrderHoc);