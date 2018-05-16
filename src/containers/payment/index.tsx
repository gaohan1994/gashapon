import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
// import * as Numeral from 'numeral';
import history from '../../history';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { loadUserDataFromUuid } from '../../actions/home';
import { getUserdata } from '../../reducers/home';
import { Userdata, Address } from '../../types/user';
import { Gashapon, orderAddressConfig } from '../../types/componentTypes';
import { 
    getSelectedAddress, 
    getSelectedGashapons,
} from '../../reducers/business';
import {
    BusinessActions,
    setSelectedAddress,
} from '../../actions/business';
import { 
    StatusActions,
    setOrderAddressConfig,
} from '../../actions/status';
import GashaponItem from '../../components/gashapon_row_item_v1';
import AddressItem from '../../components/address_row_item';
import Header from '../../components/haeder_set';
import User from '../../classes/user';
import Business from '../../classes/business';
import * as numeral from 'numeral';
// import Schema from '../../classes/schema';

interface Props {
    getUserdata             : Userdata;
    loadUserDataFromUuid    : () => void;
    getSelectedAddress      ?: Address;
    getSelectedGashapons    ?: Gashapon[];
    setOrderAddressConfig   : (config: orderAddressConfig) => void;
    setSelectedAddress      : (address: Address) => void;
}

interface State {
    payway          : number;
    showAddressModal: boolean;
}

class Profit extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            payway: 1,
            showAddressModal: false
        };
    }

    componentDidMount() {
        const { loadUserDataFromUuid } = this.props;
        loadUserDataFromUuid();
    }

    public onBackHandle = (): void => {
        history.goBack();
    }

    public onChangePayWayHandle = (param: number): void => {
        console.log('param', param);
        this.setState({
            payway: param
        });
    }

    public onShowAddressModal = (): void => {
        this.setState({
            showAddressModal: true
        });
    }

    public onHideAddressModal = (): void => {
        this.setState({
            showAddressModal: false
        });
    }

    /* 点击默认地址弹出 */
    public onAddressClickHandle = (): void => {
        /* 
        第一步弹出选择地址的模态框
        如果选择了则关闭模态框，
        如果没有选择 那么 跳转到address同事setOrderconfig等设置完address在跳回来
        */
        this.onShowAddressModal();
        // console.log(setOrderAddressConfig);
    }

    /* 
    模态框中点击地址触发函数
    把点击的地址设置到redux中
    */
    public onAddressChangeHandle = (data: Address) => {
        const { setSelectedAddress } = this.props;
        if (!data._id) {
            alert('请选择正确的地址~');
        } else {
            setSelectedAddress(data);
            this.onHideAddressModal();
        }
    }

    /* 模态中的地址都不选择，点击新增地址跳转到address 设置config */
    public onOtherAddressHandle = (): void => {
        const { setOrderAddressConfig } = this.props;
        const config = {
            path: 'payment'
        };
        setOrderAddressConfig(config);
        history.push('address');
    }

    public doOrderHandle = async (): Promise <void> => {
        const { getSelectedAddress, getSelectedGashapons } = this.props;

        if (!getSelectedGashapons || getSelectedGashapons.length <= 0) {
            alert('请选择扭蛋');
            return;
        }

        if (!getSelectedAddress) {
            alert('请选择地址');
            return;
        }

        User.setUser({
            address : getSelectedAddress.detail_area 
                    + ' ' 
                    + getSelectedAddress.detail_home,
            receiver: getSelectedAddress.receiver,
            phone   : getSelectedAddress.phone
        });

        const user = User.getUser();

        if (!user.uid) {
            alert('请先登录');
            history.goBack();
        }

        const result = await Business.doOrderMethod(user, getSelectedGashapons); 
        if (result.success === true) {

            history.push('/success');
        } else {
            
            console.log(`${result.type}--${result.message}`);
            switch (result.message) {
                case 'address':
                    history.push('/address');
                    return;
                default: 
                    return;
            }
        }
    }

    render (): JSX.Element {
        return (
            <div styleName="container">
                <div 
                    styleName="header"
                    bgimg-center="100"
                >
                    <div 
                        styleName="back"
                        onClick={() => this.onBackHandle()}
                    >
                        <i 
                            styleName="backicon" 
                            bgimg-center="100"
                        />
                        <span styleName="backtext">确认订单</span>
                    </div>

                    {this.renderDefaultAddress()}
                </div>
            
                {this.renderContent()}

                {this.renderPayway()}

                {this.renderFooter()}
                
                {this.renderAddressModal()}
            </div>
        );
    }

    private renderDefaultAddress = (): JSX.Element | string => {

        const { getSelectedAddress } = this.props;

        if (!getSelectedAddress) {
            return (
                <div>设置收货地址</div>
            );
        } else {
            return (
                <div 
                    styleName="address"
                    onClick={() => this.onAddressClickHandle()}
                >
                    <i 
                        styleName="location"
                        bgimg-center="100"
                    />
                    <i 
                        styleName="more"
                        bgimg-center="100"
                    />
                    <div styleName="box">
                        <span font-s="30">收货人：{getSelectedAddress.receiver}</span>
                        <span font-s="30">{getSelectedAddress.phone}</span>
                    </div>
                    <div styleName="box">
                        <span font-s="24">收货地址：{getSelectedAddress.detail_area + ` ` + getSelectedAddress.detail_home}</span>
                    </div>
                </div>
            );
        }
    }

    private renderContent = (): JSX.Element => {

        const { getSelectedGashapons} = this.props;
        return (
            <div styleName="content">
                <span font-s="24" styleName="tips">温馨提示：单笔订单满9件玩具包邮哟~</span>
                {getSelectedGashapons && getSelectedGashapons.length > 0
                ? getSelectedGashapons.map((item: Gashapon, i: number) => (
                    <GashaponItem gashapon={item} key={i}/>
                ))
                : ''}
            </div>
        );
    }

    private renderPayway = (): JSX.Element => {

        const { payway } = this.state;
        return (
            <div styleName="ways">
                <span font-s="30" styleName="paytext">选择支付方式</span>
               
                <div 
                    styleName="way"
                    flex-center="all-center"
                    onClick={() => this.onChangePayWayHandle(1)}
                >
                    <i 
                        styleName="wayicon" 
                        bgimg-center="100"
                        style={{backgroundImage: `url(http://net.huanmusic.com/gasha/%E4%BD%99%E9%A2%9D.png)`}}
                    />
                    <div styleName="waycontent" >
                        <span font-s="30" style={{color: payway === 1 ? '#fea270' : '#444444'}}>使用余额支付</span>
                        <span font-s="24" style={{color: payway === 1 ? '#fea270' : '#444444'}}>使用余额</span>
                    </div>
                    <i 
                        styleName="waystatus" 
                        bgimg-center="100"
                        style={{
                            background: payway === 1 ? '#f27a7a' : '#ffffff'
                        }}
                    />
                </div>
                
                <div 
                    styleName="way"
                    flex-center="all-center"
                    onClick={() => this.onChangePayWayHandle(2)}
                >
                    <i 
                        styleName="wayicon" 
                        bgimg-center="100"
                        style={{backgroundImage: `url(http://net.huanmusic.com/gasha/%E5%8C%85%E9%82%AE%E5%88%B8.png)`}}
                    />
                    <div styleName="waycontent" >
                        <span font-s="30" style={{color: payway === 2 ? '#fea270' : '#444444'}}>使用包邮券</span>
                        <span font-s="24" style={{color: payway === 2 ? '#fea270' : '#444444'}}>剩余0张</span>
                    </div>
                    <i 
                        styleName="waystatus" 
                        bgimg-center="100"
                        style={{
                            background: payway === 2 ? '#f27a7a' : '#ffffff'
                        }}
                    />
                </div>
            </div>
        );
    }

    private renderFooter = (): JSX.Element => {

        const { getSelectedGashapons } = this.props;
        let money: number = 0;

        if (getSelectedGashapons) {
            getSelectedGashapons.map((item: Gashapon, i: number) => {
                if (typeof item.price === 'number') {
                    money += item.price;
                } else {
                    console.log(`第${i}个扭蛋价格有问题`);
                }
            });
        }

        return (
            <div styleName="footer">
                <div styleName="detail">
                    <span font-s="30" styleName="count">
                        共
                        {getSelectedGashapons && getSelectedGashapons.length ? getSelectedGashapons.length : 1}
                        件
                    </span>
                    <span style={{marginLeft: '40px'}}>
                        <span font-s="30" >运费：</span>
                        <span font-s="30" styleName="money">
                            {/* ￥{numeral(money / 100).format('0.00')} */}
                            {getSelectedGashapons && getSelectedGashapons.length 
                            ? getSelectedGashapons.length >= 9
                                ? '￥0.00'
                                : '￥10.00'
                            : ''}
                            
                        </span>
                    </span>
                </div>
                <div 
                    styleName="button"
                    bgimg-center="100"
                    onClick={() => this.doOrderHandle()}
                />
            </div>
        );
    }

    private renderAddressModal = (): JSX.Element => {
        const { showAddressModal } = this.state;
        const { getUserdata } = this.props;
        return (
            <div 
                styleName="addressModal"
                style={{
                    bottom      : showAddressModal === true ? '0' : '-100vh',
                    opacity     : showAddressModal === true ? 1 : 0,
                    visibility  : showAddressModal === true ? 'visible' : 'hidden'
                }}
            >   
                <Header 
                    title="选择地址"
                    propsClick={this.onHideAddressModal}
                    subTitle="新增地址"
                    subPropsClick={this.onOtherAddressHandle}
                />

                {getUserdata.address && getUserdata.address.map((item: Address, i: number) => (
                    <AddressItem 
                        data={item} 
                        key={i} 
                        propsClickHandle={this.onAddressChangeHandle}
                    />
                ))}
            </div>
        );
    }
}

const ProfitHoc = CSSModules(Profit, styles);

const mapStateToProps = (state: Stores) => ({
    getUserdata         : getUserdata(state),
    getSelectedAddress  : getSelectedAddress(state),
    getSelectedGashapons: getSelectedGashapons(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions | StatusActions>) => ({
    loadUserDataFromUuid    : bindActionCreators(loadUserDataFromUuid, dispatch),
    setSelectedAddress      : bindActionCreators(setSelectedAddress, dispatch),
    setOrderAddressConfig   : bindActionCreators(setOrderAddressConfig, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProfitHoc);