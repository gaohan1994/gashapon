import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import { Stores } from '../../reducers/type';
import Button from '../../components/button';
import Sign,
{
    Register
} from '../../classes/sign';
import { NormalReturnObject } from '../../classes/base';
import Validator from '../../classes/validate';
import { DoLoginMethodReturn } from '../../classes/sign';
import { hideSignModal, } from '../../actions/status';
import { getSignModalStatus } from '../../reducers/status';
import history from '../../history';
import Modal from '../../components/modal';

export interface Props {
    display         ?: boolean;
    refereeid       ?: string;
    hideSignModal   ?: () => void;
}

export interface State {
    showType: 'login' | 'register';

    logphone: string;
    logpwd  : string;

    regphone: string;
    regpwd  : string;
    regcode : string;
    waitCode: number;

    showModal: boolean;
    modalValue: string;

    showVercodeModal: boolean;
}

interface InputParam {
    value           : string;
    type            ?: string;
    style           ?: string;
    placeholder     : string;
    onChangeHandle  : (event: any) => void;
}

class SignContainer extends React.Component<Props, State> {

    private timer: any;

    constructor (props: Props) {
        super(props);
        this.state = {
            showType: 'login',
            logphone: '',
            logpwd  : '',
            regphone: '',
            regpwd  : '',
            regcode : '',
            waitCode: 0,
            showModal: false,
            modalValue: '',
            showVercodeModal: false
        };

        this.timerHandle = this.timerHandle.bind(this);
        this.onChangeLogphone = this.onChangeLogphone.bind(this);
        this.onChangeLogpwd = this.onChangeLogpwd.bind(this);
        this.onChangeRegphone = this.onChangeRegphone.bind(this);
        this.onChangeRegpwd = this.onChangeRegpwd.bind(this);
        this.onChangeRegcode = this.onChangeRegcode.bind(this);
        this.onButtonClickHandle = this.onButtonClickHandle.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.doRegisterHandle = this.doRegisterHandle.bind(this);
        this.doLoginHandle = this.doLoginHandle.bind(this);
        this.doGetVercodeHandle = this.doGetVercodeHandle.bind(this);
        this.onForgetPasswordHandle = this.onForgetPasswordHandle.bind(this);
        this.renderErrorModal = this.renderErrorModal.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.renderVercodeErrorModal = this.renderVercodeErrorModal.bind(this);
        this.onHideVercodeErrorModal = this.onHideVercodeErrorModal.bind(this);
        this.onShowVercodeErrorModal = this.onShowVercodeErrorModal.bind(this);
        this.hideAll = this.hideAll.bind(this);
    }

    public onChangeLogphone = (event: any) => {
        this.setState({
            logphone: event.target.value
        });
    }

    public onChangeLogpwd = (event: any) => {
        this.setState({
            logpwd: event.target.value
        });
    }

    public onChangeRegphone = (event: any) => {
        this.setState({
            regphone: event.target.value
        });
    }

    public onChangeRegpwd = (event: any) => {
        this.setState({
            regpwd: event.target.value
        });
    }

    public onChangeRegcode = (event: any) => {
        this.setState({
            regcode: event.target.value
        });
    }

    public onButtonClickHandle = (type: 'login' | 'register') => {
        this.hideAll();
        this.setState({
            showType: type
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

    public onShowVercodeErrorModal = (): void => {
        this.setState({
            showVercodeModal: true
        });
    }

    public onHideVercodeErrorModal = (): void => {
        this.setState({
            showVercodeModal: false
        });
    }

    public hideAll = (): void => {
        this.onHideModal();
        this.onHideVercodeErrorModal();
    }

    public doRegisterHandle = async (): Promise<void> => {

        const { refereeid, hideSignModal } = this.props;
        const { regphone, regpwd, regcode } = this.state;

        /* do check data handle */
        let helper = new Validator();

        helper.add(regphone, [{
            strategy    : 'isNonEmpty',
            errorMsg    : '请输入手机号码~',
            elementName : 'regphone'
        }]);

        helper.add(regpwd, [{
            strategy    : 'isNonEmpty',
            errorMsg    : '请输入密码~',
            elementName : 'regpwd'
        }]);

        helper.add(regcode, [{
            strategy    : 'isNonEmpty',
            errorMsg    : '请输入验证码~',
            elementName : 'regcode'
        }]);

        let valiResult = helper.start();

        if (valiResult) {
            this.setState({
                modalValue: valiResult.errMsg
            });
            this.onShowModal();
            
        } else {
            const name = Math.random().toString(36).substr(2);

            let params: Register = !!refereeid 
            ? {
                name    : name,
                phone   : regphone,
                password: regpwd,
                code    : regcode,
                referee : refereeid,
            } 
            : {
                name    : name,
                phone   : regphone,
                code    : regcode,
                password: regpwd,
            };
            
            const result: NormalReturnObject = await Sign.doRegisterMethod(params);
            if (result.success === true) {

                /* do ok stuff */
                if (hideSignModal) {
                    // hideSignModal();
                    window.location.reload();
                }
            } else {
                
                /* do error stuff */
                this.setState({
                    modalValue: result.message ? result.message : '注册有问题'
                });
                this.onShowModal();
            }
        }
    }

    public doLoginHandle = async (): Promise <void> => {
        
        const {
            logphone,
            logpwd,
        } = this.state;

        let helper = new Validator();

        helper.add(logphone, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入用户名~',
            elementName: 'logphone'
        }]);

        helper.add(logpwd, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入密码~',
            elementName: 'logpwd'
        }]);

        let result = helper.start();

        if (result) {
            this.setState({
                modalValue: result.errMsg
            });
            this.onShowModal();
        } else {

            /* do stuff */
            const res: DoLoginMethodReturn = await Sign.doLoginMethod({
                phone   : logphone, 
                password: logpwd
            });
            
            if (res.success === true) {
                window.location.reload();
            } else {

                /* do error stuff */
                this.setState({
                    modalValue: res.message ? res.message : '登录出错了！'
                });
                this.onShowModal();
            }
        }
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

    public doGetVercodeHandle = async (): Promise <void> => {
        
        const {
            regphone,
            regpwd,
        } = this.state;

        let helper = new Validator();

        helper.add(regphone, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入用户名~',
            elementName: 'regphone'
        }]);

        helper.add(regpwd, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入密码~',
            elementName: 'regpwd'
        }]);

        let result = helper.start();

        if (result) {
            this.setState({
                modalValue: result.errMsg
            });
            this.onShowModal();
        } else {

            /* do stuff */
            const result = await Sign.getVercode(regphone);
            if (result.success === true) {
                this.setState({ waitCode: 60 }, () => { this.timer = setInterval(this.timerHandle, 1000); });
            } else {

                if (result.message === '该用户已存在') {
                    this.onShowVercodeErrorModal();
                } else {
                    this.setState({
                        modalValue: result.message ? result.message : '获取验证码出错'
                    });
                    this.onShowModal();
                }
            }
        }
    }

    public onForgetPasswordHandle = (): void => {
        const { hideSignModal } = this.props;

        if (hideSignModal) {
            hideSignModal();
            history.push('/forget');
        }
    }

    render() {

        const {
            showType,
            logphone,
            logpwd,
            regphone,
            regpwd,
            regcode,
            waitCode,
        } = this.state;

        const { 
            display,
            hideSignModal,
        } = this.props;

        return (
            <section
                styleName="container"
                flex-center="all-center"
                bg-white="true"
                style={{
                    bottom      : display === true ? '0' : '-100vh',
                    opacity     : display === true ? 1 : 0,
                    visibility  : display === true ? 'visible' : 'hidden',
                }}
            >
                {this.renderErrorModal()}
                {this.renderVercodeErrorModal()}
                <i
                    styleName="back"
                    bgimg-center="100"
                    onClick={hideSignModal}
                />
                <div styleName="content">
                    <div styleName="type">
                        <span
                            styleName={showType === 'login'     ? 'buttonActive' : 'buttonNormal'}
                            onClick={() => this.onButtonClickHandle('login')}
                        >
                            登录
                        </span>
                        <span
                            styleName={showType === 'register'  ? 'buttonActive' : 'buttonNormal'}
                            onClick={() => this.onButtonClickHandle('register')}
                        >
                            注册
                        </span>
                    </div>
                    
                    {showType === 'login'
                    ?   <div>
                            <div styleName="item">
                                {this.renderInput({
                                    value           : logphone,
                                    placeholder     : '输入手机号',
                                    onChangeHandle  : this.onChangeLogphone
                                })}
                            </div>
                            <div styleName="item">
                                {this.renderInput({
                                    value           : logpwd,
                                    type            : 'password',
                                    placeholder     : '输入密码',
                                    onChangeHandle  : this.onChangeLogpwd
                                })}
                            </div>
                            <div styleName="box">
                                <Button 
                                    btnText="登录"
                                    btnSize="big"
                                    btnRadius={true}
                                    clickHandle={() => this.doLoginHandle()}
                                />
                            </div>
                            <div styleName="box">
                                <span 
                                    styleName="forget"
                                    onClick={() => this.onForgetPasswordHandle()}
                                >
                                    忘记密码?
                                </span>
                            </div>
                        </div>
                    :   ''}
                    
                    {showType === 'register'
                    ?   <div>
                            <div styleName="item">
                                {this.renderInput({
                                    value           : regphone,
                                    placeholder     : '输入手机号',
                                    onChangeHandle  : this.onChangeRegphone
                                })}
                            </div>
                            <div styleName="item">
                                {this.renderInput({
                                    value           : regpwd,
                                    type            : 'password',
                                    placeholder     : '输入密码',
                                    onChangeHandle  : this.onChangeRegpwd
                                })}
                            </div>
                            <div styleName="item">
                                {this.renderInput({
                                    value           : regcode,
                                    style           : 'vercode',
                                    placeholder     : '输入验证码',
                                    onChangeHandle  : this.onChangeRegcode
                                })}
                                {waitCode === 0
                                ? <div styleName="send" onClick={() => this.doGetVercodeHandle()}>发送验证码</div>
                                : <div styleName="wait">重新获取({waitCode - 1})</div>}
                                
                            </div>
                            <div styleName="box">
                                <Button 
                                    btnText="注册"
                                    btnSize="big"
                                    btnRadius={true}
                                    clickHandle={() => this.doRegisterHandle()}
                                />
                            </div>
                        </div>
                    :   ''}
                    
                </div>
            </section>
        );
    }

    private renderInput = ({value, type, style, placeholder, onChangeHandle}: InputParam): JSX.Element => {

        return (
            <input
                styleName={style ? style : 'input'}
                type={type ? type : 'text'}
                value={value}
                placeholder={placeholder}
                onChange={onChangeHandle}
            />
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

    private renderVercodeErrorModal = (): JSX.Element => {
        const { showVercodeModal } = this.state;
        return (
            <Modal
                display={showVercodeModal}
                value="您的手机号已注册，是否直接登录？"
                onCancelClickHandle={this.onHideVercodeErrorModal}
                onConfirmClickHandle={() => this.onButtonClickHandle('login')}
            />
        );
    }
}

const SignContainerHoc = CSSModules(SignContainer, styles);

export const mapStateToProps = (state: Stores) => ({
    display: getSignModalStatus(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    hideSignModal: bindActionCreators(hideSignModal, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SignContainerHoc);