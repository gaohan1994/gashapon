import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Footer from '../../components/footer';
import GashaItem from '../../components/gashapon_item';
import Menu from '../../components/menu';

import { Stores } from '../../reducers/type';

import { 
    Gashapon
} from '../../types/componentTypes';

import { 
    loadInventory
} from '../../actions/inventory';

import { 
    getInventory
} from '../../reducers/inventory';

interface Props {
    getInventory    : Gashapon[];
    loadInventory   : (userId: string) => void;
}

interface State {
    
}

/**
 * @returns 
 * @memberof Inventory
 * 蛋柜：抽到扭蛋之后但是还没有下单的页面
 * render:
 */
class Inventory extends React.Component<Props, State> {

    componentDidMount() {
        const userId = '5ac1f31087e83ef4915abc02';
        const { 
            loadInventory
        } = this.props;
        loadInventory(userId);
    }

    public onMenuClickHandle = (type: string): void => {
        if (type === 'sale') {
            alert('working');
        } else {
            console.log('hello');
        }
    }

    render() {
        const { getInventory } = this.props;
        return (
            <div styleName="container">
                {getInventory.map((item, i) => (
                    <div 
                        key={i}
                        styleName="item"
                    >
                        <GashaItem item={item}/>
                    </div>
                ))}
                {this.renderMenu()}
                <Footer/>
            </div>
        );
    }

    private renderMenu = (): JSX.Element => {
        const menus = [
            {
                _id: 1,
                value: '变卖',
                img: '',
                propsClickHandle: this.onMenuClickHandle.bind(this, 'sale')
            },
            {
                _id: 2,
                value: '下单',
                img: '',
                propsClickHandle: this.onMenuClickHandle.bind(this, 'order')
            }
        ];
        return (
            <div styleName="menu">
                <Menu menus={menus} height={100}/>
            </div>  
        );
    }
}

const InventoryHoc = CSSModules(Inventory, styles);

export const mapStateToProps = (state: Stores) => ({
    getInventory: getInventory(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    loadInventory: bindActionCreators(loadInventory, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(InventoryHoc);