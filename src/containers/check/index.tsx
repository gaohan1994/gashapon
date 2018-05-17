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
}

class Check extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showModal   : false,
            value       : '',

            showReword  : false,
            rewordValue : '',
        };
    }

    componentDidMount() {
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
                    value       : '签到成功',
                    showModal   : true
                });
            } else {
                
                /* do error stuff here */
                this.setState({
                    value       : result.message ? result.message : '签到出错了',
                    showModal   : true
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
            return 'http://net.huanmusic.com/gasha/%E7%BA%A2%E5%8C%851.png';
        } else {
            return 'http://net.huanmusic.com/gasha/%E7%BA%A2%E5%8C%851%E9%BB%91%E7%99%BD.png';
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
            <section styleName="container">
                <SignModal/>
                {this.renderReword()}
                {this.renderModal()}
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

    private renderModal = (): JSX.Element => {

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

    private renderReword = (): JSX.Element => {
        
        const { showReword, rewordValue } = this.state;
        return (
            <Modal
                display={showReword}
                value={rewordValue}
                onCancelClickHandle={this.onRewordCancelHandle}
                onConfirmClickHandle={this.onRewordCancelHandle}
            />
        );
    }

    private renderMonthChecks = (): JSX.Element => {
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