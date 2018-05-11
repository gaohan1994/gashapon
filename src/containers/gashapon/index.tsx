import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import history from '../../history';
import Header from '../../components/header_gashapon';
import Hoc from '../hoc';
import Modal from './modal';
import SignModal from '../sign';
import SelectModal from './selectmodal';
import * as Numeral from 'numeral';
import * as moment from 'moment';
import config from '../../config';
import { randomNum } from '../../config/util';
// import Sign from '../../classes/sign';
import User from '../../classes/user';
import GashaponClass from '../../classes/gashapon';
import Share from '../../classes/share';
import DiscountClass,
{
    CreateDiscountPlayReturn,
} from '../../classes/discount';
import { Stores } from '../../reducers/type';
import { 
    Gashapon as GashaponType,
    GashaponProductItem as GashaponProductItemType,
} from '../../types/componentTypes';
import { Userdata } from '../../types/user';
import { 
    loadGashapon,
    changeGashaponLoading,
} from '../../actions/gashapon';
import { showSignModal } from '../../actions/status';
import { 
    getGashapon,
    getLoadingStatus,
} from '../../reducers/gashapon';
import { getUserdata } from '../../reducers/home';

interface Props {
    match: {
        params: {
            id: string;
        }
    };
    getUserdata             : Userdata;
    getGashapon             : GashaponType;
    getLoadingStatus        : boolean;
    loadGashapon            : (_id: string) => void;
    changeGashaponLoading   : (status: boolean) => void;
    showSignModal           : () => void;
}

interface State {
    audioPlaying        : boolean;
    showModal           : boolean;
    showSelectModal     : boolean;
    GashaponProductItem ?: GashaponProductItemType[];
}

/**
 * @returns 
 * @memberof Gashapon
 */
class Gashapon extends React.Component<Props, State> {

    private timer: any;

    private audio: any;

    constructor (props: Props) {
        super(props);
        this.state = {
            audioPlaying    : false,
            showModal       : false,
            showSelectModal : false,
        };
    }

    componentDidMount () {
        const { 
            match,
            loadGashapon,
        } = this.props;
        loadGashapon(match.params.id);
    }

    componentWillUnmount () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    public doGashaponHandle = async (count: number): Promise<void> => {
        const { getUserdata, getGashapon, changeGashaponLoading, showSignModal } = this.props;

        User.setUser({
            name    : getUserdata.name, 
            headimg : config.empty_pic.url, 
            remain  : getUserdata.remain
        });

        const user = User.getUser();

        if (!user.uid) {
            showSignModal();
        } else {
            
            const result = await GashaponClass.doGashaponMethod({user: user, count: count, machine: getGashapon});
            
            if (result.success === true) {
                changeGashaponLoading(true);
                this.timer = setTimeout(() => { this.timeoutHandle(result); }, 1500);
            } else {
                console.log(`${result.type}--${result.message}`);

                switch (result.message) {
                    case 'user':
                        showSignModal();
                        return;
                    case 'uid':
                        showSignModal();
                        return;
                    case 'remain':
                        history.push('/pay');
                        return;
                    default:
                        alert('扭蛋失败了~');
                        return;
                }
            }
        }
    }

    public doCollectGashaponHandle = async (): Promise<void> => {
        const { getGashapon, showSignModal } = this.props;
        const user = User.getUser();
        if (!user.uid) {
            
            /* do login stuff */
            showSignModal();
        } else {

            const result = await GashaponClass.doCollectGashaponMethod({user: user, machine: getGashapon});
            
            if (result.success === true) {
                alert('收藏成功');
                window.location.reload();
            } else {
                console.log(`${result.type}--${result.message}`);
                alert(result.message);
            }
        }
    }

    public doCancelCollectGashaponHandle = async (): Promise<void> => {
        const { getGashapon, showSignModal } = this.props;

        const user = User.getUser();
        if (!user.uid) {

            console.log('未登录');
            /* do login stuff */
            showSignModal();
        } else {

            const result = await GashaponClass.doCancelCollectGashaponMethod({user: user, machine: getGashapon});
            
            if (result.success === true) {
                alert('取消收藏成功');
                window.location.reload();
            } else {
                console.log(`${result.type}--${result.message}`);
                alert(result.message);
            }
        }
    }

    /**
     * 点击砍价按钮行为
     * 
     * @memberof Gashapon
     */
    public doDiscoutHandle = async (): Promise<void> => {
        //
        const { getGashapon, getUserdata, showSignModal } = this.props;
        // const user = User.getUser();
        
        if (!getUserdata._id) {
            /* do no sign stuff */
            showSignModal();
        } else {

            const result: CreateDiscountPlayReturn = await DiscountClass.createDiscoutPlay({
                userId      : getUserdata._id,
                machine     : getGashapon._id,
                max_discount: getGashapon.price,
                title       : getGashapon.name,
                image       : getGashapon.pics && getGashapon.pics[0]
            });

            if (result.success === true) {

                const shareConfig = {
                    url     : `http://gacha-dev.hy233.tv/discount/${result.discountId}`,
                    title   : getGashapon.name,
                    pic     : `http://${config.host.pic}/${getGashapon.pics && getGashapon.pics[0]}`
                };

                const share = new Share(shareConfig, 'weibo', '123');
                share.doShare();
            } else {
                if (result.type === 'PARAM_ERROR') {
                    switch (result.message) {
                        case 'userId':
                            return;
                        case 'machine':
                            return;
                        case 'max_discount':
                            return;
                        case 'title':
                            return;
                        case 'image':
                            return;
                        default: return;
                    }
                }
            }
        }
    }

    public timeoutHandle = (result: any) => {
        changeGashaponLoading(false);
        this.setState({
            showModal: true,
            GashaponProductItem: result.data && result.data.product_list
        });
    }

    public onTestOneTime = (): void => {
        const { getGashapon } = this.props;
        const data = getGashapon.product_list && getGashapon.product_list[randomNum(getGashapon.product_list.length)];

        this.setState({
            showModal: true,
            GashaponProductItem: [data]
        });
    }

    public doShowSelectModalHandle = (): void => {
        this.setState({
            showSelectModal: true
        });
    }

    public doHideSelectModalHandle = (): void => {
        this.setState({
            showSelectModal: false
        });
    }

    public onShowModalHandle = (): void => {
        this.setState({
            showModal: true
        });
    }

    public onHideModalHandle = (): void => {
        window.location.reload();
    }

    public handleAudioCanplay = (): void => {
        if (this.audio.paused === true) {
            this.audio.play();
        }
        this.setState({
            audioPlaying: this.audio.paused === true ? false : true
        });
    }

    public onChangeMusicHandle = (): void => {
        if (this.audio.paused === true) {
            this.audio.play();
        } else {
            this.audio.pause();
        }
        this.setState({
            audioPlaying: this.audio.paused === true ? false : true
        });
    }

    render (): JSX.Element {
        const { getGashapon } = this.props;
        return (
            <Hoc>
                <div styleName="container">
                    <SignModal/>
                    {/* http://b.hy233.tv/36fba583-9c93-4fd4-acbb-a94aaa3f82ba.aac?sign=f41ef738dc5cb6f72a4ebb80ec9cfced&t=5adeae2d */}
                    <audio
                        src={getGashapon.music_url
                            ? `http://${config.host.pic}/${getGashapon.music_url}`
                            : 'http://b.hy233.tv/36fba583-9c93-4fd4-acbb-a94aaa3f82ba.aac?sign=f41ef738dc5cb6f72a4ebb80ec9cfced&t=5adeae2d'}
                        preload="metadata"
                        autoPlay={true}
                        ref={(audio) => { this.audio = audio; }}
                        style={{width: '1px', height: '1px', visibility: 'hidden'}}
                        onCanPlay={() => this.handleAudioCanplay()}
                        loop={true}
                    />
                    {this.renderLoading()}
                    <Header/>
                    {this.renderModal()}
                    {this.redderSelectModal()}
                    <div styleName="content">
                        {this.renderName()}
                        {this.renderTime()}
                        {this.renderCollect()}
                        {this.renderMusicIcon()}
                        {this.renderDiscountButton()}
                        <i styleName="barrage"/>
                        <i styleName="chat"/>

                        <div styleName="main">
                            {/* 渲染扭蛋图片 */}
                            <div styleName="gashaponImagePart">
                                <div 
                                    styleName="centerClick"
                                    onClick={this.doShowSelectModalHandle}
                                />
                            </div>
                            <div 
                                bgimg-center="bgimg-center"
                                styleName="gashaponImg"
                                style={{backgroundImage: 
                                        getGashapon.pics && getGashapon.pics[0]
                                        ? `url(http://${config.host.pic}/${getGashapon.pics[0]})`
                                        : `url(${config.empty_pic.url})`}}
                            />
                            <i styleName="show" bgimg-center="100"/>
                            {this.renderStore()}
                            <i styleName="button1" button-attr="button-attr" onClick={() => this.doGashaponHandle(3)}/>
                            <i styleName="button2" button-attr="button-attr" onClick={() => this.doGashaponHandle(10)}/>
                            <i styleName="button3" button-attr="button-attr" onClick={() => this.onTestOneTime()}/>
                            <i styleName="button4" button-attr="button-attr" onClick={() => this.doGashaponHandle(1)}/>
                        </div>
                    </div>
                </div>
            </Hoc>
        );
    }

    private renderLoading = (): JSX.Element | string => {
        const { getLoadingStatus } = this.props;
        
        if (getLoadingStatus === true) {
            return (
                <div styleName="loading">正在扭蛋~请稍等</div>
            );
        } else {
            return '';
        }
    }

    private renderModal = (): JSX.Element => {
        const { showModal, GashaponProductItem } = this.state;
        const { getGashapon } = this.props;
        return (
            <Modal 
                display={showModal}
                onHide={this.onHideModalHandle}
                totalData={getGashapon}
                data={GashaponProductItem}
            />
        );
    }

    private redderSelectModal = (): JSX.Element => {
        const { showSelectModal } = this.state;
        const { getGashapon } = this.props;
        return (
            <SelectModal 
                display={showSelectModal}
                totalData={getGashapon}
                onHideHandle={this.doHideSelectModalHandle}
            />
        );
    }

    /**
     * 渲染扭蛋标题
     */
    private renderName = (): JSX.Element => {
        const { getGashapon } = this.props;
        return (
            <div styleName="name" word-overflow="word-overflow">
                {`${getGashapon.name || '加载中'}  
                全${(getGashapon.product_list && getGashapon.product_list.length) || 0}款`}
            </div>
        );
    }

    /**
     * 渲染扭蛋开放时间
     */
    private renderTime = (): JSX.Element => {
        const { getGashapon } = this.props;
        return (
            <div styleName="time" word-overflow="word-overflow">
                开放购买时间：{moment(getGashapon.open_time).format('YYYY-MM-DD hh:mm')}
            </div>
        );
    }

    /*渲染 是否收藏*/
    private renderCollect = (): JSX.Element | string => {
        const { getUserdata, match } = this.props;
        
        if (getUserdata.collect_machines) {
            const result = getUserdata.collect_machines 
                        && getUserdata.collect_machines.machines
                        && getUserdata.collect_machines.machines.findIndex(item => item === match.params.id);
           
            console.log('result', typeof(result) === 'number' && result !== -1);
            return (
                <i 
                    onClick={typeof(result) === 'number' && result !== -1 
                            ? this.doCancelCollectGashaponHandle
                            : this.doCollectGashaponHandle}
                    bgimg-center="100"
                    styleName="collect"
                    style={{
                        backgroundImage: typeof(result) === 'number' && result !== -1 
                                        ? `url(http://net.huanmusic.com/gasha/gashapon/%E6%94%B6%E8%97%8F%E5%90%8E.png)`
                                        : `url(http://net.huanmusic.com/gasha/gashapon/%E6%94%B6%E8%97%8F%E5%89%8D.png)`,
                        width: result === -1 ? '9vw' : '5.3vw'
                    }}
                />
            );
        } else {
            return '';
        }
    }

    /**
     * 渲染扭蛋音乐播放开关
     */
    private renderMusicIcon = (): JSX.Element => {
        return (
            <i 
                styleName="music"
                bgimg-center="100"
                onClick={() => this.onChangeMusicHandle()}
            />
        );
    }

    /**
     * 渲染扭蛋库存
     */
    private renderStore = (): JSX.Element => {
        const { getGashapon } = this.props;
        return (
            <div styleName="store">
                <span>库存：{getGashapon.residue_quantity || 0}</span>
                <span>
                    售价：{getGashapon.price 
                        ? Numeral(getGashapon.price / 100).value() 
                        : 0}元/个
                </span>
            </div>
        );
    }

    /**
     * 渲染生成砍价链接按钮
     */
    private renderDiscountButton = (): JSX.Element | string => {
        const { getGashapon } = this.props;
        if (getGashapon.is_discount === true) {
            return (
                <div 
                    styleName="discount"
                    bgimg-center="100"
                    onClick={() => this.doDiscoutHandle()}
                />
            );
        } else {
            return '';
        }        
    }
}

const GashaponHoc = CSSModules(Gashapon, styles);

const mapStateToProps = (state: Stores) => ({
    getGashapon     : getGashapon(state),
    getUserdata     : getUserdata(state),
    getLoadingStatus: getLoadingStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    loadGashapon            : bindActionCreators(loadGashapon, dispatch),
    changeGashaponLoading   : bindActionCreators(changeGashaponLoading, dispatch),
    showSignModal           : bindActionCreators(showSignModal, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GashaponHoc);