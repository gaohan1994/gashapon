import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    DiscountActions,
    loadDiscount,
} from '../../actions/discount';
import { 
    getUserdata,
} from '../../reducers/home';
import { Userdata } from '../../types/user';
// import User from '../../classes/user';

export interface Props {
    loadDiscount: (uid: string) => void;
    getUserdata : Userdata;
}

export interface State {

}

class DiscountHome extends React.Component <Props, State> {

    componentDidMount (): void {
        const { loadDiscount, getUserdata } = this.props;

        // const user = User.getUser();

        if (!getUserdata._id) {
            /* do no sign handle */
        } else {
            loadDiscount(getUserdata._id);
        }
    }

    render (): JSX.Element {
        return (
            <div>DiscountHome</div>
        );
    }
}

const DiscountHomeHoc = CSSModules(DiscountHome, styles);

export const mapStateToProps = (state: Stores) => ({
    getUserdata: getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<DiscountActions>) => ({
    loadDiscount: bindActionCreators(loadDiscount, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DiscountHomeHoc);