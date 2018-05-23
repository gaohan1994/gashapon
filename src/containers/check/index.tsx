import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import history from '../../history';
import SignModal from '../sign';
import { 
    CheckActions,
    loadMonthCheckById,
    LoadMonthCheckByIdParam,
    Checks,
    ChecksItem,
} from '../../actions/check';
import { getChecks } from '../../reducers/check/index';
import { showSignModal } from '../../actions/status';
import { Reward } from '../../actions/check';
import { Userdata } from '../../types/user';
import { getUserdata } from '../../reducers/home';
import CheckClass from '../../classes/check';
import Modal from '../../components/modal';

interface Props {
    getChecks           : Checks;
    loadMonthCheckById  : ({}: LoadMonthCheckByIdParam) => void;
    getUserdata         : Userdata;
    showSignModal       : () => void;
}

interface State {
    showModal   : boolean;
    value       : string;

    showReword  : boolean;
    rewordValue : string;

    showResult  : boolean;
    resultValue : string;
    resultImg   : string;
}

class Check extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showModal   : false,
            value       : '',
            showReword  : false,
            rewordValue : '',
            showResult  : false,
            resultValue : '',
            resultImg   : ''
        };
        this.doCheckHandle = this.doCheckHandle.bind(this);
        this.onCancelHandle = this.onCancelHandle.bind(this);
        this.onConfirmHandle = this.onConfirmHandle.bind(this);      
        this.onRewordCancelHandle = this.onRewordCancelHandle.bind(this);
        this.showReward = this.showReward.bind(this);
        this.onBackHandle = this.onBackHandle.bind(this);
        this.renderItemImg = this.renderItemImg.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.onShowReword = this.onShowReword.bind(this);
        this.onHideReword = this.onHideReword.bind(this);
        this.onShowResult = this.onShowResult.bind(this);
        this.onHideResult = this.onHideResult.bind(this);         
    }

    componentDidMount(): void {

        const {
            getUserdata,
            loadMonthCheckById,
            showSignModal,
        } = this.props;

        if (!getUserdata._id) {

            /* do no sign stuff */
            showSignModal();
        } else {
            loadMonthCheckById({_id: getUserdata._id});
        }
    }

    public doCheckHandle = async (): Promise<void> => {
        const { getUserdata, showSignModal } = this.props;
        if (!getUserdata._id) {

            /* do sign stuff here */
            showSignModal();
        } else {

            const check = new CheckClass();
            const result = await check.doCheckHandle({_id: getUserdata._id});
            
            if (result.success === true) {

                /* do check ok */
                this.setState({
                    resultValue : '签到成功',
                    showResult  : true,
                    resultImg   : '//net.huanmusic.com/gasha/%E7%AD%BE%E5%88%B0%E6%88%90%E5%8A%9F1.png'
                }, () => {
                    loadMonthCheckById({_id: getUserdata._id});
                });
            } else {
                
                /* do error stuff here */
                this.setState({
                    resultValue : result.message ? result.message : '签到出错了',
                    showResult  : true,
                    resultImg   : '//net.huanmusic.com/gasha/%E9%9D%9E%E5%B8%B8%E9%81%97%E6%86%BE.png'
                });
            }
        }
    }

    public onCancelHandle = (): void => {
        this.setState({
            value: ''
        });
        this.onHideModal();
    }

    public onConfirmHandle = (): void => {
        history.push('/');
    }

    public onRewordCancelHandle = (): void => {
        this.setState({
            rewordValue: ''
        });
        this.onHideReword();
    }

    public showReward = (item: Reward): void => {
        this.setState({
            rewordValue: `满${item.condition / 100}减${item.price / 100}`
        });
        this.onShowReword();
    }

    public onBackHandle = () => {
        history.goBack();
    }

    public renderItemImg = (i: number, token: boolean): string => {
        if (token === true) {
            return '//net.huanmusic.com/gasha/%E7%BA%A2%E5%8C%851.png';
        } else {
            return '//net.huanmusic.com/gasha/%E7%BA%A2%E5%8C%851%E9%BB%91%E7%99%BD.png';
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

    public onShowReword = (): void => {
        this.setState({
            showReword: true
        });
    }

    public onHideReword = (): void => {
        this.setState({
            showReword: false
        });
    }

    public onShowResult = (): void => {
        this.setState({
            showResult: true
        });
    }

    public onHideResult = (): void => {
        this.setState({
            showResult: false
        });
    }

    render () {

        const { getChecks } = this.props;

        let num: number = 0;

        if (getChecks && getChecks.reward) {
            getChecks.reward.map(item => {
               if (!!item.user) {
                num += 1;
               } 
            });
        }

        return (
            <section styleName="container" bg-white="true">
                <SignModal/>
                {this.renderReword()}
                {this.renderModal()}
                {this.renderCheckStatusModal()}
                <i 
                    styleName="back"
                    bgimg-center="100"
                    onClick={() => this.onBackHandle()}
                />
                <div 
                    styleName="header"
                    bgimg-center="100"
                    flex-center="all-center"
                >
                    <div
                        styleName="button"
                        bgimg-center="100"
                        onClick={() => this.doCheckHandle()}
                    >
                        <span styleName="big">签到</span>
                        <span styleName="normal">
                            签到{num}天
                        </span>
                    </div>
                    {/* <span styleName="normaltext">文字</span> */}
                </div>

                <i styleName="title" bgimg-center="100"/>
                {this.renderMonthChecks()}
            </section>
        );
    }

    private readonly renderCheckStatusModal = (): JSX.Element => {
        
        const { showResult, resultValue, resultImg } = this.state;
        return (
            <div 
                styleName="result"
                onClick={this.onHideResult}
                flex-center="all-center"
                style={{
                        visibility  : showResult === true ? 'visible' : 'hidden',
                        opacity     : showResult === true ? 1 : 0
                    }}
            >
                <div styleName="bgimg"/>

                <div 
                    styleName="resultBox"
                    style={{backgroundImage: `url(${resultImg})`}}
                    bgimg-center="100"
                >
                    <span styleName="resultText">{resultValue}</span>
                </div>
            </div>
        );
    }

    private readonly renderModal = (): JSX.Element => {

        const { showModal, value } = this.state;
        return (
            <Modal
                display={showModal}
                value={value}
                onCancelClickHandle={this.onCancelHandle}
                onConfirmClickHandle={this.onConfirmHandle}
            />
        );
    }

    private readonly renderReword = (): JSX.Element => {
        
        const { showReword, rewordValue } = this.state;
        return (
            <Modal
                display={showReword}
                value={rewordValue}
                onConfirmClickHandle={this.onRewordCancelHandle}
            />
        );
    }

    private readonly renderMonthChecks = (): JSX.Element => {
        const { getChecks } = this.props;

        /* 
            today   是今天的日期    用来判断每个item的样式 1-31
            weekDay 是周几         用来判断第一个日期起始位置 1-7
        */
        const today = new Date().getDate();
        let style = '';
        
        const result = getChecks.reward 
        ? getChecks.reward.map((item: ChecksItem, i: number) => {
            
            if (today < item.day) {
                /* 过期 */
                style = 'past';
            } else if (today === item.day) {
                /* 今天 */
                style = 'now';
            } else if (today > item.day) {
                /* 未来 */
                style = 'future';
            }

            return (
                <div 
                    key={i}
                    styleName={style}
                    check-item="check-item"
                    flex-center="all-center"
                    check-border-top={i < 6 ? 'true' : ''}
                    onClick={() => this.showReward(item.reward)}
                >
                    <span 
                        styleName="bge"
                        bgimg-center="100"
                    >
                        {i + 1}
                    </span>
                    <i 
                        styleName="checkimg"
                        bgimg-center="100"
                        style={{
                            backgroundImage: `url(${this.renderItemImg(i, item.user ? true : false)})`
                        }}
                    />
                    {item.user
                    ? <span>已领</span>
                    : <span>未领</span>}
                </div>
            );
        }) 
        : '';

        return (
            <div styleName="box">
                {result}
            </div>
        );
    }
}

const CheckHoc = CSSModules(Check, styles);

export const mapStateToProps = (state: Stores) => ({
    getChecks   : getChecks(state),
    getUserdata : getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<CheckActions>, state: Stores) => ({
    loadMonthCheckById  : bindActionCreators(loadMonthCheckById, dispatch),
    showSignModal       : bindActionCreators(showSignModal, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CheckHoc);