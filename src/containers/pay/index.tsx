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
import Qart from 'react-qart';
import Modal from '../../components/modal';
import { inApp } from '../../config/util';
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
}

class Pay extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showQrcode  : false,
            qrcodeUrl   : '',

            showModal   : false,
            modalValue  : ''
        };
    }

    public onClickHandle = async (): Promise<void> => {
        const { value } = this.state;
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
                    app     : inApp
                });
                
                if (recharge.success === true) {

                    if (inApp === true) {
                        const config: SchemaConfig = {
                            protocal: 'dgacha',
                            schema  : `pay/${recharge.result},${value},${user.uid}`
                        };

                        const schema = new Schema(config);
                        schema.loadSchema();
                    } else {
                        console.log(recharge);
                        this.setState({qrcodeUrl: recharge.result}, () => { this.showQrcodeHandle(); });
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

    public doNavHandle = (index: string) => {
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

    render() {
        const { 
            showQrcode, 
            qrcodeUrl,
            showModal,
            modalValue
        } = this.state;
        const { getUserdata } = this.props;
        
        return (
            <div styleName="container">
                <Modal
                    display={showModal}
                    value={modalValue}
                    onCancelClickHandle={this.onHideModal}
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
                    <Qart
                        value={qrcodeUrl}
                        imagePath="http://net.huanmusic.com/gasha/%E7%BA%A2%E5%8C%851.png"
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
                
                <div 
                    styleName="content"
                >
                    <div styleName="contentItem">
                        <span styleName="rechargeTitle">充值金额</span>
                    </div>
                    <div styleName="contentItem">{this.renderInput()}</div>
                    <div styleName="contentItem">
                        <span styleName="remain">
                        当前剩余余额{getUserdata && getUserdata.remain
                            ? Numeral(getUserdata.remain / 100).format('0.00')
                            : '0.00'}元
                        </span>
                    </div>
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