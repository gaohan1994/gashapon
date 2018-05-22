import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import config from '../../config/index';
import * as numeral from 'numeral';
import { 
    DiscountActions,
    loadDiscountData,
    LoadDiscountDataParam,
} from '../../actions/discount';
import { 
    StatusActions,
    showSignModal,
} from '../../actions/status';
import { getDiscountData } from '../../reducers/discount';
import { getUserdata } from '../../reducers/home';
import { Userdata } from '../../types/user';
import { DiscountDataType } from '../../types/componentTypes';
import DiscountClass,
{
    HelpDiscountMethodReturn
} from '../../classes/discount';
import SignModal from '../sign';
import history from '../../history';
import Hoc from '../hoc';
import Modal from '../../components/modal';
import Meter from '../../components/meter';

interface Props {
    match: {
        params: {
            id: string;
        }
    };
    loadDiscountData: ({}: LoadDiscountDataParam) => void;
    getDiscountData : DiscountDataType;
    getUserdata     : Userdata;
    showSignModal   : () => void;
}

interface State {
    showModal   : boolean;
    modalValue  : string;
}

interface DiscountItem {
    customer_id : string;
    discount    : number;
    image       : string;
    nick        : string;
}

/* 5ae3e0bfce432fc877c64b3d */
class Discount extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showModal   : false,
            modalValue  : ''
        };
        this.onShowModal = this.onShowModal.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.doHelpDiscoutHandle = this.doHelpDiscoutHandle.bind(this);
        this.goGashaponHandle = this.goGashaponHandle.bind(this);
    }

    componentDidMount (): void {
        
        const { 
            match,
            loadDiscountData,
        } = this.props;

        if (match.params && match.params.id) {

            loadDiscountData({id: match.params.id});
        } else {

            process.env.NODE_ENV === 'production'
            ? window.location.href = '//gacha.hy233.tv'
            : window.location.href = '//gacha-dev.hy233.tv';
        }
    }

    public onShowModal = (): void => {

        this.setState({
            showModal: true
        });
    }

    public onHideModal = (): void => {

        this.setState({
            modalValue  : '',
            showModal   : false
        });
    }

    public doHelpDiscoutHandle = async (): Promise<void> => {
        
        /* userId, discountId, nick, image */
        const { 
            getDiscountData, 
            match, 
            showSignModal, 
            getUserdata,
            loadDiscountData
        } = this.props;

        if (!getUserdata._id) {

            /* do no sign stuff */
            showSignModal();
        } else {

            const result: HelpDiscountMethodReturn = await DiscountClass.helpDiscountMethod({
                userId      : getUserdata._id,
                discountId  : match.params.id,
                nick        : getUserdata.name ? getUserdata.name : '',
                image       : getDiscountData.image
            });

            if (result.success === true) {
                
                /* do ok stuff */
                if (result.result) {
                    this.setState({
                        modalValue: `成功帮忙砍价${result.result / 100}元 `
                    });
                    this.onShowModal();
                    loadDiscountData({id: match.params.id});
                } else {
                    this.setState({
                        modalValue: `成功砍价`
                    });
                    this.onShowModal();
                    loadDiscountData({id: match.params.id});
                }
            } else {
                
                if (result.type === 'PARAM_ERROR') {

                    switch (result.message) {
                        case 'userId':
                            return;
                        case 'discountId':
                            return;
                        case 'nick':
                            return;
                        case 'image':
                            return;
                        default: return;
                    }
                } else {
                    this.setState({
                        modalValue: result.message ? result.message : '砍价失败~'
                    });
                    this.onShowModal();
                }
            }
        }
    }

    public goGashaponHandle = (): void => {

        const { getDiscountData } = this.props;

        if (!!getDiscountData.machine) {

            history.push(`/gashapon/${getDiscountData.machine}`);
        } else {

            this.setState({
                modalValue: '没有该扭蛋机!'
            });
            this.onShowModal();
        }
    }

    render (): JSX.Element {

        const { showModal, modalValue } = this.state;
        const { getDiscountData } = this.props;

        return (
            <Hoc>
                <div 
                    styleName="container"
                    bg-white="true"
                >
                    <Modal 
                        display={showModal}
                        value={modalValue}
                        onConfirmClickHandle={this.onHideModal}
                    />
                    <i 
                        styleName="home"
                        bgimg-center="100"
                    />
                    <SignModal
                        refereeid={getDiscountData.user}
                    />
                    <i 
                        styleName="bgimg"
                        bgimg-center="100"
                    />

                    <div styleName="content">
                        {/* <Login/>
                        <Registe/> */}
                        <img 
                            styleName="logo" 
                            alt="嘀哩扭蛋" 
                            src="http://net.huanmusic.com/gasha/discount/%E5%A5%BD%E5%8F%8B%E7%A0%8D%E4%BB%B7.png"
                        />
                        
                        <div styleName="coverbox">
                            <span 
                                styleName="cover" 
                                bgimg-center="bgimg-center"
                                onClick={() => this.goGashaponHandle()}
                                style={{
                                    backgroundImage: getDiscountData.image 
                                                    ? `url(http://${config.host.pic}/${getDiscountData.image})`
                                                    : `url(${config.empty_pic.url})`
                                }}
                            />
                            <span styleName="name">{getDiscountData.title}</span>
                        </div>

                        <div styleName="buttons">
                            <button 
                                styleName="button"
                                bgimg-center="100"
                                style={{backgroundImage: `url(http://net.huanmusic.com/gasha/discount/%E5%B8%AETA%E7%A0%8D%E4%BB%B7.png)`}}
                                onClick={() => this.doHelpDiscoutHandle()}
                            />
                            <button 
                                styleName="button"
                                bgimg-center="100"
                                style={{backgroundImage: `url(http://net.huanmusic.com/gasha/discount/%E6%88%91%E4%B9%9F%E6%83%B3%E8%A6%81.png)`}}
                                onClick={() => this.goGashaponHandle()}
                            />
                        </div>

                        <div 
                            styleName="progress"
                            flex-center="all-center"
                        >
                            {this.renderProgress()}
                            <span styleName="progresstext">
                                {getDiscountData.sum
                                ? numeral(getDiscountData.sum / 100).format('0.00')
                                : 0}
                                /
                                {getDiscountData.sum
                                ? numeral(getDiscountData.max_discount / 100).format('0.00')
                                : 1}
                            </span>
                        </div>

                        <div 
                            styleName="colorbox"
                        >
                            <span styleName="title">{`---- 砍价详情 ----`}</span>
                            {getDiscountData.detail && getDiscountData.detail.length > 0
                            ? getDiscountData.detail.map((item: DiscountItem, i) => {
                                return this.renderDiscountItem(item, i);
                            })
                            : ''}
                        </div>
                        
                        <div styleName="colorbox">
                            <span styleName="title">{`---- 活动详情 ----`}</span>
                            <span>1.每位用户注册或登录成功后即可为好友随机砍价；</span>
                            <span>2.随机砍价减免金额仅限本次商品当日内购买有效，若当日内用户最终放弃购买，则砍价金额失效，需重新发起；</span>
                            <span>3.用户完成帮好友砍价后，点击“我也想要”即可发起自己的砍价行为；</span>
                            <span>4.每次砍价最低可砍至0元，需发起更多好友一起助力；</span>
                            <span>5.嘀哩扭蛋保留法律范围内允许的对活动的解释权。</span>
                        </div>
                    </div>
                </div>
            </Hoc>
        );
    }

    private readonly renderDiscountItem = (item: DiscountItem, i: number): JSX.Element => {

        return (
            <div 
                styleName="item"
                key={i}
            >
                <span 
                    styleName="avator"
                    bgimg-center="bgimg-center"
                    style={{
                        backgroundImage: item.image 
                                        ? `url(http://${config.host.pic}/${item.image})`
                                        : `url(${config.empty_pic.url})`
                    }}
                />
                <span styleName="username" word-overflow="word-overflow">{item.nick}</span>
                <span styleName="userdiscount">砍掉{` ${numeral(item.discount / 100).format('0.00')} `}元</span>
                <i styleName="dicounticon" bgimg-center="100"/>
            </div>
        );
    }

    private readonly renderProgress = (): JSX.Element => {
    
        const { getDiscountData } = this.props;

        const now   = getDiscountData && getDiscountData.sum ? getDiscountData.sum : 0;
        const total = getDiscountData && getDiscountData.max_discount ? getDiscountData.max_discount : 1;	
            
        const current = numeral(now / total).value();
        // return `linear-gradient(to right, rgb(156, 248, 5) ${current}%, rgba(255, 255, 255) 0%)`;
        return (
            <Meter
                percent={current}
                width={300}
                height={15}
                color="#9cff05"
            />
        );
    }
}

const DiscountHoc = CSSModules(Discount, styles);

export const mapStateToProps = (state: Stores) => ({
    getDiscountData : getDiscountData(state),
    getUserdata     : getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<DiscountActions | StatusActions>) => ({
    loadDiscountData: bindActionCreators(loadDiscountData, dispatch),
    showSignModal   : bindActionCreators(showSignModal, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DiscountHoc);