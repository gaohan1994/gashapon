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
import { loadCollectGashapons, LoadCollectGashapons } from '../../actions/home';
import history from '../../history';
import GashaponClass from '../../classes/gashapon';
import User from '../../classes/user';

interface Props {
    getUserdata         ?: Userdata;
    getCollectGashapons ?: Gashapon[];
    loadCollectGashapons: (machineIds?: string[]) => void;
}

interface State {
    type: 'all' | 'overtime';
}

class Collect extends React.Component<Props, State> {
    
    constructor (props: Props) {
        super(props);
        this.state = {
            type: 'all',
        };
    }

    componentDidMount() {
        // const { getUserdata, loadCollectGashapons } = this.props;

        // if (getUserdata && getUserdata.collect_machines && getUserdata.collect_machines.machines) {

        //     loadCollectGashapons(
        //         getUserdata.collect_machines.machines
        //     );
        // }
    }

    public onChangeTypeHandle = (): void => {
        //
    }

    public gotoGashaponHandle = (param: string): void => {
        history.push(`/gashapon/${param}`);
    }

    public doCancelCollectGashaponHandle = async (data: Gashapon): Promise<void> => {

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
                alert('取消收藏成功');
                history.push('/my');
            } else {
                console.log(`${result.type}--${result.message}`);
                alert(result.message);
            }
        }
    }

    render () {
        return (
            <div styleName="container">
                <Header title="我收藏的扭蛋机"/>
                {this.renderNav()}
                {this.renderGashapons()}
            </div>
        );
    }

    private renderNav = (): JSX.Element => {
        const { type } = this.state;
        return (
            <div styleName="navbar">
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

    private renderGashapons = (): JSX.Element[] | string => {
        
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

export const mapDispatchToProps = (dispatch: Dispatch<LoadCollectGashapons>) => ({
    loadCollectGashapons: bindActionCreators(loadCollectGashapons, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CollectHoc);