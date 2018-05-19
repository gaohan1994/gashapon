import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stores } from '../../../reducers/type';
import { getUserdata } from '../../../reducers/home';
import { Userdata } from '../../../types/user';
import { showPhone } from '../../../actions/status';

import Phone from '../../../components/phonemodal';
import Header from '../../../components/haeder_set';

interface Props {
    getUserdata : Userdata;
    showPhone   : () => void;
}

class Account extends React.Component<Props, {}> {

    render () {
        const { getUserdata, showPhone } = this.props;
        return (
            <div styleName="container" bg-white="true">
                <Phone/>
                <Header 
                    title="绑定手机号"
                />
                <div 
                    styleName="item" 
                    onClick={showPhone}
                >
                    <i styleName="icon"/>
                    <span styleName="phone">绑定的手机号码：{getUserdata.phone ? getUserdata.phone : '无'}</span>
                </div>
            </div>
        );
    }
}

const AccountHoc = CSSModules(Account, styles);

const mapStateToProps = (state: Stores) => ({
    getUserdata : getUserdata(state),
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
    showPhone: bindActionCreators(showPhone, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AccountHoc);