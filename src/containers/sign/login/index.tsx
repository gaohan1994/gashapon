import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
// import { bindActionCreators } from 'redux';
import { MainActions } from '../../../actions/main';
import * as styles from './index.css';

import { Stores } from '../../../reducers/type';
import { 

} from '../../../actions/main';
import { 

} from '../../../reducers/main';

export interface Props {

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

    public doLoginHandle = (): void => {
        console.log('1');
    }

    render() {
        const {
            username,
            password,
        } = this.state;
        const { } = this.props;
        return (
            <div styleName="container">
                
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

});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoginHoc);