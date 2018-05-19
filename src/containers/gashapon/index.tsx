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
import ErrorModal from '../../components/modal';
import DiscountModal from '../../components/modal';
import SignModal from '../sign';
import SelectModal from './selectmodal';
import * as Numeral from 'numeral';
import * as moment from 'moment';
import config from '../../config';
import { randomNum } from '../../config/util';
import User from '../../classes/user';
import GashaponClass from '../../classes/gashapon';
import Share from '../../classes/share';
import ShareModal, { ShareType } from '../../components/share';
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
    loadGashaponDiscountById,
} from '../../actions/gashapon';
import { 
    StatusActions,
    showSignModal,
    showShareModal,
} from '../../actions/status';
import { 
    getGashapon,
    getLoadingStatus,
    getDiscount,
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
    showShareModal          : () => void;
    loadGashaponDiscountById: (uid: string, id: string) => void;
    getDiscount             : number;
}

interface State {
    audioPlaying        : boolean;
    showModal           : boolean;
    showSelectModal     : boolean;
    gashaponProductItem ?: GashaponProductItemType[];
    showDiscountModal   : boolean;
    errorModal          : boolean;
    modalValue          : string;
}

/**
 * @returns 
 * @memberof Gashapon
 */
class Gashapon extends React.Component<Props, State> {

    /* 计时器 */
    private timer: any;

    /* 背景音乐 */
    private audio: any;

    /* 掉落的音乐 */
    private drop: any;

    /* 成功的音效  */
    private success: any;

    constructor (props: Props) {
        super(props);
        this.state = {
            audioPlaying        : false,
            showModal           : false,
            showSelectModal     : false,
            showDiscountModal   : false,
            gashaponProductItem : [],

            errorModal          : false,
            modalValue          : '',
        };

        this.onDiscountGashaponClickHandle = this.onDiscountGashaponClickHandle.bind(this);
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

    public onDiscountGashaponClickHandle = async (): Promise <void> => {
        
        const { getDiscount } = this.props;

        const discount = {
            discount    : getDiscount,
            is_discount : true
        };

        this.doGashaponHandle(1, discount);
    }

    public doGashaponHandle = async (count: number, discount?: {discount: number, is_discount: boolean}): Promise<void> => {

        const { 
            getUserdata, 
            getGashapon, 
            showSignModal,
            changeGashaponLoading
        } = this.props;

        this.hideAll();

        User.setUser({
            name    : getUserdata.name, 
            headimg : config.empty_pic.url, 
            remain  : getUserdata.remain
        });

        const user = User.getUser();

        if (!user.uid) {

            showSignModal();
        } else {

            const result = await GashaponClass.doGashaponMethod({
                user    : user, 
                count   : count, 
                machine : getGashapon,
                discount: discount
            });
            
            if (result.success === true) {
                this.setState({
                    gashaponProductItem: result.data
                });
                this.handleDropPlay();
                changeGashaponLoading(true);
                this.timer = setTimeout(() => { this.timeoutHandle(result); }, 1500);
            } else {

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
                        this.setState({
                            modalValue:  `扭蛋失败了~`
                        });
                        this.onShowErrorModal();
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

            const result = await GashaponClass.doCollectGashaponMethod({
                user    : user, 
                machine : getGashapon
            });
            
            if (result.success === true) {
                
                window.location.reload();
            } else {
                console.log(`${result.type}--${result.message}`);
                this.setState({
                    modalValue: result.message ? result.message : '收藏失败'
                });
                this.onShowErrorModal();
            }
        }
    }

    public doCancelCollectGashaponHandle = async (): Promise<void> => {
        const { getGashapon, showSignModal } = this.props;

        const user = User.getUser();
        if (!user.uid) {

            /* do login stuff */
            showSignModal();
        } else {

            const result = await GashaponClass.doCancelCollectGashaponMethod({
                user    : user, 
                machine : getGashapon
            });
            
            if (result.success === true) {
                window.location.reload();
            } else {
                console.log(`${result.type}--${result.message}`);
                this.setState({
                    modalValue: result.message ? result.message : '收藏失败'
                });
                this.onShowErrorModal();
            }
        }
    }

    /**
     * 点击砍价按钮行为
     * 
     * @memberof Gashapon
     */
    public doDiscoutHandle = async (type: ShareType): Promise<void> => {
        const { getGashapon, getUserdata, showSignModal } = this.props;
        // const user = User.getUser();
        
        if (!type) {
            this.setState({
                modalValue: '请选择分享渠道'
            });
            this.onShowErrorModal();
            return;
        }

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
                    url     : `${config.url}/discount/${result.discountId}`,
                    title   : getGashapon.name,
                    pic     : `http://${config.host.pic}/${getGashapon.pics && getGashapon.pics[0]}`
                };

                const share = new Share(shareConfig, type);
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
        this.handleSuccessPlay();
        this.setState({
            showModal: true
        });
    }

    public onTestOneTime = (): void => {

        const { getGashapon } = this.props;
        const data = getGashapon.product_list && getGashapon.product_list[randomNum(getGashapon.product_list.length)];
        this.handleDropPlay();
        this.setState({
            showModal           : true,
            gashaponProductItem : [data]
        });
    }

    public hideAll = (): void => {

        this.setState({
            showDiscountModal   : false,
            showModal           : false,
            showSelectModal     : false,
            errorModal          : false
        });
    }

    public onShowErrorModal = (): void => {
        this.setState({
            errorModal: true
        });
    }

    public onHideErrorModal = (): void => {
        this.setState({
            errorModal: false
        });
    }

    public onShowDiscountModal = (): void => {

        const { loadGashaponDiscountById, match } = this.props;
        const user = User.getUser();

        loadGashaponDiscountById(user.uid, match.params.id);

        this.setState({
            showDiscountModal: true
        });
    }

    public onHideDiscountModal = (): void => {
        this.setState({
            showDiscountModal: false
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

    public handleDropPlay = (): void => {
        
        if (this.drop.paused === true) {
            this.drop.play();
        }
    }

    public handleSuccessPlay = (): void => {
        
        if (this.success.paused === true) {
            this.success.play();
        }
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

    public goGashaponShow = (_id: string): void => {
        history.push(`/show/${_id}`);
    }

    render (): JSX.Element {
        const { errorModal, modalValue } = this.state;
        const { getGashapon } = this.props;
        return (
            <Hoc>
                <div styleName="container">
                    <audio
                        src={'http://net.huanmusic.com/gasha/%E6%8E%89%E8%90%BD%E9%9F%B3%E6%95%88.mp3'}
                        preload="metadata"
                        autoPlay={false}
                        ref={(drop) => { this.drop = drop; }}
                        style={{width: '1px', height: '1px', visibility: 'hidden'}}
                    />

                    <audio
                        src={'http://net.huanmusic.com/gasha/123%E9%9F%B3%E6%95%88.mp3'}
                        preload="metadata"
                        autoPlay={false}
                        ref={(success) => { this.success = success; }}
                        style={{width: '1px', height: '1px', visibility: 'hidden'}}
                    />

                    <ErrorModal
                        display={errorModal}
                        value={modalValue}
                        onCancelClickHandle={this.onHideErrorModal}
                        onConfirmClickHandle={this.onHideErrorModal}
                    />
                    <SignModal/>
                    <ShareModal propsClickHandle={this.doDiscoutHandle}/>
                    {this.renderDiscountModal()}
                    {this.renderLoading()}
                    <Header/>
                    {this.renderModal()}
                    {this.redderSelectModal()}
                    <div styleName="content">
                        {this.renderName()}
                        {this.renderTime()}
                        {this.renderCollect()}
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
                            <i styleName="show" bgimg-center="100" onClick={() => this.goGashaponShow(getGashapon._id)}/>
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

        const { showModal, gashaponProductItem } = this.state;
        const { getGashapon } = this.props;

        return (
            <Modal 
                display={showModal}
                onHide={this.onHideModalHandle}
                totalData={getGashapon}
                data={gashaponProductItem}
            />
        );
    }

    private renderDiscountModal = (): JSX.Element => {

        const { showDiscountModal } = this.state;
        const { showShareModal, getDiscount, getGashapon } = this.props;

        const now   = getDiscount;
        const total = getGashapon.discount_plan && getGashapon.discount_plan.max_discount;

        const current = (Numeral(now / total).value()) * 100;	

        return (
            <DiscountModal
                display={showDiscountModal}
                headerValue="我的砍价"
                cancelButtonText="我要扭蛋"
                confirmButtonText="分享砍价"
                onCancelClickHandle={this.onDiscountGashaponClickHandle}
                onConfirmClickHandle={showShareModal}
            >
                <div 
                    styleName="progress"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgb(254, 162, 112) ${current}%, rgba(255, 255, 255) 0%)`
                    }}
                >
                    <span>{Numeral(getDiscount / 100).format('0.00')} / {Numeral(total / 100).format('0.00')}</span>
                </div>
            </DiscountModal>
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
                        && getUserdata.collect_machines
                        && getUserdata.collect_machines.findIndex(item => item._id === match.params.id);
            
            return (
                <i 
                    onClick={typeof(result) === 'number' && result !== -1 
                            ? this.doCancelCollectGashaponHandle
                            : this.doCollectGashaponHandle}
                    bgimg-center="100"
                    styleName={typeof(result) === 'number' && result !== -1 
                                ? 'notcollect'
                                : 'collect'}
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

        const { audioPlaying } = this.state;
        return (
            <i 
                styleName="music"
                bgimg-center="100"
                style={{
                    backgroundImage: audioPlaying === true
                                    ? 'url(http://net.huanmusic.com/gasha/gashapon/%E9%9F%B3%E4%B9%90%E5%9C%86.png)'
                                    : 'url(http://net.huanmusic.com/gasha/%E7%81%B0%E8%89%B2%E9%9F%B3%E4%B9%90%E5%9C%86.png)'
                }}
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
        
        const { getGashapon, /*showShareModal*/ } = this.props;
        if (getGashapon.is_discount === true) {
            return (
                <div 
                    styleName="discount"
                    bgimg-center="100"
                    onClick={this.onShowDiscountModal}
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
    getDiscount     : getDiscount(state),
});

const mapDispatchToProps = (dispatch: Dispatch<MainActions | StatusActions>) => ({
    loadGashapon            : bindActionCreators(loadGashapon, dispatch),
    changeGashaponLoading   : bindActionCreators(changeGashaponLoading, dispatch),
    showSignModal           : bindActionCreators(showSignModal, dispatch),
    showShareModal          : bindActionCreators(showShareModal, dispatch),
    loadGashaponDiscountById: bindActionCreators(loadGashaponDiscountById, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GashaponHoc);