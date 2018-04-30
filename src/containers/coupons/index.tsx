import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/header_achievement';
// import Coupon from '../../components/coupon';

import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    CouponsActions,
    loadCoupons, 
    LoadCouponsParams,
} from '../../actions/coupons';
import { getCoupons } from '../../reducers/coupons';
import User from '../../classes/user';

interface Props {
    getCoupons  : object[];
    loadCoupons : ({}: LoadCouponsParams) => void;
}

interface State {}

class Coupons extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
    }

    componentDidMount() {
        const { loadCoupons } = this.props;
        const user = User.getUser();

        loadCoupons({_id: user.userId});
    }

    render () {
        const { getCoupons } = this.props;
        console.log('getCoupons', getCoupons);
        return (
            <div styleName="container">
                <Header/>
                {/* {getCoupons.map((item, i) => (
                    <div styleName="item" key={i}>
                        <Coupon/>
                    </div>
                ))} */}
            </div>
        );
    }
}

const CouponsHoc = CSSModules(Coupons, styles);

export const mapStateToProps = (state: Stores) => ({
    getCoupons: getCoupons(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<CouponsActions>, state: Stores) => ({
    loadCoupons: bindActionCreators(loadCoupons, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CouponsHoc);