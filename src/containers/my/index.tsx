import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Footer from '../../components/footer';
import Menu from '../../components/menu_v1';
import history from '../../history';
import Hoc from '../hoc';
import LoginModal from '../../components/modal_login';
import config from '../../config';
import { Userdata } from '../../types/user';
import { Stores } from '../../reducers/type';
import { 
    loadCode,
} from '../../actions/home';
import {
    showLoginModal
} from '../../actions/status';
import { 
    getUserdata
} from '../../reducers/home';
import Sign from '../../classes/sign';

interface Props {
    getUserdata     : Userdata;
    loadUserData    : (userId: string) => void;
    loadCode        : (phone: string) => void;
    showLoginModal  : () => void;
}

interface State {
    current: number;
}

/**
 * @returns 
 * @memberof My
 * 我的页面
 * render:
 */

class My extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    componentDidMount(): void {
        const { 
            // loadCode,
        } = this.props;
        // loadCode('15659995443');
    }

    public onClickHandle = async (param: string): Promise<void> => {
        const { showLoginModal } = this.props;
        const result = await Sign.doCheckAuth();

        if (result.success === true) {

            history.push(`/${param}`);
        } else {
            showLoginModal();
        }
    }

    render(): JSX.Element {
        
        const { } = this.props;
        
        return (
            <div styleName="container">
                <LoginModal/>
                {this.renderProfile()}
                {this.renderMoney()}
                {this.renderUtils()}
                {this.renderMenu()}
                {this.renderSet()}
                {this.renderMyData()}
                <Footer/>
            </div>
        );
    }

    private renderProfile = (): JSX.Element => {
        const { current } = this.state;
        const { getUserdata } = this.props;
        return (
            <div styleName="user">
                <div styleName="gift">
                    <i 
                        styleName="giftIcon"
                        onClick={() => this.onClickHandle('set')}
                    />
                    <span>礼包兑换</span>
                </div>
                <i styleName="recharge" onClick={() => this.onClickHandle('pay')}/>
                <div 
                    bgimg-center="bgimg-center"
                    styleName="cover"
                    style={{
                        backgroundImage: `url(${config.empty_pic.url})`
                    }}
                />
                <div styleName="module">
                    <span styleName="status">
                        {getUserdata._id && getUserdata.name
                        ? getUserdata.name
                        : '未登录'}
                    </span>
                </div>

                <div styleName="vip">
                    <i 
                        styleName="vipIcon"
                        style={{backgroundImage: `url(http://net.huanmusic.com/gasha/vip/v0.png)`}}
                    />
                    <span styleName="progress">
                        {current} / 10
                    </span>
                </div>
            </div>
        );
    }

    private renderMoney = (): JSX.Element => {
        const { getUserdata } = this.props;
        return (
            <div styleName="money">
                <span styleName="moneyText">
                    可提现余额：
                    <span>
                        {typeof getUserdata.remain === 'number'
                        ? (getUserdata.remain / 100)
                        : 0}
                    </span>
                    元
                </span>
                <span styleName="moneyText">提现 ></span>
            </div>
        );
    }

    private renderMenu = (): JSX.Element => {
        const menus = [
            {
                _id: 1,
                value: '收藏',
                img: 'http://net.huanmusic.com/gasha/my/%E6%94%B6%E8%97%8F.png',
                propsClickHandle: () => this.onClickHandle('collect')
            },
            {
                _id: 2,
                value: '砍价',
                param: 'discounthome',
                img: 'http://net.huanmusic.com/gasha/my/%E7%A0%8D%E4%BB%B7.png',
                propsClickHandle: () => this.onClickHandle('discounthome')
            },
            {
                _id: 4,
                param: 'achievements',
                value: '成就',
                img: 'http://net.huanmusic.com/gasha/my/%E6%88%90%E5%B0%B1.png',
                propsClickHandle: () => this.onClickHandle('achievements')
            },
            {
                _id: 5,
                value: '优惠券',
                param: 'coupons',
                img: 'http://net.huanmusic.com/gasha/my/%E4%BC%98%E6%83%A0%E5%88%B8.png',
                propsClickHandle: () => this.onClickHandle('coupons')
            },
        ];
        return (
            <div styleName="menu">
                <Menu 
                    menus={menus}
                    iconWidth="8vw"
                    iconHeight="6.66vw"
                />
            </div>
        );
    }

    private renderUtils = (): JSX.Element => {
        const menus = [
            {
                _id: 1,
                value: '我的订单',
                img: 'http://net.huanmusic.com/gasha/my/%E6%88%91%E7%9A%84%E8%AE%A2%E5%8D%95.png',
                param: 'order/wait',
                propsClickHandle: () => this.onClickHandle('order/wait')
            },
            {
                _id: 2,
                value: '待付款',
                img: 'http://net.huanmusic.com/gasha/my/%E5%BE%85%E4%BB%98%E6%AC%BE.png',
                param: 'order/waitconfirm',
                propsClickHandle: () => this.onClickHandle('order/waitconfirm')
            },
            {
                _id: 3,
                value: '待发货',
                img: 'http://net.huanmusic.com/gasha/my/%E5%BE%85%E5%8F%91%E8%B4%A7.png',
                param: 'order/already',
                propsClickHandle: () => this.onClickHandle('order/already')
            },
            {
                _id: 4,
                value: '待收货',
                img: 'http://net.huanmusic.com/gasha/my/%E5%BE%85%E6%94%B6%E8%B4%A7.png',
                param: '123',
                propsClickHandle: () => this.onClickHandle('123')
            },
        ];
        return (
            <div styleName="utils">
                <Menu 
                    menus={menus}
                    height={160} 
                    iconWidth="6.66vw"
                    iconHeight="5.33vw"
                />
            </div>
        );
    }

    private renderSet = (): JSX.Element => {
        return (
            <div styleName="set">
                <div styleName="setItem">
                    <i
                        styleName="setIcon"
                        style={{
                            backgroundImage: 'url(http://net.huanmusic.com/gasha/my/%E5%9C%B0%E5%9D%80.png)'
                        }}
                    />
                    <span styleName="setText">我的收货地址</span>
                </div>
                <div 
                    styleName="setItem"
                    onClick={() => this.onClickHandle('set')}
                >
                    <i
                        styleName="setIcon"
                        style={{
                            backgroundImage: 'url(http://net.huanmusic.com/gasha/my/%E8%B4%A6%E6%88%B7%E8%AE%BE%E7%BD%AE.png)'
                        }}
                    />
                    <span styleName="setText">账户设置</span>
                </div>
            </div>
        );
    }

    private renderMyData = (): JSX.Element => {
        const menus = [
            {
                _id: 1,
                value: '扭蛋',
                img: '',
                param: '123',
            },
            {
                _id: 2,
                value: '集齐',
                img: '',
            },
            {
                _id: 3,
                value: '弹幕',
                img: '',
            },
            {
                _id: 4,
                value: '砍价',
                img: '',
            },
            {
                _id: 5,
                value: '蛋卷折扣',
                img: '',
            },
        ];
        return (
            <Hoc>
                <div styleName="data">
                    <Menu
                        menus={menus}
                        height={190}
                    />
                </div>
            </Hoc>
        );
    }
}

const MyHoc = CSSModules(My, styles);

export const mapStateToProps = (state: Stores) => ({
    getUserdata: getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    loadCode        : bindActionCreators(loadCode, dispatch),
    showLoginModal  : bindActionCreators(showLoginModal, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MyHoc);