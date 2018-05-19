import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../../components/haeder_set';
import Product from '../../../components/product_item';
import { Order as OrderType } from '../../../types/componentTypes';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Stores } from '../../../reducers/type';
import { getSelectedOrder } from '../../../reducers/business';
import * as moment from 'moment';

interface Props {
    match: {
        params: {
            type: string;
        }
    };
    getSelectedOrder: OrderType;
}

class Detail extends React.Component <Props, {}> {

    render (): JSX.Element {
        const { getSelectedOrder, match } = this.props;
        console.log('getSelectedOrder', getSelectedOrder);
        console.log('match', match);
        return (
            <div 
                styleName="container"
                container-with-header="true"
                bg-white="true"
            >
                <Header title="订单详情"/>

                <Product
                    data={getSelectedOrder.product_list}
                />

                <div styleName="module">
                    <div styleName="box">
                        <span styleName="left">配送信息</span>
                    </div>
                    <div styleName="box">
                        <span styleName="left">收货地址</span>
                        <span styleName="content">{getSelectedOrder.address}</span>
                    </div>
                    <div styleName="box">
                        <span styleName="left">配送信息</span>
                        <span styleName="content">{getSelectedOrder.phone}</span>
                    </div>
                </div>

                <div styleName="module">
                    <div styleName="box">
                        <span styleName="left">订单信息</span>
                    </div>
                    <div styleName="box">
                        <span styleName="left">订单编号</span>
                        <span styleName="content">{getSelectedOrder._id}</span>
                    </div>
                    <div styleName="box">
                        <span styleName="left">下单时间</span>
                        <span styleName="content">
                            {getSelectedOrder.create_date
                            ? moment(getSelectedOrder.create_date).format('YYYY-MM-DD hh:mm')
                            : ''}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const DetailHoc = CSSModules(Detail, styles);

const mapStateToProps = (state: Stores) => ({
    getSelectedOrder: getSelectedOrder(state),
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({

});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailHoc);