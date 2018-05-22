import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    DiscountActions,
    loadDiscount,
    loadDiscounting,
} from '../../actions/discount';
import { getUserdata } from '../../reducers/home';
import { 
    getHomeDiscount, 
    getHomeDiscounting 
} from '../../reducers/discount';
import { Userdata } from '../../types/user';
import DiscountItem from '../../components/discount_row_item';
import Header from '../../components/haeder_set';
import SignModal from '../sign';
import history from '../../history';
import { discount as discountType } from '../../types/componentTypes';

export interface Props {
    getUserdata         : Userdata;
    loadDiscount        : (uid: string) => void;
    loadDiscounting     : (uid: string) => void;
    getHomeDiscount     : discountType[];
    getHomeDiscounting  : discountType[];
}

export interface State {
    type: 'discounting' | 'discount';
}

class DiscountHome extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            type: 'discounting'
        };

        this.onChangeTypeHandle = this.onChangeTypeHandle.bind(this);
    }

    componentDidMount (): void {
        
        const { 
            getUserdata,
            loadDiscount, 
            loadDiscounting
        } = this.props;

        if (!getUserdata._id) {
            /* do no sign handle */
            history.push('/my');
        } else {
            loadDiscount(getUserdata._id);
            loadDiscounting(getUserdata._id);
        }
    }

    public onChangeTypeHandle = (type: 'discounting' | 'discount'): void => {
        this.setState({
            type: type
        });
    }

    render (): JSX.Element {
        const { type } = this.state;
        const { getHomeDiscounting, getHomeDiscount } = this.props;
        return (
            <div container-with-header="true" bg-white="true">
            
                <SignModal/>
                <Header title="我的砍价"/>

                {this.renderNav()}
                
                {type === 'discounting'
                ? this.renderDiscountData(getHomeDiscounting)
                : ''}

                {type === 'discount'
                ? this.renderDiscountData(getHomeDiscount)
                : ''}
            </div>
        );
    }

    private readonly renderNav = (): JSX.Element => {
        const { type } = this.state;
        return (
            <div styleName="navbar">
                <div styleName="white">
                    <div 
                        styleName={type === 'discounting' ? 'navItemActive' : 'navItem'}
                        onClick={() => this.onChangeTypeHandle('discounting')} 
                    >
                        进行中
                    </div>
                    <div 
                        styleName={type === 'discount' ? 'navItemActive' : 'navItem'}
                        onClick={() => this.onChangeTypeHandle('discount')} 
                    >
                        已购买
                    </div>
                </div>
            </div>
        );
    }

    private readonly renderDiscountData = (data: discountType[]): JSX.Element => {
        return (
            <div styleName="content">
                {data && data.length > 0
                ? data.map((item: discountType, i: number) => (
                    <div styleName="item" key={i}>
                        <DiscountItem discount={item}/>
                    </div>
                ))
                : ''}
            </div>
        );
    }
}

const DiscountHomeHoc = CSSModules(DiscountHome, styles);

export const mapStateToProps = (state: Stores) => ({
    getUserdata         : getUserdata(state),
    getHomeDiscount     : getHomeDiscount(state),
    getHomeDiscounting  : getHomeDiscounting(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<DiscountActions>) => ({
    loadDiscount    : bindActionCreators(loadDiscount, dispatch),
    loadDiscounting : bindActionCreators(loadDiscounting, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DiscountHomeHoc);