import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../../components/haeder_set';
import Button from '../../../components/button';
import Validator from '../../../classes/validate';
import Sign, { DoForgetPasswordMethodParam } from '../../../classes/sign';
import history from '../../../history';
import { NormalReturnObject } from '../../../classes/base';
import Modal from '../../../components/modal';

export interface Props {
    
}

export interface State {
    phone       : string;
    vercode     : string;
    password    : string;
    waitCode    : number;

    showModal   : boolean;
    modalValue  : string;
}

class Forget extends React.Component<Props, State> {

    private timer: any;

    constructor (props: Props) {
        super(props);
        this.state = {
            phone   : '',
            vercode : '',
            password: '',
            waitCode: 0,
            showModal: false,
            modalValue: ''
        };
    }

    componentWillUnmount (): void {

        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    public onChangePhoneHandle = (e: any): void => {
        this.setState({
            phone: e.target.value
        });
    }

    public onChangeVercodeHandle = (e: any): void => {
        this.setState({
            vercode: e.target.value
        });
    }

    public onChangePasswordHandle = (e: any): void => {
        this.setState({
            password: e.target.value
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

    public timerHandle = (): void => {

        if (this.state.waitCode === 0) {
            /* 可以重新计时 */
            clearInterval(this.timer);
        } else {
            this.setState({
                waitCode: this.state.waitCode - 1,
            });
        }
    }

    public doForgetPasswordHandle = async (): Promise <void> => {

        const { vercode, phone, password } = this.state;

        let helper = new Validator();

        helper.add(phone, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入手机号~',
            elementName: 'phone'
        }]);

        helper.add(password, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入密码~',
            elementName: 'password'
        }]);

        helper.add(vercode, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入验证码~',
            elementName: 'vercode'
        }]);

        let valiResult = helper.start();

        if (valiResult) {
            
            this.setState({
                modalValue: valiResult.errMsg
            });
            this.onShowModal();
        } else {

            const data: DoForgetPasswordMethodParam = {
                code    : vercode,
                phone   : phone,
                password: password
            };
            
            const result: NormalReturnObject = await Sign.doForgetPasswordMethod(data);

            if (result.success === true) {

                history.push('/my');
            } else {
                /* do error stuff */
                this.setState({
                    modalValue: result.message ? result.message : '错误'
                });
                this.onShowModal();
            }
        }
    }
    
    public onSendVercodeHandle = async (): Promise <void> => {
        const {
            phone,
            password,
        } = this.state;

        let helper = new Validator();

        helper.add(phone, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入手机号~',
            elementName: 'phone'
        }]);

        helper.add(password, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入密码~',
            elementName: 'password'
        }]);

        let result = helper.start();

        if (result) {
            this.setState({
                modalValue: result.errMsg
            });
            this.onShowModal();
        } else {
            /* do stuff */
            const result = await Sign.getChangePwdVercode(phone);

            if (result.success === true) {
                this.setState({ waitCode: 60 }, () => { this.timer = setInterval(this.timerHandle, 1000); });
            } else {
                this.setState({
                    modalValue: result.message ? result.message : '获取验证码出错'
                });
                this.onShowModal();
            }
        }
    }

    render() {

        const { phone, vercode, password, waitCode } = this.state;

        return (
            <div 
                styleName="container"
                container-with-header="true"
            >
                <Header title="忘记密码"/>
                {this.renderErrorModal()}
                <div styleName="box">
                    <div styleName="border">
                        <span>手机号</span>
                        <input 
                            styleName="phone"
                            value={phone}
                            onChange={this.onChangePhoneHandle}
                            placeholder="请输入手机号码"
                        />
                    </div>
                    <div styleName="border">
                        <span>新密码</span>
                        <input 
                            styleName="phone"
                            type="password"
                            value={password}
                            onChange={this.onChangePasswordHandle}
                            placeholder="请输入新密码"
                        />
                    </div>
                    <div styleName="border">
                        <span>验证码</span>
                        <input
                            styleName="vercode"
                            value={vercode}
                            onChange={this.onChangeVercodeHandle}
                            placeholder="请输入验证码"
                        />
                        {waitCode === 0
                        ? <Button 
                            btnText="发送验证码"
                            btnSize="small"
                            btnRadius={true}
                            clickHandle={this.onSendVercodeHandle}
                        />
                        : <Button 
                            btnText={`重新获取(${waitCode - 1})`}
                            btnSize="small"
                            btnRadius={true}
                        />}
                    </div>
                </div>

                <div 
                    styleName="btnBox"
                    flex-center="all-center"
                >
                    <Button 
                        btnText="确认"
                        btnSize="big"
                        btnRadius={true}
                        clickHandle={this.doForgetPasswordHandle}
                    />
                </div>
            </div>
        );
    }

    private renderErrorModal = (): JSX.Element => {
        const { showModal, modalValue } = this.state;
        return (
            <Modal
                display={showModal}
                value={modalValue}
                onConfirmClickHandle={this.onHideModal}
            />
        );
    }
}

const ForgetHoc = CSSModules(Forget, styles);

export default ForgetHoc;