import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
// import * as Numeral from 'numeral';
import history from '../../history';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { BusinessActions } from '../../actions/business';
import { loadUserDataFromUuid } from '../../actions/home';
import { getUserdata } from '../../reducers/home';
import { Userdata, Address } from '../../types/user';
import { Gashapon } from '../../types/componentTypes';
import { getSelectedAddress, getSelectedGashapons } from '../../reducers/business';
import GashaponItem from '../../components/gashapon_row_item_v1';
import User from '../../classes/user';
import Business from '../../classes/business';

interface Props {
    getUserdata         : Userdata;
    loadUserDataFromUuid: () => void;
    getSelectedAddress  ?: Address;
    getSelectedGashapons?: Gashapon[];
}

interface State {
    payway: number;
}

class Profit extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            payway: 1
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
                <div styleName="address">
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
        return (
            <div styleName="footer">
                <div styleName="detail">
                    <span font-s="30" styleName="count">共1件</span>
                    <span style={{marginLeft: '40px'}}>
                        <span font-s="30" >运费：</span>
                        <span font-s="30" styleName="money">￥30</span>
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
}

const ProfitHoc = CSSModules(Profit, styles);

const mapStateToProps = (state: Stores) => ({
    getUserdata         : getUserdata(state),
    getSelectedAddress  : getSelectedAddress(state),
    getSelectedGashapons: getSelectedGashapons(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>) => ({
    loadUserDataFromUuid: bindActionCreators(loadUserDataFromUuid, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProfitHoc);