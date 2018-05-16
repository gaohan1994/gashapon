import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Header from '../../components/haeder_set';
import ProductItem, { Footer } from '../../components/product_item';
import { Stores } from '../../reducers/type';
import { BusinessActions } from '../../actions/business';
import { /*Gashapon*/ Order as OrderType } from '../../types/componentTypes';
import { 
    loadOrders,
    loadWaitOrders,
    loadWaitConfirmOrders,
} from '../../actions/business';
import { getOrders } from '../../reducers/business';
import { getUserdata } from '../../reducers/home';
import { Userdata } from '../../types/user';
import Business from '../../classes/business';
import User from '../../classes/user';
import history from '../../history';
import Modal from '../../components/modal';

interface Props {
    match: {
        params: {
            type: string;
        }
    };
    getOrders               : OrderType[];
    loadOrders              : (userId: string) => void;
    loadWaitOrders          : (userId: string) => void;
    loadWaitConfirmOrders   : (userId: string) => void;
    getUserdata             : Userdata;
}

interface State {
    type: string;
    
    showReminderModal: boolean;
}

class Order extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            type                : '',
            showReminderModal   : false,
        };
    }

    public onCancelOrderHandle = async (id: string): Promise <void> => {
        const user = User.getUser();

        if (!user.uid) {
            alert('请先登录');
            history.push('/my');
        } else {
            const result = await Business.doCancelOrderMethod({id: id});
            if (result.success === true) {
                console.log('取消订单成功');
                history.push('/');
            } else {
                alert(result.message ? result.result : '取消订单失败');
            }
        }
    }

    public onConfirmOrderHandle = async (id: string): Promise <void> => {
        //
        const user = User.getUser();

        if (!user.uid) {
            alert('请先登录');
            history.push('/my');
        } else {
            const result = await Business.doConfirmOrderHandle({id: id});
            if (result.success === true) {
                console.log('确认订单成功');
                history.push('/');
            } else {
                alert(result.message ? result.result : '确认订单失败');
            }
        }
    }

    public doReminderHandle = (): void => {
        this.onShowReminderModal();
    }

    public onShowReminderModal = (): void => {
        this.setState({
            showReminderModal: true
        });
    }

    public onHideReminderModal = (): void => {
        this.setState({
            showReminderModal: false
        });
    }

    public gotoLocationHandle = (id?: string): void => {
        if (!id) {
            alert('暂时没有快递信息');
        } else {
            history.push(`/location/${id}`);
        }
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
        const { showReminderModal } = this.state;
        const { getOrders } = this.props;
        return (
            <div styleName="container">
                <Modal 
                    display={showReminderModal}
                    value="催单成功~请耐心等待"
                    onCancelClickHandle={this.onHideReminderModal}
                    onConfirmClickHandle={this.onHideReminderModal}
                />
                <Header title="我的订单"/>
                {this.renderNav()}

                {getOrders.length > 0
                ? getOrders.map((item: OrderType, i: number) => {

                    let footer: Footer = this.getFooter(item);

                    return (
                        <ProductItem
                            key={i}
                            data={item.product_list}
                            footer={footer}
                        />
                    );
                })
                : 'empty'}
            </div>
        );
    }

    private getFooter = (item: OrderType): Footer => {

        const { type } = this.state;

        let footer: Footer;

        if (type === 'waitconfirm') {
            footer = {
                show: true,
                buttons: [
                    {
                        value: '付款',
                        clickHandle: () => {/**/}
                    },
                    {
                        value: '取消订单',
                        clickHandle: () => this.onCancelOrderHandle(item._id)
                    }
                ]
            };
            return footer;
        } else if (type === 'wait') {
            footer = {
                show: true,
                buttons: [
                    {
                        value: '我要催单',
                        clickHandle: () => this.doReminderHandle()
                    }
                ]
            };
            return footer;
        } else if (type === 'already') {
            footer = {
                show: true,
                buttons: [
                    {
                        value: '确认收货',
                        clickHandle: () => this.onConfirmOrderHandle(item._id)
                    },
                    // {
                    //     value: '买家秀',
                    //     clickHandle: () => {/**/}
                    // }
                    {
                        value: '查看物流',
                        clickHandle: () => this.gotoLocationHandle(item.tracking_number),
                    }
                ]
            };
            return footer;
        } else {
            footer = {
                show: false
            };
            return footer;
        }
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