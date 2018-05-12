import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
// import * as Numeral from 'numeral';
import history from '../../history';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { BusinessActions } from '../../actions/business';
import { loadUserDataFromUuid } from '../../actions/home';
import { getUserdata } from '../../reducers/home';
import { Userdata, Address } from '../../types/user';
import { Gashapon } from '../../types/componentTypes';
import { getSelectedAddress, getSelectedGashapons } from '../../reducers/business';
import GashaponItem from '../../components/gashapon_row_item';
// import User from '../../classes/user';

interface Props {
    getUserdata         : Userdata;
    loadUserDataFromUuid: () => void;
    getSelectedAddress  ?: Address;
    getSelectedGashapons?: Gashapon[];
}

interface State {
    
}

class Profit extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { loadUserDataFromUuid } = this.props;
        loadUserDataFromUuid();
    }

    public onBackHandle = (): void => {
        history.goBack();
    }

    render (): JSX.Element {
        return (
            <div styleName="container">
                <div 
                    styleName="header"
                    bgimg-center="100"
                >
                    <div 
                        styleName="back"
                        onClick={() => this.onBackHandle()}
                    >
                        <i 
                            styleName="backicon" 
                            bgimg-center="100"
                        />
                        <span styleName="backtext">确认订单</span>
                    </div>

                    {this.renderDefaultAddress()}
                </div>
            
                {this.renderContent()}
            </div>
        );
    }

    private renderDefaultAddress = (): JSX.Element | string => {

        const { getSelectedAddress } = this.props;

        if (!getSelectedAddress) {
            return (
                <div>设置收货地址</div>
            );
        } else {
            return (
                <div styleName="address">
                    <i 
                        styleName="location"
                        bgimg-center="100"
                    />
                    <i 
                        styleName="more"
                        bgimg-center="100"
                    />
                    <div styleName="box">
                        <span font-s="30">收货人：{getSelectedAddress.receiver}</span>
                        <span font-s="30">{getSelectedAddress.phone}</span>
                    </div>
                    <div styleName="box">
                        <span font-s="24">收货地址：{getSelectedAddress.detail_area + ` ` + getSelectedAddress.detail_home}</span>
                    </div>
                </div>
            );
        }
    }

    private renderContent = (): JSX.Element => {

        const { getSelectedGashapons} = this.props;
        return (
            <div styleName="content">
                {getSelectedGashapons && getSelectedGashapons.length > 0
                ? getSelectedGashapons.map((item: Gashapon, i: number) => (
                    <GashaponItem gashapon={item} key={i}/>
                ))
                : ''}
            </div>
        );
    }
}

const ProfitHoc = CSSModules(Profit, styles);

const mapStateToProps = (state: Stores) => ({
    getUserdata         : getUserdata(state),
    getSelectedAddress  : getSelectedAddress(state),
    getSelectedGashapons: getSelectedGashapons(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>) => ({
    loadUserDataFromUuid: bindActionCreators(loadUserDataFromUuid, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProfitHoc);