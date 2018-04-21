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
import Header from '../../components/header_inventory';
import { Stores } from '../../reducers/type';
import { 
    Gashapon
} from '../../types/componentTypes';
import { InventoryActions } from '../../actions/inventory';
import { 
    loadInventory,
    loadInventoryByWord,
    LoadInventoryParam,
} from '../../actions/inventory';

import { 
    getInventory
} from '../../reducers/inventory';

import { 
    getUserdata
} from '../../reducers/home';
import { arriveFooter } from '../../config/util';

interface Props {
    location: {
        pathname: string;
    };
    match: {
        params: {
            word: string;
        };
    };
    getUserdata     : Userdata;
    getInventory    : Gashapon[];
    loadInventory   : ({}: LoadInventoryParam) => void;
    loadInventoryByWord: ({}: LoadInventoryParam) => void;
}

interface State {
    page: number;
}

/**
 * @returns 
 * @memberof Inventory
 * 蛋柜：抽到扭蛋之后但是还没有下单的页面
 * render:
 */
class Inventory extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            page: 0,
        };
    }

    componentWillReceiveProps(nextProps: any) {
        const { loadInventory, loadInventoryByWord } = this.props;
        const u = new User({});
        const user = u.getUser();
        if (nextProps.location.pathname !== this.props.location.pathname) {
            
            if (!!nextProps.match.params.word) {

                loadInventoryByWord({userId: user.userId, word: nextProps.match.params.word});
            } else {
                
                loadInventory({userId: user.userId});
            }
        }
     }

    componentDidMount() {
        const { 
            match,
            loadInventory,
        } = this.props;

        const u = new User({});
        const user = u.getUser();

        if (!user.userId) {
            /* do no id stuff */
        } else {
            if (!!match.params.word) {

                loadInventoryByWord({userId: user.userId, word: match.params.word});
            } else {
                
                loadInventory({userId: user.userId});
            }
    
            arriveFooter.add('inventory', () => {
    
                if (!!match.params.word) {

                    loadInventoryByWord({
                        userId: user.userId, 
                        word: match.params.word,
                        page: this.state.page + 1,
                        callback: this.loadInventoryCallback
                    });
                } else {
                    
                    loadInventory({
                        userId  : user.userId,
                        page    : this.state.page + 1,
                        callback: this.loadInventoryCallback
                    });
                }
            });
        }
    }

    public loadInventoryCallback = (page: number): void => {
        this.setState({
            page: page + 1
        });
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
        const { getInventory, match } = this.props;
        return (
            <Hoc>
                <div styleName="container">
                    <Header title={match.params.word ? match.params.word : ''}/>
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

export const mapDispatchToProps = (dispatch: Dispatch<InventoryActions>, state: Stores) => ({
    loadInventory: bindActionCreators(loadInventory, dispatch),
    loadInventoryByWord: bindActionCreators(loadInventoryByWord, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(InventoryHoc);