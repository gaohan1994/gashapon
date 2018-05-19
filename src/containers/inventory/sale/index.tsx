import * as React from 'react';
import { merge } from 'lodash';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Stores } from '../../../reducers/type';
import { bindActionCreators } from 'redux';
import { Gashapon } from '../../../types/componentTypes';
import { Userdata } from '../../../types/user';
import history from '../../../history';
import GashaItem from '../../../components/gashapon_inventory';
import Header from '../../../components/header_inventory';
import User from '../../../classes/user';
import Business from '../../../classes/business';
import SignModal from '../../sign';
import { NormalReturnObject } from '../../../classes/base';
import { InventoryActions } from '../../../actions/inventory';
import { showSignModal } from '../../../actions/status';
import { getInventory } from '../../../reducers/inventory';
import { getUserdata } from '../../../reducers/home';
import Modal from '../../../components/modal';
import * as numeral from 'numeral';

interface Props {
    getInventory    : Gashapon[];
    getUserdata     : Userdata;
    showSignModal   : () => void;
}

interface State {
    selected: number[];

    showModal: boolean;
    modalValue: string;
}

/**
 * 变卖页面
 * @class Sale
 * @extends {React.Component<Props, State>}
 */
class Sale extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            selected    : [],
            showModal   : false,
            modalValue  : ''
            // gashapons: [],
        };
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

    public doChangeOrderHandle = (i: number): void => {
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
    
    public doRecycleHandle = async (): Promise<void> => {
        const { selected } = this.state;
        const { showSignModal, getInventory } = this.props;
        if (selected.length === 0) {
            this.setState({
                modalValue: '请选择要回收的扭蛋~'
            });
            this.onShowModal();
            return;
        } else {
            const user = User.getUser();  
            
            if (!user.uid) {

                /* do no sign handle */
                showSignModal();
            } else {

                const gashapons = selected.map(item => {
                    return getInventory[item];
                });

                const result: NormalReturnObject = await Business.doRecycleMethod({
                    uid     : user.uid, 
                    products: gashapons
                }); 

                if (result.success === true) {
                    console.log('ok');
                    history.push('/success');
                } else {
                    console.log(`${result.type}--${result.message}`);
                    this.setState({
                        modalValue: result.message ? result.message : '回收出错了'
                    });
                    this.onShowModal();
                }
            }
        }
    }

    render() {
        const { selected } = this.state;
        const { getInventory } = this.props;
        return (
            <div styleName="container">
                <SignModal/>
                {this.renderErrorModal()}
                <Header title=""/>
                <div styleName="back">
                    
                    <i 
                        styleName="backIcon" 
                        bgimg-center="100"
                        onClick={() => this.onNavHandle('inventory')}
                    />
                    <span>
                        已选择的扭蛋
                        <span styleName="colorText">{selected.length ? selected.length : 0}</span>
                        件
                    </span>
                </div>
                {getInventory.map((item: Gashapon, i: number) => (
                    <div 
                        key={i}
                        styleName="item"
                        onClick={() => this.doChangeOrderHandle(i)}
                    >
                        <div 
                            styleName="option"
                            bgimg-center="100"
                            style={{
                                backgroundImage: this.renderIcon(i)
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

    private renderErrorModal = (): JSX.Element => {
        const { showModal, modalValue } = this.state;
        return (
            <Modal
                display={showModal}
                value={modalValue}
                onCancelClickHandle={this.onHideModal}
                onConfirmClickHandle={this.onHideModal}
            />
        );
    }

    private renderIcon = (i: number): string => {
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
                    flex-center="all-center"
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
                        <span style={{color: '#fea270'}}>￥{money ? numeral((money / 100) * 0.8).format('0') : 0}</span>
                    </span>
                </div>
                <div 
                    styleName="button"
                    bgimg-center="100"
                    style={{backgroundImage: `url(http://net.huanmusic.com/gasha/%E5%8F%98%E5%8D%96-%E7%A1%AE%E8%AE%A4%E8%AE%A2%E5%8D%95.png)`}}
                    onClick={() => this.doRecycleHandle()}
                />
            </div>
        );
    }
}

const SaleHoc = CSSModules(Sale, styles);

export const mapStateToProps = (state: Stores) => ({
    getInventory: getInventory(state),
    getUserdata : getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<InventoryActions>, state: Stores) => ({
    showSignModal: bindActionCreators(showSignModal, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SaleHoc);