import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Header from '../../components/header_gashapon';
import Modal from './modal';
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
    loadGashapon
} from '../../actions/gashapon';

import { 
    getGashapon
} from '../../reducers/gashapon';

interface Props {
    match: {
        params: {
            id: string;
        }
    };
    getGashapon : GashaponType;
    loadGashapon: (_id: string) => void;
}

interface State {
    showModal           : boolean;
    GashaponProductItem ?: GashaponProductItemType;
}

/**
 * @returns 
 * @memberof Gashapon
 */
class Gashapon extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    componentDidMount() {
        const { 
            match,
            loadGashapon,
        } = this.props;
        loadGashapon(match.params.id);
    }

    render() {
        const { getGashapon } = this.props;
        return (
            <div styleName="container">
                <Header/>
                {this.renderModal()}
                <div styleName="content">
                    {this.renderName()}
                    {this.renderTime()}
                    <i styleName="collect"/>
                    <i styleName="music"/>
                    {this.renderStore()}
                    <i styleName="show"/>
                    <i styleName="barrage"/>
                    <i styleName="chat"/>

                    <div styleName="main">
                        {/* 渲染扭蛋图片 */}
                        <div 
                            bgimg-center="bgimg-center"
                            styleName="gashaponImg"
                            style={{backgroundImage: 
                                    getGashapon.pics && getGashapon.pics[0]
                                    ? `url(http://${config.host.pic}/${getGashapon.pics[0]})`
                                    : `url(${config.empty_pic.url})`}}
                        />
                        <i styleName="button1" button-attr="button-attr" onClick={() => this.doGashaponHandle(1)}/>
                        <i styleName="button2" button-attr="button-attr" onClick={() => this.doGashaponHandle(2)}/>
                        <i styleName="button3" button-attr="button-attr" onClick={() => this.onTestOneTime()}/>
                        <i styleName="button4" button-attr="button-attr" onClick={() => this.doGashaponHandle(3)}/>
                    </div>
                </div>
            </div>
        );
    }

    private doGashaponHandle = async (count: number): Promise<void> => {
        const { match } = this.props;
        const u = new User({_id: '5ac1f31087e83ef4915abc02', name: 'Ghan', headimg: '1'});
        const user = u.getGashaponUser();
        const g = new GashaponClass({user: user, count: count, machineId: match.params.id});
        const result = await g.doGashaponMethod();
        if (result.success === true) {
            console.log('ok');
            this.setState({
                showModal: true,
                GashaponProductItem: result.data && result.data.product_list && result.data.product_list[0]
            });
        } else {
            console.log(`${result.type}--${result.message}`);
            alert(result.message);
        }
    }

    private onTestOneTime = (): void => {
        const { getGashapon } = this.props;
        const data = getGashapon.product_list && getGashapon.product_list[randomNum(getGashapon.product_list.length)];
        console.log('data', data);
        this.setState({
            showModal: true,
            GashaponProductItem: data
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
        // this.setState({
        //     showModal: false
        // });
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
            <div styleName="store">{`库存${getGashapon.residue_quantity}  ${getGashapon.price}元/个`}</div>
        );
    }
}

const GashaponHoc = CSSModules(Gashapon, styles);

const mapStateToProps = (state: Stores) => ({
    getGashapon: getGashapon(state),
});

const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    loadGashapon: bindActionCreators(loadGashapon, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GashaponHoc);