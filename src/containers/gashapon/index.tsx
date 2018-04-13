import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Header from '../../components/header_gashapon';
import Hoc from '../hoc';
import Modal from './modal';
import SelectModal from './selectmodal';
import * as Numeral from 'numeral';
import * as moment from 'moment';
import config from '../../config';
import { randomNum } from '../../config/util';
import User from '../../classes/user';
import GashaponClass from '../../classes/gashapon';
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
    getUserdata : Userdata;
    getGashapon : GashaponType;
    loadGashapon: (_id: string) => void;
    changeGashaponLoading: (status: boolean) => void;
    getLoadingStatus: boolean;
}

interface State {
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

    constructor (props: Props) {
        super(props);
        this.state = {
            showModal: false,
            showSelectModal: false,
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

    render() {
        const { getGashapon } = this.props;
        return (
            <Hoc>
                <div styleName="container">
                    {this.renderLoading()}
                    <Header/>
                    {this.renderModal()}
                    {this.redderSelectModal()}
                    <div styleName="content">
                        {this.renderName()}
                        {this.renderTime()}
                        <i 
                            styleName="collect" 
                            style={{
                                width: '27.5px', 
                                height: '43.5px',
                                backgroundPosition: '-58px -45px',
                                backgroundSize: '146.5px auto',
                            }}
                        />
                        <i styleName="music"/>
                        {this.renderStore()}
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

    private doGashaponHandle = async (count: number): Promise<void> => {
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

    private timeoutHandle = (result: any) => {
        changeGashaponLoading(false);
        this.setState({
            showModal: true,
            GashaponProductItem: result.data && result.data.product_list
        });
    }

    private onTestOneTime = (): void => {
        const { getGashapon } = this.props;
        const data = getGashapon.product_list && getGashapon.product_list[randomNum(getGashapon.product_list.length)];

        this.setState({
            showModal: true,
            GashaponProductItem: [data]
        });
    }

    private doShowSelectModalHandle = (): void => {
        this.setState({
            showSelectModal: true
        });
    }

    private doHideSelectModalHandle = (): void => {
        this.setState({
            showSelectModal: false
        });
    }

    private onShowModalHandle = (): void => {
        this.setState({
            showModal: true
        });
        console.log('onShowModalHandle', this.onShowModalHandle);
    }

    private onHideModalHandle = (): void => {
        window.location.reload();
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
        console.log('showSelectModal', showSelectModal);
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
                {`${getGashapon.name}  全${getGashapon.product_list && getGashapon.product_list.length}款`}
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

    /**
     * 渲染扭蛋库存
     */
    private renderStore = (): JSX.Element => {
        const { getGashapon } = this.props;
        return (
            <div styleName="store">
                {`库存${getGashapon.residue_quantity}  
                ${getGashapon.price 
                    ? Numeral(getGashapon.price / 100).value() 
                    : 0}元/个`}
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