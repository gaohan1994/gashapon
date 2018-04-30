import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../../actions/main';
import * as styles from './index.css';
import { Stores } from '../../../reducers/type';
import Sign, { Register as RegisterType } from '../../../classes/sign';
import history from '../../../history';
import { 
    hideRegister,
} from '../../../actions/status';
import { 
    getRegisterStatus
} from '../../../reducers/status';

export interface Props {
    refereeid           ?: string;
    hideRegister        ?: () => void;
    getRegisterStatus   ?: boolean;
}

export interface State {
    name    : string;
    username: string;
    password: string;
}

class Registe extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            name    : '',
            username: '',
            password: '',
        };
    }
    
    public onChangeUsernameHandle = (e: any) => {
        this.setState({
            username: e.target.value
        });
    }

    public onChangeNameHandle = (e: any) => {
        this.setState({
            name: e.target.value
        });
    }

    public onChangePasswordHandle = (e: any) => {
        this.setState({
            password: e.target.value
        });
    }

    public doRegisterHandle = async (): Promise<void> => {

        const { refereeid } = this.props;
        const { name, username, password } = this.state;

        let params: RegisterType = {
            name    : '',
            phone   : '',
            password: '',
        };
        if (!!refereeid) {
            /* do referee stuff */
            params = {
                name    : name,
                phone   : username,
                password: password,
                referee : refereeid
            };
        } else {
            /* do no referee stuff */
            params = {
                name    : name,
                phone   : username,
                password: password,
            };
        }

        const result = await Sign.doRegisterMethod(params);
        if (result.success === true) {
            /* do ok stuff */
            history.push('/');
        } else {
            /* do error stuff */
            alert(result.message ? result.message : '注册有问题');
        }
    }

    render() {
        const { name, username, password } = this.state;
        const { getRegisterStatus } = this.props;
        return (
            <div 
                styleName="container"
                style={{
                    opacity     : getRegisterStatus === true ? 1 : 0,
                    visibility  : getRegisterStatus === true ? 'visible' : 'hidden',
                }}    
            >
                <div>
                    <input 
                        value={name}
                        onChange={this.onChangeNameHandle}
                    />
                </div>

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

                <div onClick={() => this.doRegisterHandle()}>button</div>
            </div>
        );
    }
}

const RegisteHoc = CSSModules(Registe, styles);

export const mapStateToProps = (state: Stores) => ({
    getRegisterStatus: getRegisterStatus(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    hideRegister: bindActionCreators(hideRegister, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RegisteHoc);