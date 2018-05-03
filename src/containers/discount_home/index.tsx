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
import User from '../../classes/user';

export interface Props {
    loadDiscount: (uid: string) => void;
}

export interface State {

}

class DiscountHome extends React.Component <Props, State> {

    componentDidMount (): void {
        const { loadDiscount } = this.props;

        const user = User.getUser();

        if (!user.userId) {
            /* do no sign handle */
        } else {
            loadDiscount(user.userId);
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

});

export const mapDispatchToProps = (dispatch: Dispatch<DiscountActions>) => ({
    loadDiscount: bindActionCreators(loadDiscount, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DiscountHomeHoc);