import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../../actions/main';
import Validator from '../../../classes/validate';
import Sign, { DoLoginMethodReturn } from '../../../classes/sign';
import * as styles from './index.css';
import { Stores } from '../../../reducers/type';
import { 
    hideLogin,
} from '../../../actions/status';
import { 
    getLoginStatus
} from '../../../reducers/status';

export interface Props {
    getLoginStatus  ?: boolean;
    hideLogin       ?: () => void;
}

export interface State {
    username: string;
    password: string;
}

class Login extends React.Component<Props, State> {

    constructor (props: Props) {
        
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    public onChangeUsernameHandle = (e: any) => {
        this.setState({
            username: e.target.value
        });
    }

    public onChangePasswordHandle = (e: any) => {
        this.setState({
            password: e.target.value
        });
    }

    public doLoginHandle = async (): Promise<void> => {
        
        const {
            username,
            password,
        } = this.state;

        let helper = new Validator();

        helper.add(username, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入用户名~',
            elementName: 'username'
        }]);

        helper.add(password, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入密码~',
            elementName: 'password'
        }]);

        let result = helper.start();

        if (result) {
            alert(result.errMsg);
        } else {
            const { hideLogin } = this.props;
            /* do stuff */
            const res: DoLoginMethodReturn = await Sign.doLoginMethod({phone: username, password: password});
            if (res.success === true) {
                /* do success stuff */
                console.log(res);
                if (hideLogin) {
                    hideLogin();
                }
            } else {
                /* do error stuff */
                alert(res.message ? res.message : '登录出错了！');
            }
        }
    }

    render() {

        const {
            username,
            password,
        } = this.state;

        const {
            getLoginStatus 
        } = this.props;

        return (
            <div 
                styleName="container"
                style={{
                    opacity     : getLoginStatus === true ? 1 : 0,
                    visibility  : getLoginStatus === true ? 'visible' : 'hidden',
                    bottom      : getLoginStatus === true ? '0' : '-100vh'
                }}
            >
                <div>
                    <input 
                        value={username}
                        onChange={this.onChangeUsernameHandle}
                    />
                </div>

                <div>
                    <input 
                        value={password}
                        onChange={this.onChangePasswordHandle}
                    />
                </div>

                <div onClick={() => this.doLoginHandle()}>button</div>
            </div>
        );
    }
}

const LoginHoc = CSSModules(Login, styles);

export const mapStateToProps = (state: Stores) => ({
    getLoginStatus: getLoginStatus(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    hideLogin: bindActionCreators(hideLogin, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginHoc);