import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/header_coupons';
import Coupon from '../../components/coupon';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    CouponsActions,
    loadCoupons, 
    loadCouponsByType,
    LoadCouponsParams,
} from '../../actions/coupons';
import { getCoupons } from '../../reducers/coupons';
import User from '../../classes/user';
import { Ticket } from '../../types/componentTypes';
import { arriveFooter } from '../../config/util';

interface Props {
    match: {
        params: {
            type?: string;      
        }
    };
    location: {
        pathname: string;
    };
    getCoupons          : Ticket[];
    loadCoupons         : ({}: LoadCouponsParams) => void;
    loadCouponsByType   : ({}: LoadCouponsParams) => void;
}

interface State {
    page: number;
}

class Coupons extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            page: 0
        };
    }

    componentWillReceiveProps (nextProps: any): void {
        
        const {
            loadCoupons,
            loadCouponsByType
        } = this.props;

        const user = User.getUser();
        console.log(user);
        if (nextProps.location.pathname !== this.props.location.pathname) {
            console.log(nextProps.match);
            if (!!nextProps.match.params.type) {

                loadCouponsByType({
                    _id : user.uid,
                    type: nextProps.match.params.type
                });
            } else {
                
                loadCoupons({
                    _id: user.uid
                });
            }
        }
    }

    componentDidMount() {

        const { 
            match,
            loadCoupons,
            loadCouponsByType,
        } = this.props;

        const user = User.getUser();

        if (!!match.params.type) {
            
            loadCouponsByType({
                _id : user.uid,
                type: match.params.type
            });
        } else {

            loadCoupons({
                _id: user.uid
            });
        }

        arriveFooter.add('coupons', (): void => {

            if (!!match.params.type) {

                loadCouponsByType({
                    _id     : user.uid,
                    type    : match.params.type, 
                    page    : this.state.page + 1, 
                    callback: this.loadCouponsCallback
                });
            }
        });
    }

    componentWillUnmount (): void {
        arriveFooter.remove('coupons');
    }

    public loadCouponsCallback = (page: number) => {
        this.setState({
            page: page + 1
        });
    }

    render () {
        const { getCoupons } = this.props;
        console.log('getCoupons', getCoupons);
        return (
            <div styleName="container">

                <Header title="我的优惠券"/>
                
                {getCoupons.map((item: Ticket, i: number) => (
                    <div styleName="item" key={i}>
                        <Coupon ticket={item}/>
                    </div>
                ))}
            </div>
        );
    }
}

const CouponsHoc = CSSModules(Coupons, styles);

export const mapStateToProps = (state: Stores) => ({
    getCoupons: getCoupons(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<CouponsActions>, state: Stores) => ({
    loadCoupons         : bindActionCreators(loadCoupons, dispatch),
    loadCouponsByType   : bindActionCreators(loadCouponsByType, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CouponsHoc);