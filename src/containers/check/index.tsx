import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';

import { 
    CheckActions,
    loadMonthCheckById,
    LoadMonthCheckByIdParam,
    Checks,
    ChecksItem,
} from '../../actions/check';
import {
    getChecks,
} from '../../reducers/check/index';

import Header from '../../components/haeder_set';
import CheckClass from '../../classes/check';
import User from '../../classes/user';
import Button from '../../components/button';
import Modal from '../../components/modal';

interface Props {
    getChecks           : Checks;
    loadMonthCheckById  : ({}: LoadMonthCheckByIdParam) => void;
}

interface State {
    showModal: boolean;
}

class Check extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    componentDidMount() {
        const {

            loadMonthCheckById,
        } = this.props;

        const user  = User.getUser();

        if (!user.userId) {
            /* do no sign stuff */
            this.setState({
                showModal: true
            });
        } else {
            loadMonthCheckById({_id: user.userId});
        }
    }

    public doCheckHandle = async (): Promise<void> => {

        const user  = User.getUser();

        if (!user.userId) {
            this.setState({
                showModal: true
            });
            /* do sign stuff here */
        } else {

            const check = new CheckClass();
            const result = await check.doCheckHandle({_id: user.userId});
            
            if (result.success === true) {
                /* do check ok */
                
            } else {
                /* do error stuff here */
            }
        }
    }

    public showReward = (): void => {
        //
    }

    public showModal = (): void => {
        this.setState({
            showModal: true
        });
    }

    public hideModal = (): void => {
        this.setState({
            showModal: false
        });
    }

    render () {
        const { showModal } = this.state;
        return (
            <section 
                container-with-header="true"
            >
                <Modal
                    display={showModal}
                    value="请登录后操作"
                    onCancelClickHandle={this.hideModal}
                    onConfirmClickHandle={this.hideModal}
                />
                <Header title="每日签到"/>
                {this.renderMonthChecks()}
                {this.renderAccumulateReward()}
                {this.renderFooter()}
            </section>
        );
    }

    private renderMonthChecks = (): JSX.Element => {
        const { getChecks } = this.props;

        /* 
            today   是今天的日期    用来判断每个item的样式 1-31
            weekDay 是周几         用来判断第一个日期起始位置 1-7
        */
        const today = new Date().getDate();

        const date = new Date();
        date.setDate(1);
        const weekDay = date.getDay();
        
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
                    style={{
                        marginLeft: i === 0
                                    ? `${weekDay * 12}vw`
                                    : ''
                    }}
                    check-item="check-item"
                    onClick={() => this.showReward()}
                >
                    {item.day}
                    {item.user
                    ? '已领'
                    : '未领'}
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

    private renderAccumulateReward = (): JSX.Element => {

        const { } = this.props;

        return (
            <div styleName="rewardBox">
                renderAccumulateReward
            </div>
        );
    }

    private renderFooter = (): JSX.Element => {
        return (
            <div 
                styleName="footer"
                flex-center="all-center"
            >
                <Button 
                    btnText="签到"
                    btnSize="small"
                    clickHandle={this.doCheckHandle}
                />
            </div>
        );
    }
}

const CheckHoc = CSSModules(Check, styles);

export const mapStateToProps = (state: Stores) => ({
    getChecks: getChecks(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<CheckActions>, state: Stores) => ({
    loadMonthCheckById  : bindActionCreators(loadMonthCheckById, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CheckHoc);