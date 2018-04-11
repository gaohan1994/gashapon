import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import * as styles from './index.css';
import Footer from '../../components/footer';
import GashaItem from '../../components/gashapon_item';
import Menu from '../../components/menu';
import Hoc from '../hoc';
import { Userdata } from '../../types/user';
import history from '../../history';
import User from '../../classes/user';
import Business from '../../classes/business';
import { Stores } from '../../reducers/type';
import { 
    Gashapon
} from '../../types/componentTypes';
import { InventoryActions } from '../../actions/inventory';
import { 
    loadInventory
} from '../../actions/inventory';

import { 
    getInventory
} from '../../reducers/inventory';

import { 
    getUserdata
} from '../../reducers/home';

interface Props {
    getUserdata     : Userdata;
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
            loadInventory,
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

    public doOrderHandle = async (): Promise<void> => {
        const { getInventory, getUserdata } = this.props;
        const u = new User({
            _id     : getUserdata._id,
            address : getUserdata.address && getUserdata.address.detail_home && getUserdata.address.detail_area
                        ? `${getUserdata.address.detail_area} ${getUserdata.address.detail_home}`
                        : '',
            receiver: getUserdata.name,
            phone   : getUserdata.phone,
        });
        const user = u.getUser();  
        const result = await Business.doOrderMethod(user, getInventory); 
        if (result.success === true) {
            console.log('ok');
            history.push('/success');
        } else {
            console.log(`${result.type}--${result.message}`);
            alert(result.message);
        }
    }

    render() {
        const { getInventory } = this.props;
        return (
            <Hoc>
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
            </Hoc>
        );
    }

    private renderMenu = (): JSX.Element => {
        const menus = [
            {
                _id: 1,
                img: 'http://net.huanmusic.com/gasha/txt-box-btn.png',
                size: '63px auto',
                position: '25% 39%',
                propsClickHandle: this.onMenuClickHandle.bind(this, 'sale')
            },
            {
                _id: 2,
                img: 'http://net.huanmusic.com/gasha/txt-box-btn.png',
                size: '63px auto',
                position: '50% 0',
                propsClickHandle: this.doOrderHandle.bind(this)
            }
        ];
        return (
            <div styleName="menu">
                <Menu
                    menus={menus} 
                    height={80}
                    iconWidth="63px"
                    iconHeight="21px"
                    menuColor="#787672"
                    menuImage="http://gacha.52toys.com/image/alert-header-bg.png"
                />
            </div>  
        );
    }
}

const InventoryHoc = CSSModules(Inventory, styles);

export const mapStateToProps = (state: Stores) => ({
    getInventory: getInventory(state),
    getUserdata : getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<InventoryActions>) => ({
    loadInventory: bindActionCreators(loadInventory, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(InventoryHoc);