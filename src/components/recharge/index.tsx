import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BusinessActions } from '../../actions/business';
import { Stores } from '../../reducers/type';
import { getUserdata } from '../../reducers/home';
import { Userdata } from '../../types/user';
import history from '../../history';

interface Props {
    getUserdata?: Userdata;
}

interface State {
    
}

class Recharge extends React.Component<Props, State> {

    render() {
        const { getUserdata } = this.props;
        return (
            <div 
                styleName="money"
                onClick={() => this.onNavHandle('pay')}
            >
                <span styleName="moneyIcon">￥</span>
                {getUserdata && getUserdata.remain
                ? (getUserdata.remain / 100)
                : 0}
                <i styleName="pay"/>
            </div>
        );
    }

    private onNavHandle = (param: string): void => {
        history.push(`/${param}`);
    }
}

const RechargeHoc = CSSModules(Recharge, styles);

const mapStateToProps = (state: Stores) => ({
    getUserdata: getUserdata(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>) => ({

});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RechargeHoc);