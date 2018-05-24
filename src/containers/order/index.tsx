import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Header from '../../components/haeder_set';
import /*ProductItem*/ { Footer } from '../../components/product_item';
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
import OrderItem from '../../components/order_item';

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
    
    reminderValue       : string;
    showReminderModal   : boolean;

    showModal: boolean;
    modalValue: string;

    showConfirmModal: boolean;
    confirmValue: string;
    confirmId: string;
}

class Order extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            type                : '',
            reminderValue       : '',
            showReminderModal   : false,
            showModal           : false,
            modalValue          : '',
            showConfirmModal    : false,
            confirmValue        : '',
            confirmId           : '',
        };

        this.onCancelOrderHandle = this.onCancelOrderHandle.bind(this);
        this.onConfirmOrderHandle = this.onConfirmOrderHandle.bind(this);
        this.doReminderHandle = this.doReminderHandle.bind(this);
        this.onShowReminderModal = this.onShowReminderModal.bind(this);
        this.onHideReminderModal = this.onHideReminderModal.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.gotoLocationHandle = this.gotoLocationHandle.bind(this);
        this.onChangeTypeHandle = this.onChangeTypeHandle.bind(this);
        this.onChangeTypeStateHandle = this.onChangeTypeStateHandle.bind(this);
        this.renderErrorModal = this.renderErrorModal.bind(this);
        this.renderNav = this.renderNav.bind(this);
        this.renderNoData = this.renderNoData.bind(this);
        this.getFooter = this.getFooter.bind(this);
        this.onShowConfirmModal = this.onShowConfirmModal.bind(this);
        this.onHideConfirmModal = this.onHideConfirmModal.bind(this); 
        this.renderConfirmModal = this.renderConfirmModal.bind(this);
    }

    public onCancelOrderHandle = async (id: string): Promise <void> => {
        const user = User.getUser();

        if (!user.uid) {
            history.push('/my');
        } else {
            const result = await Business.doCancelOrderMethod({id: id});
            if (result.success === true) {
                history.push('/');
            } else {
                this.setState({
                    modalValue: result.message ? result.result : '取消订单失败'
                });
                this.onShowModal();
            }
        }
    }

    public onConfirmOrderHandle = async (id: string): Promise <void> => {

        const user = User.getUser();
        const { match, loadWaitConfirmOrders, loadWaitOrders, loadOrders } = this.props;
        if (!user.uid) {
            history.push('/my');
        } else {
            const result = await Business.doConfirmOrderHandle({id: id});
            if (result.success === true) {

                this.onHideConfirmModal();
                const type = match.params.type;
                console.log('type', type);
                switch (type) {
                    
                    case 'waitconfirm':
                        loadWaitConfirmOrders(user.uid);
                        return;
                    case 'wait':
                        loadWaitOrders(user.uid);
                        return;
                    case 'already':
                        loadOrders(user.uid);
                        return;
                    default: return;
                }
            } else {

                this.setState({
                    modalValue: result.message ? result.result : '确认订单失败'
                });
                this.onShowModal();
            }
        }
    }

    public doReminderHandle = async (id: string): Promise <void> => {
        const user = User.getUser();
        if (!user.uid) {
            /* no sign in */
        } else {
            console.log(user);
            const result = await Business.doPressOrderHandle({uid: user.uid, id: id});

            if (result.success === true) {
                this.setState({reminderValue: result.result}, () => { this.onShowReminderModal(); });
            } else {
                this.setState({reminderValue: result.message ? result.message : '请稍后重试'}, () => { this.onShowReminderModal(); });
            }
        }
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

    public onShowModal = (): void => {
        this.setState({
            showModal: true
        });
    }

    public onHideModal = (): void => {
        this.setState({
            showModal: false
        });
    }

    public onShowConfirmModal = (id: string): void => {
        this.setState({
            showConfirmModal: true,
            confirmId       : id
        });
    }

    public onHideConfirmModal = (): void => {
        this.setState({
            showConfirmModal: false
        });
    }

    public gotoLocationHandle = (id: string, comid: string): void => {
        
        if (!!id && !!comid) {
            history.push(`/location/${id}/${comid}`);
        } else {
            this.setState({
                modalValue: '暂时没有快递信息'
            });
            this.onShowModal();
        }
    }

    componentDidMount() {
        const { 
            loadOrders, 
            loadWaitOrders,
            loadWaitConfirmOrders,
            match,
        } = this.props;

        const user = User.getUser();

        if (!!match.params && !!match.params.type) {
            
            const type = match.params.type;
            switch (type) {
                
                case 'waitconfirm':
                    this.onChangeTypeStateHandle(type);
                    loadWaitConfirmOrders(user.uid);
                    return;
                case 'wait':
                    this.onChangeTypeStateHandle(type);
                    loadWaitOrders(user.uid);
                    return;
                case 'already':
                    this.onChangeTypeStateHandle(type);
                    loadOrders(user.uid);
                    return;
                default: return;
            }
        } else {

            loadOrders(user.uid);
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

    public onChangeTypeStateHandle = (type: string): void => {
        if (!type) {
            return;
        } else {
            this.setState({
                type: type
            });
        }
    }

    render () {
        const { showReminderModal, reminderValue } = this.state;
        const { getOrders } = this.props;
        return (
            <div styleName="container" bg-white="true">
                {this.renderErrorModal()}
                {this.renderConfirmModal()}
                <Modal 
                    display={showReminderModal}
                    value={reminderValue}
                    onCancelClickHandle={this.onHideReminderModal}
                    onConfirmClickHandle={this.onHideReminderModal}
                />
                <Header title="我的订单"/>
                {this.renderNav()}

                {getOrders.length > 0
                ? getOrders.map((item: OrderType, i: number) => {

                    let footer: Footer = this.getFooter(item);

                    return (
                        <OrderItem
                            key={i}
                            data={item}
                            footer={footer}
                        />
                    );
                })
                : this.renderNoData()}
            </div>
        );
    }

    private readonly renderErrorModal = (): JSX.Element => {
        
        const { showModal, modalValue } = this.state;
        return (
            <Modal
                display={showModal}
                value={modalValue}
                onConfirmClickHandle={this.onHideModal}
            />
        );
    }

    private readonly renderConfirmModal = (): JSX.Element => {
        
        const { showConfirmModal, confirmId } = this.state;
        return (
            <Modal
                display={showConfirmModal}
                value="是否确认已收到商品？"
                onCancelClickHandle={this.onHideConfirmModal}
                onConfirmClickHandle={() => this.onConfirmOrderHandle(confirmId)}
            />
        );
    }

    private readonly getFooter = (item: OrderType): Footer => {

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
                        clickHandle: () => this.doReminderHandle(item._id)
                    }
                ]
            };
            return footer;
        } else if (type === 'already') {
            footer = item.order_status === 2
            ? {
                show: true,
                buttons: [
                    {
                        value: '确认收货',
                        clickHandle: () => this.onShowConfirmModal(item._id)
                    },
                    {
                        value: '查看物流',
                        clickHandle: () => this.gotoLocationHandle(item.tracking_number, item.express),
                    }
                ]
            }
            : {
                show: true,
                buttons: [
                    // {
                    //     value: '买家秀',
                    //     clickHandle: () => {/**/}
                    // }
                    {
                        value: '查看物流',
                        clickHandle: () => this.gotoLocationHandle(item.tracking_number, item.express),
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

    private readonly renderNav = (): JSX.Element => {
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

    private readonly renderNoData = (): JSX.Element => {
        return (
            <div 
                styleName="nodata"
                font-s="30"
            >
                暂无数据
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