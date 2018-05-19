import * as React from 'react';
import { merge } from 'lodash';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { bindActionCreators } from 'redux';
import { Stores } from '../../../reducers/type';
import { Gashapon, orderAddressConfig } from '../../../types/componentTypes';
import { Userdata, Address } from '../../../types/user';
import history from '../../../history';
import GashaItem from '../../../components/gashapon_inventory';
import Header from '../../../components/header_inventory';
import User from '../../../classes/user';
import SignModal from '../../sign';
import Modal from '../../../components/modal';
import Hoc from '../../hoc';
import { getInventory } from '../../../reducers/inventory';
import { getUserdata } from '../../../reducers/home';
import { 
    StatusActions,
    showSignModal,
    setOrderAddressConfig,
} from '../../../actions/status';
import { 
    setSelectedAddress, 
    setSelectedGashapons,
    BusinessActions,
} from '../../../actions/business';
import {
    HomeActions,
    loadUserDataFromUuid
} from '../../../actions/home';
import * as numeral from 'numeral';

interface Props {
    getInventory            : Gashapon[];
    getUserdata             : Userdata;
    showSignModal           : () => void;
    setSelectedAddress      : (address: Address | {}) => void;
    setSelectedGashapons    : (gashapons: Gashapon[]) => void;
    setOrderAddressConfig   : (config: any) => void;
    loadUserDataFromUuid    : () => void;
}

interface State {
    showModal   : boolean;
    modalValue  : string;
    selected    : number[];
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
            showModal   : false,
            selected    : [],
            modalValue  : ''
        };
    }
    
    componentDidMount (): void {
        const { loadUserDataFromUuid } = this.props;
        const user = User.getUser();
        if (!user.uid) {
            history.push('/inventory');
        } else {
            loadUserDataFromUuid();
        }
    }
    
    public onNavHandle = (param: string): void => {
        history.push(`/${param}`);
    }

    public propsClickHandle = (): void => {
        /* no empty */
    }

    public onShowModal = (): void => {
        this.setState({
            showModal: true
        });
    }

    public onHideModal = (): void => {
        this.setState({
            showModal: false
        });
    }

    public onCancelClickHandle = (): void => {
        this.onHideModal();
        history.goBack();
    }

    public onConfirmClickHandle = (): void => {

        /* do address handle */
        const { setOrderAddressConfig } = this.props;
        const config: orderAddressConfig = {
            path: 'makeorders',
        };
        
        setOrderAddressConfig(config);
        history.push('/address');
    }

    public doChangeOrderHandle = (item: Gashapon, i: number): void => {
        const { selected } = this.state;

        const token = selected.findIndex(num => num === i);

        if (token !== -1) {
            /* 存在 */
            selected.splice(token, 1);
            this.setState({
                selected: merge([], selected, [])  
            });
        } else {
            /* 不存在 */
            selected.push(i);
            this.setState({
                selected: merge([], selected, []) 
            });
        }
    }

    public doAllChoiceHandle = (): void => {
        const { selected } = this.state;
        const { getInventory } = this.props;
        
        if (selected.length === getInventory.length) {
            this.setState({
                selected: []
            });
        } else {

            const newSelected = [];

            for (let i = 0; i < getInventory.length; i++) {
                newSelected.push(i);
            }

            this.setState({
                selected: merge([], newSelected, [])
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
        const { selected } = this.state;
        const { 
            showSignModal,
            setSelectedAddress,
            setSelectedGashapons,
        } = this.props;
        if (selected.length === 0) {
            this.setState({
                modalValue: '请选择要下单的扭蛋~'
            });
            this.onShowModal();
            return;
        } else {
            const { getUserdata, getInventory } = this.props;

            const gashapons = selected.map(item => {
                return getInventory[item];
            });

            let defaultAddress: Address | {};

            if (getUserdata.address && getUserdata.address.length > 0) {
                const index = getUserdata.address.findIndex(item => item.status === 1);

                if (index !== -1) {
                    defaultAddress = getUserdata.address[index];
                } else {
                    defaultAddress = getUserdata.address[0];
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
                this.setState({
                    modalValue: '还没有地址是否前往设置？'
                });
                this.onShowModal();
            }
        }
    }

    render() {
        const { showModal, modalValue, selected } = this.state;
        const { getInventory } = this.props;
        console.log('selected', selected);
        return (
            <Hoc>
                <div styleName="container" bg-white="true">
                    <SignModal/>
                    <Modal 
                        display={showModal}
                        value={modalValue}
                        onCancelClickHandle={() => this.onCancelClickHandle()}
                        onConfirmClickHandle={() => this.onConfirmClickHandle()}
                    />
                    <Header title=""/>
                    <div styleName="back">
                        <i 
                            styleName="backIcon" 
                            bgimg-center="100"
                            onClick={() => this.onNavHandle('inventory')}
                        />
                        <span>
                            已选择的扭蛋
                            <span styleName="colorText">{selected ? selected.length : 0}</span>
                            件
                        </span>
                    </div>

                    {getInventory.map((item: Gashapon, i: number) => (
                        <div 
                            key={i}
                            styleName="item"
                            onClick={() => this.doChangeOrderHandle(item, i)}
                        >
                            <div 
                                styleName="option"
                                bgimg-center="100"
                                style={{
                                    backgroundImage: this.renderIcon(item, i)
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
            </Hoc>
        );
    }

    private renderIcon = (item: Gashapon, i: number) => {
        const { selected } = this.state;

        let token = false;
        const result = selected.findIndex(num => num === i);
        if (result !== -1) {
            token = true;
        } else {
            token = false;
        }
        return token === true ? 'url(http://net.huanmusic.com/gasha/%E5%B0%8F%E7%A1%AE%E8%AE%A4.png)' : 'url()';
    }

    private renderFooter = (): JSX.Element => {
        const { selected } = this.state;
        const { getInventory } = this.props;
        let money: number = 0;

        selected.map(item => {
            if (typeof getInventory[item].price === 'number') {
                money += getInventory[item].price;
            } else {
                console.log(`第${item}个扭蛋价格有问题`);
            }
        });
        return (
            <div styleName="footer">
                <div 
                    styleName="choice"
                    onClick={() => this.doAllChoiceHandle()}
                >
                    <i 
                        styleName="choiceIcon" 
                        bgimg-center="100"
                        style={{
                            backgroundImage: selected.length === getInventory.length
                                            ? `url(http://net.huanmusic.com/gasha/%E6%89%93%E9%92%A9%E5%90%8E.png)`
                                            : `url(http://net.huanmusic.com/gasha/%E6%89%93%E9%92%A9%E5%89%8D.png)`
                        }}
                    />
                    <span styleName="choiceText" onClick={() => this.doAllChoiceHandle()}>全选</span>
                    <span styleName="choiceText">
                        合计：
                        <span style={{color: '#fea270'}}>
                            ￥{money ? numeral(money / 100).format('0') : 0}
                        </span>
                    </span>
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

export const mapDispatchToProps = (dispatch: Dispatch<BusinessActions | StatusActions | HomeActions>, state: Stores) => ({
    showSignModal           : bindActionCreators(showSignModal, dispatch),
    setSelectedAddress      : bindActionCreators(setSelectedAddress, dispatch),
    setSelectedGashapons    : bindActionCreators(setSelectedGashapons, dispatch),
    setOrderAddressConfig   : bindActionCreators(setOrderAddressConfig, dispatch),
    loadUserDataFromUuid    : bindActionCreators(loadUserDataFromUuid, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MakeOridersHoc);