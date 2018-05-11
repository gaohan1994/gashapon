import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { bindActionCreators } from 'redux';
import * as numeral from 'numeral';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BusinessActions } from '../../actions/business';
import { Stores } from '../../reducers/type';
import { getUserdata } from '../../reducers/home';
import { Userdata } from '../../types/user';
import history from '../../history';
import { showSignModal } from '../../actions/status';

interface Props {
    getUserdata     ?: Userdata;
    showSignModal   ?: () => void;
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
                <div styleName="left">
                    <span>￥</span>
                    <span>
                        {getUserdata && getUserdata.remain
                        ? numeral(getUserdata.remain / 100).format('0.00')
                        : 0}
                    </span>
                </div>
                <i styleName="pay"/>
            </div>
        );
    }

    private onNavHandle = (param: string): void => {
        const { showSignModal, getUserdata } = this.props;

        if (getUserdata && getUserdata._id) {
            history.push(`/${param}`);
        } else {
            if (showSignModal) {
                showSignModal();
            }
        }
        
    }
}

const RechargeHoc = CSSModules(Recharge, styles);

const mapStateToProps = (state: Stores) => ({
    getUserdata: getUserdata(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>) => ({
    showSignModal: bindActionCreators(showSignModal, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RechargeHoc);