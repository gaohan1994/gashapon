import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    Order as OrderType, 
    GashaponProductItem 
} from '../../types/componentTypes';
import config from '../../config/index';
import history from '../../history';
import {
    BusinessActions,    
    setSelectedOrder 
} from '../../actions/business';

export interface Button {
    value       : string;
    clickHandle : () => void;
}

export interface Footer {
    show    : boolean;
    buttons ?: Button[];
}

interface Props {
    data            : OrderType;
    setSelectedOrder?: (data: OrderType) => void;
    type            ?: string;
    footer          ?: Footer;
}

class OrderItem extends React.Component <Props, {}> {

    onNavHandle = (): void => {
        const { data, setSelectedOrder } = this.props;

        if (setSelectedOrder) {
            setSelectedOrder(data);
            history.push(`/orderdetail`);
        }
    }

    render (): JSX.Element {
        const { data, footer } = this.props;
        return (
            <div 
                styleName="container"
                flex-center="all-center"
            >
                <span 
                    styleName="text"
                    font-s="24"
                >
                    {data.create_date
                    ? moment(data.create_date).format('YYYY-MM-DD HH:mm')
                    : ''}
                </span>
                <div 
                    styleName="content"
                    onClick={() => this.onNavHandle()}
                >
                    {data.product_list && data.product_list.slice(0, 4).map((item: GashaponProductItem , i) => {
                        return (
                            <div 
                                key={i}
                                styleName="cover"
                                bgimg-center="bgimg-center"
                                style={{
                                    backgroundImage: item.pics && item.pics[0]
                                                    ? `url(http://${config.host.pic}/${item.pics[0]})`
                                                    : `url(${config.empty_pic.url})`
                                }}
                            />
                        );
                    })}
                    {data.product_list && data.product_list.length > 4
                    ? <i styleName="bge" bgimg-center="100"/>
                    : ''}
                    
                </div>
                <span 
                    styleName="text"
                    font-s="24"
                >
                    共{data.product_list && data.product_list.length}件扭蛋
                    {/* <span>运费：{data.}</span> */}
                </span>

                {footer && footer.show === true
                ? <div styleName="footer">
                    <div styleName="buttons">
                        {footer.buttons && footer.buttons.map((item: Button, i: number) => (
                            <span 
                                styleName="button"
                                key={i}
                                onClick={item.clickHandle}
                            >
                                {item.value}
                            </span>
                        ))}
                    </div>
                </div>
                : ''}
            </div>
        );
    }
}

const OrderItemHoc = CSSModules(OrderItem, styles);

const mapStateToProps = (state: Stores) => ({
    
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>) => ({
    setSelectedOrder: bindActionCreators(setSelectedOrder, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(OrderItemHoc);