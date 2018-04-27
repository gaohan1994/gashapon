import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Header from '../../components/haeder_set';
import ProductItem from '../../components/product_item';
import User from '../../classes/user';
// import history from '../../history';
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
        const { loadOrders, match } = this.props;

        const u = new User({});
        const user = u.getUser();

        if (!!match.params && !!match.params.type) {
            
            const type = match.params.type;
            switch (type) {
                case 'waitconfirm':
                    this.onChangeTypeStateHandle(type);
                    loadWaitConfirmOrders(user.userId);
                    return;
                case 'wait':
                    this.onChangeTypeStateHandle(type);
                    loadWaitOrders(user.userId);
                    return;
                case 'already':
                    this.onChangeTypeStateHandle(type);
                    loadOrders(user.userId);
                    return;
                default: return;
            }
        } else {

            loadOrders(user.userId);
        }
    }

    public onChangeTypeHandle = (type: string): void => {
        const { 
            loadOrders,
            loadWaitConfirmOrders,
            loadWaitOrders,
        } = this.props;
        const u = new User({});
        const user = u.getUser();
        switch (type) {
            case 'waitconfirm':
                this.onChangeTypeStateHandle(type);
                loadWaitConfirmOrders(user.userId);
                return;
            case 'wait':
                this.onChangeTypeStateHandle(type);
                loadWaitOrders(user.userId);
                return;
            case 'already':
                this.onChangeTypeStateHandle(type);
                loadOrders(user.userId);
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
            <div>
                <div onClick={() => this.onChangeTypeHandle('waitconfirm')} style={{color: type === 'waitconfirm' ? '#f27a7a' : '#000000'}}>待确认</div>
                <div onClick={() => this.onChangeTypeHandle('wait')} style={{color: type === 'wait' ? '#f27a7a' : '#000000'}}>待发货</div>
                <div onClick={() => this.onChangeTypeHandle('already')} style={{color: type === 'already' ? '#f27a7a' : '#000000'}}>已发货</div>
                <div onClick={() => this.onChangeTypeHandle('other')} style={{color: type === 'other' ? '#f27a7a' : '#000000'}}>缺货</div>
            </div>
        );
    }
}

const OrderHoc = CSSModules(Order, styles);

const mapStateToProps = (state: Stores) => ({
    getOrders: getOrders(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>) => ({
    loadOrders              : bindActionCreators(loadOrders, dispatch),
    loadWaitOrders          : bindActionCreators(loadWaitOrders, dispatch),
    loadWaitConfirmOrders   : bindActionCreators(loadWaitConfirmOrders, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(OrderHoc);