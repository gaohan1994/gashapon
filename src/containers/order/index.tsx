import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Header from '../../components/haeder_set';
import ProductItem from '../../components/product_item';
import { Stores } from '../../reducers/type';
import { BusinessActions } from '../../actions/business';
import { 
    Gashapon,
} from '../../types/componentTypes';
import { 
    loadOrders,
    loadWaitOrders,
    loadWaitConfirmOrders,
} from '../../actions/business';
import { 
    getOrders,
} from '../../reducers/business';
import { getUserdata } from '../../reducers/home';
import { Userdata } from '../../types/user';

interface Props {
    match: {
        params: {
            type: string;
        }
    };
    getOrders               : Gashapon[];
    loadOrders              : (userId: string) => void;
    loadWaitOrders          : (userId: string) => void;
    loadWaitConfirmOrders   : (userId: string) => void;
    getUserdata             : Userdata;
}

interface State {
    type: string;
}

class Order extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            type: ''
        };
    }

    componentDidMount() {
        const { loadOrders, match, getUserdata } = this.props;

        if (!!match.params && !!match.params.type) {
            
            const type = match.params.type;
            switch (type) {
                case 'waitconfirm':
                    this.onChangeTypeStateHandle(type);
                    loadWaitConfirmOrders(getUserdata._id);
                    return;
                case 'wait':
                    this.onChangeTypeStateHandle(type);
                    loadWaitOrders(getUserdata._id);
                    return;
                case 'already':
                    this.onChangeTypeStateHandle(type);
                    loadOrders(getUserdata._id);
                    return;
                default: return;
            }
        } else {

            loadOrders(getUserdata._id);
        }
    }

    public onChangeTypeHandle = (type: string): void => {
        const { 
            loadOrders,
            loadWaitConfirmOrders,
            loadWaitOrders,
            getUserdata,
        } = this.props;

        switch (type) {
            case 'waitconfirm':
                this.onChangeTypeStateHandle(type);
                loadWaitConfirmOrders(getUserdata._id);
                return;
            case 'wait':
                this.onChangeTypeStateHandle(type);
                loadWaitOrders(getUserdata._id);
                return;
            case 'already':
                this.onChangeTypeStateHandle(type);
                loadOrders(getUserdata._id);
                return;
            default: return;
        }
    }

    onChangeTypeStateHandle = (type: string): void => {
        if (!type) {
            return;
        } else {
            this.setState({
                type: type
            });
        }
    }

    render () {
        const { getOrders } = this.props;
        return (
            <div styleName="container">
                <Header title="我的订单"/>
                {this.renderNav()}
                {getOrders.length > 0
                ? getOrders.map((item: Gashapon) => (
                    item.product_list.map((data, i) => (
                        <ProductItem
                            key={i}
                            data={data}
                        />
                    ))
                ))
                : 'empty'}
            </div>
        );
    }

    private renderNav = (): JSX.Element => {
        const { type } = this.state;
        return (
            <div styleName="navbar">
                <div 
                    styleName="white"
                    flex-center="all-center"
                >
                    <div 
                        styleName={type === 'waitconfirm' ? 'navItemActive' : 'navItem'}
                        onClick={() => this.onChangeTypeHandle('waitconfirm')} 
                    >
                        待确认
                    </div>
                    <div 
                        styleName={type === 'wait' ? 'navItemActive' : 'navItem'}
                        onClick={() => this.onChangeTypeHandle('wait')} 
                    >
                        待发货
                    </div>
                    <div    
                        styleName={type === 'already' ? 'navItemActive' : 'navItem'}
                        onClick={() => this.onChangeTypeHandle('already')} 
                    >
                        已发货
                    </div>
                    <div 
                        styleName={type === 'other' ? 'navItemActive' : 'navItem'}
                        onClick={() => this.onChangeTypeHandle('other')} 
                    >
                        缺货
                    </div>
                </div>
            </div>
        );
    }
}

const OrderHoc = CSSModules(Order, styles);

const mapStateToProps = (state: Stores) => ({
    getOrders   : getOrders(state),
    getUserdata : getUserdata(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>) => ({
    loadOrders              : bindActionCreators(loadOrders, dispatch),
    loadWaitOrders          : bindActionCreators(loadWaitOrders, dispatch),
    loadWaitConfirmOrders   : bindActionCreators(loadWaitConfirmOrders, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(OrderHoc);