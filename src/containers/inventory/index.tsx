import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import * as styles from './index.css';
import Footer from '../../components/footer';
import GashaItem from '../../components/gashapon_inventory';
import Menu from '../../components/menu_v1';
import Hoc from '../hoc';
import { Userdata } from '../../types/user';
import history from '../../history';
import User from '../../classes/user';
import Header from '../../components/header_inventory';
import SignModal from '../sign';
import { Stores } from '../../reducers/type';
import { InventoryItem } from '../../types/componentTypes';
import { 
    InventoryActions,
    loadInventory,
    loadInventoryByWord,
    loadInventoryByGenre,
    LoadInventoryParam
} from '../../actions/inventory';
import { 
    HomeActions,
    loadUserDataFromUuid,
} from '../../actions/home';
import { showSignModal } from '../../actions/status';
import { getInventory } from '../../reducers/inventory';
import { getUserdata } from '../../reducers/home';
import { arriveFooter } from '../../config/util';
import Modal from '../../components/modal';

interface Props {
    location: {
        pathname: string;
    };
    match: {
        params: {
            word    : string;
            genre   : string;
        };
    };
    getUserdata         : Userdata;
    getInventory        : InventoryItem[];
    showSignModal       : () => void;
    loadInventory       : ({}: LoadInventoryParam) => void;
    loadInventoryByWord : ({}: LoadInventoryParam) => void;
    loadInventoryByGenre: ({}: LoadInventoryParam) => void;
    loadUserDataFromUuid: (callback?: (uid: string) => void) => void;
}

interface State {
    page: number;
    uid: string;
    showModal: boolean;
    modalValue: string;
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
            uid: '',
            showModal: false,
            modalValue: ''
        };

        this.loadUserdataCallback   = this.loadUserdataCallback.bind(this);
        this.loadInventoryCallback  = this.loadInventoryCallback.bind(this);
        this.onMenuClickHandle      = this.onMenuClickHandle.bind(this);

        this.renderErrorModal = this.renderErrorModal.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {

        const { 
            loadInventory, 
            loadInventoryByWord, 
            loadInventoryByGenre 
        } = this.props;

        const user = User.getUser();

        if (nextProps.location.pathname !== this.props.location.pathname) {
            
            if (!!nextProps.match.params.word) {

                loadInventoryByWord({
                    userId  : user.uid, 
                    word    : nextProps.match.params.word
                });
            } else if (!!nextProps.match.params.genre) {
                    
                loadInventoryByGenre({
                    userId  : user.uid, 
                    genre   : nextProps.match.params.genre
                });
            } else {
                
                loadInventory({userId: user.uid});
            }
        }
    }

    componentDidMount() {

        const {
            match,
            loadInventory,
            showSignModal,
            loadInventoryByWord,
            loadInventoryByGenre,
            
            loadUserDataFromUuid,
        } = this.props;

        const user = User.getUser();

        if (!user.userId) {
            
            /* do no id stuff */
            showSignModal();
        } else {

            loadUserDataFromUuid(this.loadUserdataCallback);
    
            arriveFooter.add('inventory', () => {

                if (!!match.params.word) {

                    loadInventoryByWord({
                        userId  : this.state.uid,
                        word    : match.params.word,
                        page    : this.state.page + 1,
                        callback: this.loadInventoryCallback
                    });
                } else if (!!match.params.genre) {
                    
                    loadInventoryByGenre({
                        userId  : this.state.uid,
                        genre   : match.params.genre,
                        page    : this.state.page + 1,
                        callback: this.loadInventoryCallback
                    });
                } else {
                    
                    loadInventory({
                        userId  : this.state.uid,
                        page    : this.state.page + 1,
                        callback: this.loadInventoryCallback
                    });
                }
            });
        }
    }

    componentWillUnmount () {
        arriveFooter.remove('inventory');
    }

    public loadUserdataCallback = (uid: string): void => {

        const { 
            loadInventoryByWord,
            loadInventoryByGenre,
            loadInventory,
            match
        } = this.props;

        this.setState({
            uid: uid
        });

        if (!!match.params.word) {

            loadInventoryByWord({
                userId  : uid, 
                word    : match.params.word
            });
        } else if (!!match.params.genre) {

            loadInventoryByGenre({
                userId  : uid, 
                genre   : match.params.genre
            });
        } else {
            
            loadInventory({
                userId: uid
            });
        }
    }

    public loadInventoryCallback = (page: number): void => {
        this.setState({
            page: page + 1
        });
    }

    public onMenuClickHandle = async (type: string): Promise <void> => {

        const { showSignModal, getUserdata, getInventory } = this.props;

        if (!getUserdata._id) {
            showSignModal();
        } else {
            if (getInventory && getInventory.length > 0) {
                history.push(`/${type}`);
            } else {
                this.setState({
                    modalValue: '暂无扭蛋前去扭蛋？'
                });
                this.onShowModal();
            }
        }
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

    public onNavHandle = (param: string) => {
        history.push(`/${param}`);
    }

    render() {
        const { getInventory, match } = this.props;
        return (
            <Hoc>

                <SignModal/>

                {this.renderErrorModal()}

                <div styleName="container">

                    <Header title={match.params.word ? match.params.word : ''}/>

                    {getInventory && getInventory.length > 0
                    ? getInventory.map((item: InventoryItem, i: number) => (
                        <div 
                            key={i}
                            styleName="item"
                        >
                            <GashaItem item={item}/>
                        </div>
                    ))
                    : ''}

                    {this.renderMenu()}
                    
                    <Footer/>
                </div>
            </Hoc>
        );
    }

    private readonly renderErrorModal = (): JSX.Element => {
        
        const { showModal, modalValue } = this.state;
        return (
            <Modal
                display={showModal}
                value={modalValue}
                onCancelClickHandle={this.onHideModal}
                onConfirmClickHandle={() => this.onNavHandle('gashapons')}
            />
        );
    }

    private readonly renderMenu = (): JSX.Element => {
        
        const { getInventory } = this.props;
        
        const menus = [
            {
                _id: 1,
                img: getInventory && getInventory.length !== 0
                    ? '//net.huanmusic.com/gasha/inventory/%E5%8F%98%E5%8D%96.png'
                    : '//net.huanmusic.com/gasha/QQ%E5%9B%BE%E7%89%8720180516170543.png',
                propsClickHandle: this.onMenuClickHandle.bind(this, 'sale')
            },
            {
                _id: 2,
                img: getInventory && getInventory.length !== 0
                    ? '//net.huanmusic.com/gasha/inventory/%E4%B8%8B%E5%8D%95.png'
                    : '//net.huanmusic.com/gasha/QQ%E5%9B%BE%E7%89%8720180516170609.png',
                propsClickHandle: this.onMenuClickHandle.bind(this, 'makeorders')
            }
        ];
        return (
            <div styleName="menu">
                <Menu
                    menus={menus}
                    iconWidth="33.33vw"
                    iconHeight="8.26vw"
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

export const mapDispatchToProps = (dispatch: Dispatch<InventoryActions | HomeActions>, state: Stores) => ({
    loadInventory       : bindActionCreators(loadInventory, dispatch),
    loadInventoryByWord : bindActionCreators(loadInventoryByWord, dispatch),
    showSignModal       : bindActionCreators(showSignModal, dispatch),
    loadInventoryByGenre: bindActionCreators(loadInventoryByGenre, dispatch),
    loadUserDataFromUuid: bindActionCreators(loadUserDataFromUuid, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(InventoryHoc);