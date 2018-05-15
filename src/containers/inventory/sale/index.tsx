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

interface Props {
    getInventory    : Gashapon[];
    getUserdata     : Userdata;
    showSignModal   : () => void;
}

interface State {
    gashapons: Gashapon[];
}

/**
 * 变卖页面
 * 
 * @class Sale
 * @extends {React.Component<Props, State>}
 */
class Sale extends React.Component<Props, State> {

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
    
    public doRecycleHandle = async (): Promise<void> => {
        const { gashapons, } = this.state;
        const { showSignModal } = this.props;
        if (gashapons.length === 0) {
            alert('请选择要回收的扭蛋~');
            return;
        } else {
            const user = User.getUser();  
            
            if (!user.uid) {

                /* do no sign handle */
                showSignModal();
            } else {

                const result: NormalReturnObject = await Business.doRecycleMethod({
                    uid     : user.uid, 
                    products: gashapons
                }); 

                if (result.success === true) {
                    console.log('ok');
                    history.push('/success');
                } else {
                    console.log(`${result.type}--${result.message}`);
                    alert(result.message);
                }
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

    private renderIcon = (item: Gashapon): string => {
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
        const { gashapons } = this.state;
        const { getInventory } = this.props;
        let money: number = 0;
        gashapons.map((item: Gashapon, i: number) => {
            if (typeof item.price === 'number') {
                money += item.price;
            } else {
                console.log(`第${i}个扭蛋价格有问题`);
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
                            backgroundImage: gashapons.length === getInventory.length
                                            ? `url(http://net.huanmusic.com/gasha/%E6%89%93%E9%92%A9%E5%90%8E.png)`
                                            : `url(http://net.huanmusic.com/gasha/%E6%89%93%E9%92%A9%E5%89%8D.png)`
                        }}    
                    />
                    <span styleName="choiceText" onClick={() => this.doAllChoiceHandle()}>全选</span>
                    <span styleName="choiceText">
                        合计：
                        <span style={{color: '#fea270'}}>￥{money ? money / 100 : 0}</span>
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