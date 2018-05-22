import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/haeder_set';
import GashaItem from '../../components/gashapon_row_item_v1';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { getUserdata, getCollectGashapons } from '../../reducers/home';
import { Userdata } from '../../types/user';
import { Gashapon } from '../../types/componentTypes';
import { 
    loadCollectGashapons, 
    LoadCollectGashapons,
    HomeActions,
    loadUserDataFromUuid
} from '../../actions/home';
import history from '../../history';
import GashaponClass from '../../classes/gashapon';
import User from '../../classes/user';
import Modal from '../../components/modal';

interface Props {
    getUserdata         ?: Userdata;
    getCollectGashapons ?: Gashapon[];
    loadCollectGashapons: (machineIds?: string[]) => void;
    loadUserDataFromUuid: () => void;
}

interface State {
    type: 'all' | 'overtime';
    showModal: boolean;
    modalValue: string;
}

class Collect extends React.Component<Props, State> {
    
    constructor (props: Props) {
        super(props);
        this.state = {
            type        : 'all',
            showModal   : false,
            modalValue  : ''
        };

        this.onChangeTypeHandle = this.onChangeTypeHandle.bind(this);
        this.gotoGashaponHandle = this.gotoGashaponHandle.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.doCancelCollectGashaponHandle = this.doCancelCollectGashaponHandle.bind(this);
    }

    public onChangeTypeHandle = (): void => {
        //
    }

    public gotoGashaponHandle = (param: string): void => {
        history.push(`/gashapon/${param}`);
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

    public doCancelCollectGashaponHandle = async (data: Gashapon): Promise<void> => {
        const { loadUserDataFromUuid } = this.props;
        const user = User.getUser();
        if (!user.uid) {

            /* do login stuff */
            console.log('未登录');
            history.push('/my');
        } else {

            const result = await GashaponClass.doCancelCollectGashaponMethod({
                user    : user, 
                machine : data
            });
            
            if (result.success === true) {
                loadUserDataFromUuid();
            } else {
                console.log(`${result.type}--${result.message}`);
                this.setState({
                    modalValue: result.message ? result.message : '收藏扭蛋出粗'
                });
                this.onShowModal();
            }
        }
    }

    render () {
        return (
            <div styleName="container">
                <Header title="我收藏的扭蛋机"/>
                {this.renderErrorModal()}
                {this.renderNav()}
                {this.renderGashapons()}
            </div>
        );
    }

    private renderErrorModal = (): JSX.Element => {
        const { showModal, modalValue } = this.state;
        return (
            <Modal
                display={showModal}
                value={modalValue}
                onConfirmClickHandle={this.onHideModal}
            />
        );
    }

    private readonly renderNav = (): JSX.Element => {
        const { type } = this.state;
        return (
            <div styleName="navbar" bg-white="true">
                <div 
                    styleName="white"
                >
                    <div 
                        styleName={type === 'all' ? 'navItemActive' : 'navItem'}
                    >
                        全部
                    </div>
                    <div
                        styleName={type === 'overtime' ? 'navItemActive' : 'navItem'}
                    >
                        已下架
                    </div>
                </div>
            </div>
        );
    }

    private readonly renderGashapons = (): JSX.Element[] | string => {
        
        const { getUserdata } = this.props;

        if (getUserdata && getUserdata.collect_machines.length > 0) {
            const data = getUserdata.collect_machines.map((item, i) => {
                const footer = {
                    show: true,
                    buttons: [
                        {
                            value       : '前去扭蛋',
                            clickHandle : () => this.gotoGashaponHandle(item._id)
                        },
                        {
                            value       : '取消收藏',
                            clickHandle : () => this.doCancelCollectGashaponHandle(item)
                        }
                    ]
                };
                return (
                    <div 
                        key={i}
                        styleName="item"
                    >
                        <GashaItem gashapon={item} footer={footer}/>
                    </div>
                );
            });
            return data;
        } else {
            return '暂无收藏';
        }
    }
}

const CollectHoc = CSSModules(Collect, styles);

export const mapStateToProps = (state: Stores) => ({
    getUserdata         : getUserdata(state),
    getCollectGashapons : getCollectGashapons(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<LoadCollectGashapons | HomeActions>) => ({
    loadCollectGashapons: bindActionCreators(loadCollectGashapons, dispatch),
    loadUserDataFromUuid: bindActionCreators(loadUserDataFromUuid, dispatch)
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CollectHoc);