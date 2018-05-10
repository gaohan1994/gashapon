import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import Text from '../text';
import { Gashapon } from '../../types/componentTypes';
import * as moment from 'moment';
import history from '../../history';
import User from '../../classes/user';
import GashaponClass from '../../classes/gashapon';

interface Props {
    gashapon: Gashapon;
}

interface State {
    showModal       : boolean;
    modalGahshapon  ?: Gashapon;
}

/**
 * 扭蛋行组件
 * 
 * @class Product
 * @extends {React.Component<Props, State>}
 */
class GashaponRow extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    public goGashaponHandle = (_id: string): void => {
        history.push(`/gashapon/${_id}`);
    }

    public doShowModalHandle = (gashapon: Gashapon): void => {
        this.setState({
            modalGahshapon  : gashapon,
            showModal       : true
        });
    }

    public doHideModalHandle = (): void => {
        this.setState({
            showModal: false
        });
    }

    public doCancelCollectGashaponHandle = async (): Promise<void> => {
        const { modalGahshapon } = this.state;
        const user = User.getUser();
        if (!user.uid) {
            /* do no sign stuff */
        } else {
            if (!!modalGahshapon) {
                const result = await GashaponClass.doCancelCollectGashaponMethod({user: user, machine: modalGahshapon});
                
                if (result.success === true) {
                    alert('取消收藏成功');
                    history.push('/my');
                } else {
                    console.log(`${result.type}--${result.message}`);
                    alert(result.message);
                }
            }
        }
    }

    render() {
        const { gashapon } = this.props;
        return (
            <div styleName="container">
                {this.renderModal()}
                <div 
                    bgimg-center="bgimg-center"
                    styleName="cover"
                    style={{
                        backgroundImage: gashapon.pics && gashapon.pics[0]
                                        ? `url(//${config.host.pic}/${gashapon.pics[0]})`
                                        : `url(${config.empty_pic.url})`
                    }}
                />
                <div styleName="detail">
                    <Text value={gashapon.name}/>
                    {this.renderTime()}
                    <Text value={`￥${gashapon.price}`}/>
                </div>

                <div styleName="footer">
                    <div styleName="button" onClick={() => this.goGashaponHandle(gashapon._id)}>扭蛋</div>
                    <div styleName="button" onClick={() => this.doShowModalHandle(gashapon)}>...</div>
                </div>
            </div>
        );
    }

    private renderTime = (): JSX.Element => {
        const { gashapon } = this.props;
        return (
            <span 
                styleName="time"
                text-font-weight="normal"
            >
                开售时间：{moment(gashapon.start_time).format('YYYY-MM-DD')}
            </span>
        );
    }

    private renderModal = (): JSX.Element => {

        const { showModal, modalGahshapon } = this.state;

        return (
            <div 
                styleName="modal"
                style={{
                    visibility  : showModal === true ? 'visible' : 'hidden',
                    opacity     : showModal === true ? 1 : 0
                }}
            >
                <div 
                    styleName="wrapper"
                    style={{bottom: showModal === true ? '0' : '-100vh'}}
                >
                    <div onClick={() => this.doCancelCollectGashaponHandle()}>取消收藏</div>
                    <div onClick={modalGahshapon && modalGahshapon._id ? () => this.goGashaponHandle(modalGahshapon._id) : () => {/**/}}>扭蛋</div>
                    <div onClick={() => this.doHideModalHandle()}>3333</div>
                </div>
            </div>
        );
    }
}

const GashaponRowHoc = CSSModules(GashaponRow, styles);

export default GashaponRowHoc;