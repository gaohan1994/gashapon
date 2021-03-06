import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect, Dispatch } from 'react-redux';
import { Stores } from '../../../reducers/type';
import { getUserdata } from '../../../reducers/home';
import { Userdata } from '../../../types/user';

import Header from '../../../components/haeder_set';
import Line from '../../../components/lineItem';

interface Props {
    getUserdata: Userdata;
}

class Account extends React.Component<Props, {}> {

    render () {

        const { getUserdata } = this.props;
        
        return (
            <div styleName="container" bg-white="true">
                <Header 
                    title="设置"
                />
                {/* <Line 
                    value="嘀哩扭蛋号"
                    subValue="123123"
                /> */}
                <Line 
                    value="修改昵称"
                    param="changeusername"
                />
                <Line 
                    value="手机号"
                    subValue={getUserdata.phone || '未绑定手机号'}
                    // param="userphone"
                />

                <div styleName="logout">
                    <a href="/logout">退出登录</a> 
                </div>
            </div>
        );
    }
}

const AccountHoc = CSSModules(Account, styles);

const mapStateToProps = (state: Stores) => ({
    getUserdata : getUserdata(state),
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AccountHoc);