import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import * as Numeral from 'numeral';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';
import { BusinessActions } from '../../actions/business';
import { Stores } from '../../reducers/type';
import { getUserdata } from '../../reducers/home';
import { Userdata } from '../../types/user';
import history from '../../history';
import Header from '../../components/haeder_set';
import Button from '../../components/button';
import Validator from '../../classes/validate';
import Business from '../../classes/business';
import User from '../../classes/user';
import config from '../../config';
import * as QRcode from 'qrcode.react';
import Modal from '../../components/modal';
import { inApp, isMobile } from '../../config/util';
import Schema, { SchemaConfig } from '../../classes/schema';
import { HomeActions, loadUserDataFromUuid } from '../../actions/home';

interface Props {
    getUserdata         : Userdata;
    loadUserDataFromUuid: () => void;
}

interface State {
    value       ?: number;
    showQrcode  : boolean;
    qrcodeUrl   : string;

    showModal   : boolean;
    modalValue  : string;

    payway      : 1 | 2;
    
}

const Payways: Array<{
    _id: number;
    value: string;
    type: 1 | 2;
    img: string;
}> = [
    {
        _id: 2,
        value: '微信',
        type: 2,
        img: '//net.huanmusic.com/gasha/%E5%BE%AE%E4%BF%A1.png'
    },
    {
        _id: 1,
        value: '支付宝',
        type: 1,
        img: '//net.huanmusic.com/gasha/%E6%94%AF%E4%BB%98%E5%AE%9D.png'
    },
];

class Pay extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showQrcode  : false,
            qrcodeUrl   : '',
            showModal   : false,
            modalValue  : '',
            payway      : 2,
        };
        this.onClickHandle = this.onClickHandle.bind(this);
        this.doNavHandle = this.doNavHandle.bind(this);
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.showQrcodeHandle = this.showQrcodeHandle.bind(this);
        this.hideQrcodeHandle = this.hideQrcodeHandle.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.onChangePayWayHandle = this.onChangePayWayHandle.bind(this);
        this.renderPayway = this.renderPayway.bind(this);
    }

    public onClickHandle = async (): Promise<void> => {
        const { value, payway } = this.state;
        const { getUserdata } = this.props;

        if (!value) {
            this.setState({
                modalValue: '请输入整数金额~'
            });
            this.onShowModal();
        } else {
            const helper = new Validator();

            helper.add(value, [{
                strategy: 'isNumberVali',
                errorMsg: '请输入整数金额~',
                elementName: 'value'
            }]);
            
            const result = helper.start();
    
            if (result) {
                this.setState({
                    modalValue: result.message ? result.message : '请输入正确的金额'
                });
                this.onShowModal();
            } else {

                User.setUser({
                    userId  : getUserdata._id, 
                    name    : getUserdata.name, 
                    headimg : config.empty_pic.url
                });
                const user = User.getUser();
                
                const recharge = await Business.doRechargeMethod({
                    user    : user,
                    value   : value,
                    app     : inApp,
                    type    : payway
                });

                if (recharge.success === true) {

                    if (inApp === true) {

                        /*
                         * APP
                         * 微信schema
                         * 支付宝二维码
                         */
                        if (payway === 2) {

                            const config: SchemaConfig = {
                                protocal: 'dgacha',
                                schema  : `wxpay/${recharge.result},${value},${user.uid}`
                            };
    
                            const schema = new Schema(config);
                            schema.loadSchema();

                        } else {

                            // window.location.href = `${recharge.result}`;
                            const config: SchemaConfig = {
                                protocal: 'dgacha',
                                schema  : process.env.NODE_ENV === 'production'
                                            ? `alipay/${recharge.result},https://gacha.hy233.tv/my`
                                            : `alipay/${recharge.result},https://gacha-dev.hy233.tv/my`
                            };
    
                            const schema = new Schema(config);
                            schema.loadSchema();
                        }
                    } else {
                        
                        /* 
                         * PC 显示二维码
                         * H5
                         * 点微信去下载
                         * 支付宝打开地址二维码
                         */

                        if (isMobile() === true) {

                            if (payway === 2) {
                                window.location.href = `${config.downloadUrl}`;
                            } else {
                                window.location.href = `${recharge.result}`;
                            }
                        } else {
                            
                            this.setState({
                                qrcodeUrl: recharge.result
                            }, () => { 
                                this.showQrcodeHandle(); 
                            });
                        }
                    }
                } else {
                    console.log(`${recharge.type}--${recharge.message}`);
                    this.setState({
                        modalValue: recharge.message ? recharge.message : '充值失败'
                    });
                    this.onShowModal();
                }
            }
        }
    }

    public doNavHandle = (index: string): void => {
        history.push(`/${index}`);
    }

    public onChangeHandle = (e: any): void => {
        this.setState({
            value: e.target.value
        });
    }

    public showQrcodeHandle = (): void => {
        this.setState({
            showQrcode: true
        });
    }

    public hideQrcodeHandle = ():  void => {
        const { loadUserDataFromUuid } = this.props;
        loadUserDataFromUuid();
        history.push('/');
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

    public onChangePayWayHandle = (param: 1 | 2) => {
        this.setState({
            payway: param
        });
    }

    render() {
        
        const { 
            showQrcode, 
            qrcodeUrl,
            showModal,
            modalValue,
        } = this.state;
        const { getUserdata } = this.props;
        
        return (
            <div styleName="container" bg-white="true">
                <Modal
                    display={showModal}
                    value={modalValue}
                    onConfirmClickHandle={this.onHideModal}
                />
                <div 
                    styleName="qrcode"
                    flex-center="all-center"
                    style={{
                        opacity     : showQrcode === true ? 1 : 0,
                        visibility  : showQrcode === true ? 'visible' : 'hidden'
                    }}
                >
                    <QRcode
                        value={qrcodeUrl}
                        size={200}
                    />
                    <div styleName="paybutton">
                        <Button
                            btnText="返回"
                            btnSize="normal"
                            btnRadius={true}
                            clickHandle={() => this.hideQrcodeHandle()}
                        />
                    </div>
                </div>
               
                <Header 
                    title="充值"
                    subTitle="消费记录"
                    subPropsClick={() => this.doNavHandle('record')}
                />
                
                <div styleName="detail">
                    <div styleName="line">
                        <i styleName="lineIcon"/>
                        <span styleName="lineText">充值至嘀哩扭蛋余额</span>
                    </div>
                </div>
                
                <div styleName="content">
                    <div styleName="contentItem">
                        <span styleName="rechargeTitle">充值金额</span>
                    </div>
                    <div styleName="contentItem">{this.renderInput()}</div>
                    <div styleName="contentItem">
                        <span styleName="remain">
                        当前余额为{getUserdata && getUserdata.remain
                            ? Numeral(getUserdata.remain / 100).format('0.00')
                            : '0.00'}元
                        </span>
                    </div>
                    {this.renderPayway()}
                </div>

                <div 
                    styleName="buttonBox"
                    flex-center="all-center"
                >
                    <Button 
                        btnText="充值"
                        btnSize="normal"
                        btnRadius={true}
                        clickHandle={() => this.onClickHandle()}
                        // clickHandle={() => this.showQrcodeHandle()}
                    />
                </div>
            </div>
        );
    }

    private renderPayway = (): JSX.Element => {

        const { payway } = this.state;
        return (
            <div styleName="ways">
                <span font-s="30" styleName="paytext">选择支付方式</span>
               
                {Payways.map(item => {
                    return (
                        <div
                            key={item._id}
                            styleName="way"
                            flex-center="all-center"
                            onClick={() => this.onChangePayWayHandle(item.type)}
                        >
                            <i 
                                styleName="wayicon" 
                                bgimg-center="100"
                                style={{backgroundImage: `url(${item.img})`}}
                            />
                            <div styleName="waycontent" >
                                <span font-s="30" style={{color: payway === item.type ? '#fea270' : '#444444'}}>
                                    使用{item.value}支付
                                    {item.value === '微信' ? `（推荐使用）` : ''}
                                </span>
                                {/* <span font-s="24" style={{color: payway === 1 ? '#fea270' : '#444444'}}>使用余额</span> */}
                            </div>
                            <i 
                                styleName="waystatus" 
                                bgimg-center="100"
                                style={{
                                    background: payway === item.type ? '#f27a7a' : '#ffffff'
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    private renderInput = (): JSX.Element => {
        
        const { value } = this.state;
        
        return (
            <input
                styleName="moneyInput"
                placeholder="￥"
                value={value ? value : ''}
                onChange={this.onChangeHandle}
            />
        );
    }
}

const PayHoc = CSSModules(Pay, styles);

const mapStateToProps = (state: Stores) => ({
    getUserdata: getUserdata(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions | HomeActions>) => ({
    loadUserDataFromUuid: bindActionCreators(loadUserDataFromUuid, dispatch)
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PayHoc);