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
import SelectModal from './selectmodal';
import * as Numeral from 'numeral';
import * as moment from 'moment';
import config from '../../config';
import { randomNum } from '../../config/util';
import Sign from '../../classes/sign';
import User from '../../classes/user';
import GashaponClass from '../../classes/gashapon';
import DiscountClass,
{
    CreateDiscountPlayReturn,
} from '../../classes/discount';
import { Stores } from '../../reducers/type';

import { 
    Gashapon as GashaponType,
    GashaponProductItem as GashaponProductItemType,
} from '../../types/componentTypes';

import { 
    Userdata
} from '../../types/user';

import { 
    loadGashapon,
    changeGashaponLoading,
} from '../../actions/gashapon';

import { 
    getGashapon,
    getLoadingStatus,
} from '../../reducers/gashapon';

import { 
    getUserdata
} from '../../reducers/home';

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
        const { getUserdata, getGashapon, changeGashaponLoading } = this.props;

        const u = new User({
            _id     : getUserdata._id, 
            name    : getUserdata.name, 
            headimg : config.empty_pic.url, 
            remain  : getUserdata.remain
        });
        const user = u.getUser();
        
        const g = new GashaponClass({user: user, count: count, machine: getGashapon});
        const result = await g.doGashaponMethod();
        
        if (result.success === true) {
            changeGashaponLoading(true);
            this.timer = setTimeout(() => { this.timeoutHandle(result); }, 1500);
        } else {
            console.log(`${result.type}--${result.message}`);
            alert(result.message);
        }
    }

    public doCollectGashaponHandle = async (): Promise<void> => {
        const { getGashapon, getUserdata } = this.props;
        const access = Sign.doCheckAuth();
        if (access.success === true) {
            const u = new User({
                _id: getUserdata._id
            });
            const user = u.getUser();
            const g = new GashaponClass({user: user, machine: getGashapon});
            const result = await g.doCollectGashaponMethod();
            
            if (result.success === true) {
                alert('收藏成功');
                window.location.reload();
            } else {
                console.log(`${result.type}--${result.message}`);
                alert(result.message);
            }
        } else {
            console.log('未登录');
            /* do login stuff */
        }
    }

    public doCancelCollectGashaponHandle = async (): Promise<void> => {
        const { getGashapon, getUserdata } = this.props;
        const access = Sign.doCheckAuth();
        if (access.success === true) {
            const u = new User({
                _id: getUserdata._id
            });
            const user = u.getUser();
            const g = new GashaponClass({user: user, machine: getGashapon});
            const result = await g.doCancelCollectGashaponMethod();
            
            if (result.success === true) {
                alert('取消收藏成功');
                window.location.reload();
            } else {
                console.log(`${result.type}--${result.message}`);
                alert(result.message);
            }
        } else {
            console.log('未登录');
            /* do login stuff */
        }
    }

    /**
     * 点击砍价按钮行为
     * 
     * @memberof Gashapon
     */
    public doDiscoutHandle = async (): Promise<void> => {
        //
        const { getGashapon } = this.props;
        const u = new User({});
        const user = u.getUser();
        if (!user.userId) {
            /* do no sign stuff */
        } else {

            const result: CreateDiscountPlayReturn = await DiscountClass.createDiscoutPlay({
                userId      : user.userId,
                machine     : getGashapon._id,
                max_discount: getGashapon.price,
                title       : getGashapon.name,
                image       : getGashapon.pics && getGashapon.pics[0]
            });

            if (result.success === true) {
                history.push(`/discount/${result.discountId}`);
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

    public handleAudioCanplay = () => {
        if (this.audio.paused === true) {
            this.audio.play();
        }
        this.setState({
            audioPlaying: this.audio.paused === true ? false : true
        });
    }

    public onChangeMusicHandle = () => {
        if (this.audio.paused === true) {
            this.audio.play();
        } else {
            this.audio.pause();
        }
        this.setState({
            audioPlaying: this.audio.paused === true ? false : true
        });
    }

    render() {
        const { getGashapon } = this.props;
        return (
            <Hoc>
                <div styleName="container">
                    <audio
                        src="http://b.hy233.tv/36fba583-9c93-4fd4-acbb-a94aaa3f82ba.aac?sign=f41ef738dc5cb6f72a4ebb80ec9cfced&t=5adeae2d"
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
                        {this.renderStore()}
                        {this.renderDiscountButton()}
                        <i styleName="show"/>
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
            const result = getUserdata.collect_machines.machines.findIndex(item => item === match.params.id);
           
            return (
                <i 
                    onClick={result === -1 
                            ? this.doCollectGashaponHandle
                            : this.doCancelCollectGashaponHandle}
                    styleName="collect" 
                    style={{
                        width: '27.5px', 
                        height: '43.5px',
                        backgroundPosition: '-58px -45px',
                        backgroundSize: '146.5px auto',
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
        const { audioPlaying } = this.state;
        return (
            <i 
                styleName="music"
                style={{
                    background: audioPlaying === true ? '#ffffff' : '#000000'
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
                {`库存${getGashapon.residue_quantity || 0}  
                ${getGashapon.price 
                    ? Numeral(getGashapon.price / 100).value() 
                    : 0}元/个`}
            </div>
        );
    }

    /**
     * 渲染生成砍价链接按钮
     */
    private renderDiscountButton = (): JSX.Element => {
        return (
            <div 
                styleName="discount"
                onClick={() => this.doDiscoutHandle()}
            >
                renderDiscountButton
            </div>
        );
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
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GashaponHoc);