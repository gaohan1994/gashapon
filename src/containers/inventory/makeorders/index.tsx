import * as React from 'react';
import { merge } from 'lodash';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { bindActionCreators } from 'redux';
import { Stores } from '../../../reducers/type';
import { Gashapon } from '../../../types/componentTypes';
import { Userdata, Address } from '../../../types/user';
import history from '../../../history';
import GashaItem from '../../../components/gashapon_inventory';
import Header from '../../../components/header_inventory';
import User from '../../../classes/user';
import SignModal from '../../sign';
import { StatusActions } from '../../../actions/status';
import { getInventory } from '../../../reducers/inventory';
import { getUserdata } from '../../../reducers/home';
import { showSignModal } from '../../../actions/status';
import { 
    setSelectedAddress, 
    setSelectedGashapons,
    BusinessActions,
} from '../../../actions/business';

interface Props {
    getInventory        : Gashapon[];
    getUserdata         : Userdata;
    showSignModal       : () => void;
    setSelectedAddress  : (address: Address | {}) => void;
    setSelectedGashapons: (gashapons: Gashapon[]) => void;
}

interface State {
    gashapons: Gashapon[];
}

/**
 * @returns 
 * @memberof MakeOriders
 * 蛋柜：抽到扭蛋之后的下单界面
 * render:
 */
class MakeOriders extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            gashapons: [],
        };
    }
    
    public onNavHandle = (param: string): void => {
        history.push(`/${param}`);
    }

    public propsClickHandle = (): void => {
        /* no empty */
    }

    public doChangeOrderHandle = (item: Gashapon): void => {
        const { gashapons } = this.state;
        const result = gashapons.findIndex(gashapon => gashapon._id === item._id);
        if (result !== -1) {
            /* do not insert stuff */
            gashapons.splice(result, result + 1);
            this.setState({
                gashapons: merge([], gashapons, [])
            });
        } else {
            /* do insert stuff */
            gashapons.push(item);
            this.setState({
                gashapons: merge([], gashapons, [])
            });
        }
    }

    public doDeleteOrderHandle = (item: Gashapon): void => {
        const { gashapons } = this.state;
        const result = gashapons.findIndex(gashapon => gashapon._id === item._id);
        if (result !== -1) {
            /* do delete stuff */
            this.setState({
                gashapons: merge([], gashapons, [])
            });
        } else {
            /* do nothing */
        }
    }

    public doAllChoiceHandle = (): void => {
        const { gashapons } = this.state;
        const { getInventory } = this.props;
        
        /* 全选 如果 length 不等就全选，如果相等就全不选 */
        if (gashapons.length === getInventory.length) {
            /* 全部不选 */
            this.setState({
                gashapons: []
            });
        } else {
            this.setState({
                gashapons: merge([], getInventory, [])
            });
        }
    }
    
    /**
     * 1.把address存到redux中
     * 2.把gashapons存到redux中
     * 3.跳转到payment
     * @memberof MakeOriders
     */
    public doOrderHandle = async (): Promise<void> => {
        const { gashapons } = this.state;
        const { 
            showSignModal,
            setSelectedAddress,
            setSelectedGashapons,
        } = this.props;
        if (gashapons.length === 0) {
            alert('请选择要下单的扭蛋~');
            return;
        } else {
            const { getUserdata } = this.props;

            let defaultAddress: Address | {};

            if (getUserdata.address && getUserdata.address.length > 0) {
                const index = getUserdata.address.findIndex(item => item.status === 1);

                if (index !== -1) {
                    defaultAddress = getUserdata.address[index];
                } else {
                    defaultAddress = {};
                }                

                const user = User.getUser();

                if (!user.uid) {

                    /* do sign handle */
                    showSignModal();
                } else {
                    setSelectedAddress(defaultAddress);
                    setSelectedGashapons(gashapons);

                    history.push('/payment');
                }
            } else {
                history.push('/address');
            }
        }
    }

    render() {
        const { gashapons } = this.state;
        const { getInventory } = this.props;
        return (
            <div styleName="container">
                <SignModal/>
                <Header title=""/>
                <div styleName="back">
                    <i 
                        styleName="backIcon" 
                        bgimg-center="100"
                        onClick={() => this.onNavHandle('inventory')}
                    />
                    <span>
                        已选择的扭蛋
                        <span styleName="colorText">{gashapons ? gashapons.length : 0}</span>
                        件
                    </span>
                </div>
                {getInventory.map((item: Gashapon, i: number) => (
                    <div 
                        key={i}
                        styleName="item"
                        onClick={() => this.doChangeOrderHandle(item)}
                    >
                        <div 
                            styleName="option"
                            bgimg-center="100"
                            style={{
                                backgroundImage: this.renderIcon(item)
                            }}
                        />
                        <GashaItem 
                            item={item}
                            propsClickHandle={this.propsClickHandle}
                        />
                    </div>
                ))}
                {this.renderFooter()}
            </div>
        );
    }

    private renderIcon = (item: Gashapon) => {
        const { gashapons } = this.state;
        let token = false;
        const result = gashapons.findIndex(gashapon => gashapon._id === item._id);
        if (result !== -1) {
            token = true;
        } else {
            token = false;
        }
        return token === true ? 'url(http://net.huanmusic.com/gasha/%E5%B0%8F%E7%A1%AE%E8%AE%A4.png)' : 'url()';
    }

    private renderFooter = (): JSX.Element => {
        return (
            <div styleName="footer">
                <div 
                    styleName="choice"
                    onClick={() => this.doAllChoiceHandle()}
                >
                    <span onClick={() => this.doAllChoiceHandle()}>全选</span>
                    <span>合计：</span>
                </div>
                <div
                    styleName="button"
                    bgimg-center="100"
                    style={{backgroundImage: `url(http://net.huanmusic.com/gasha/%E4%B8%8B%E5%8D%95-%E7%A1%AE%E8%AE%A4%E8%AE%A2%E5%8D%95.png)`}}
                    onClick={() => this.doOrderHandle()}
                />
            </div>
        );
    }
}

const MakeOridersHoc = CSSModules(MakeOriders, styles);

export const mapStateToProps = (state: Stores) => ({
    getInventory: getInventory(state),
    getUserdata : getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<BusinessActions | StatusActions>, state: Stores) => ({
    showSignModal       : bindActionCreators(showSignModal, dispatch),
    setSelectedAddress  : bindActionCreators(setSelectedAddress, dispatch),
    setSelectedGashapons: bindActionCreators(setSelectedGashapons, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MakeOridersHoc);