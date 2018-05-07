import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import { Stores } from '../../reducers/type';
import Button from '../../components/button';
import Sign from '../../classes/sign';
import Validator from '../../classes/validate';
import { DoLoginMethodReturn } from '../../classes/sign';
import { 
    hideSignModal,
} from '../../actions/status';
import { 
    getSignModalStatus
} from '../../reducers/status';

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
}

interface InputParam {
    value           : string;
    style           ?: string;
    placeholder     : string;
    onChangeHandle  : (event: any) => void;
}

class Registe extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showType: 'register',

            logphone: '',
            logpwd  : '',

            regphone: '',
            regpwd  : '',
            regcode : '',
        };
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
        this.setState({
            showType: type
        });
    }

    public doRegisterHandle = async (): Promise<void> => {

        const { refereeid } = this.props;
        const { /* name, */ regphone, regpwd } = this.state;

        let params = {
            name    : '',
            phone   : '',
            password: '',
        };
        if (!!refereeid) {
            /* do referee stuff */
            params = {
                name    : name,
                phone   : regphone,
                password: regpwd,
                // referee : refereeid
            };
        } else {
            /* do no referee stuff */
            params = {
                name    : name,
                phone   : regphone,
                password: regpwd,
            };
        }

        const result = await Sign.doRegisterMethod(params);
        if (result.success === true) {
            /* do ok stuff */
        } else {
            /* do error stuff */
            alert(result.message ? result.message : '注册有问题');
        }
    }

    public doLoginHandle = async (): Promise<void> => {
        
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
            alert(result.errMsg);
        } else {
            // const { hideLogin } = this.props;
            /* do stuff */
            
            const res: DoLoginMethodReturn = await Sign.doLoginMethod({
                phone   : logphone, 
                password: logpwd
            });
            
            if (res.success === true) {
                /* do success stuff */
                // if (hideLogin) {
                //     hideLogin();
                // }
                window.location.reload();
            } else {
                /* do error stuff */
                alert(res.message ? res.message : '登录出错了！');
            }
        }
    }

    render() {
        const { 
            showType,
            regphone,
            regpwd,
            regcode,
        } = this.state;
        const { 
            display,
            hideSignModal,
        } = this.props;
        return (
            <section 
                styleName="container"
                flex-center="all-center"
                style={{
                    bottom      : display === true ? '0' : '-100vh',
                    opacity     : display === true ? 1 : 0,
                    visibility  : display === true ? 'visible' : 'hidden',
                }}
            >
                <i
                    styleName="back"
                    bgimg-center="100"
                    onClick={hideSignModal}
                />
                <div styleName="content">
                    <div styleName="type">
                        <button
                            styleName={showType === 'login'     ? 'buttonActive' : 'buttonNormal'}
                            onClick={() => this.onButtonClickHandle('login')}
                        >
                            登录
                        </button>
                        <button
                            styleName={showType === 'register'  ? 'buttonActive' : 'buttonNormal'}
                            onClick={() => this.onButtonClickHandle('register')}
                        >
                            注册
                        </button>
                    </div>
                    
                    {showType === 'login'
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
                                    placeholder     : '输入密码',
                                    onChangeHandle  : this.onChangeRegpwd
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
                                <div styleName="send">发送验证码</div>
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

    private renderInput = ({value, style, placeholder, onChangeHandle}: InputParam): JSX.Element => {

        return (
            <input
                styleName={style ? style : 'input'}
                value={value}
                placeholder={placeholder}
                onChange={onChangeHandle}
            />
        );
    }
}

const RegisteHoc = CSSModules(Registe, styles);

export const mapStateToProps = (state: Stores) => ({
    display: getSignModalStatus(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    hideSignModal: bindActionCreators(hideSignModal, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RegisteHoc);