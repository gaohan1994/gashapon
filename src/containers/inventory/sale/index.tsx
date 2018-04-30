import * as React from 'react';
import { merge } from 'lodash';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Stores } from '../../../reducers/type';
import { 
    Gashapon
} from '../../../types/componentTypes';
import { 
    Userdata
} from '../../../types/user';
import history from '../../../history';
import GashaItem from '../../../components/gashapon_item';
import User from '../../../classes/user';
import Business from '../../../classes/business';
import { InventoryActions } from '../../../actions/inventory';
import {
    
} from '../../../actions/inventory';
import { 
    getInventory
} from '../../../reducers/inventory';
import { 
    getUserdata
} from '../../../reducers/home';

interface Props {
    getInventory: Gashapon[];
    getUserdata : Userdata;
}

interface State {
    gashapons: Gashapon[];
}

/**
 * @returns 
 * @memberof MakeOriders
 * 蛋柜：抽到扭蛋之后的下单界面
 * render:
 */
class MakeOriders extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            gashapons: [],
        };
    }
    
    public onNavHandle = (param: string): void => {
        history.push(`/${param}`);
    }

    public propsClickHandle = (): void => {
        /* no empty */
    }

    public doChangeOrderHandle = (item: Gashapon): void => {
        const { gashapons } = this.state;
        const result = gashapons.findIndex(gashapon => gashapon._id === item._id);
        if (result !== -1) {
            /* do not insert stuff */
            gashapons.splice(result, result + 1);
            this.setState({
                gashapons: merge([], gashapons, [])
            });
        } else {
            /* do insert stuff */
            gashapons.push(item);
            this.setState({
                gashapons: merge([], gashapons, [])
            });
        }
    }

    public doDeleteOrderHandle = (item: Gashapon): void => {
        const { gashapons } = this.state;
        const result = gashapons.findIndex(gashapon => gashapon._id === item._id);
        if (result !== -1) {
            /* do delete stuff */
            this.setState({
                gashapons: merge([], gashapons, [])
            });
        } else {
            /* do nothing */
        }
    }

    public doAllChoiceHandle = (): void => {
        const { gashapons } = this.state;
        const { getInventory } = this.props;
        /* 全选 如果 length 不等就全选，如果相等就全不选 */
        if (gashapons.length === getInventory.length) {
            /* 全部不选 */
            this.setState({
                gashapons: []
            });
        } else {
            this.setState({
                gashapons: merge([], getInventory, [])
            });
        }
    }

    public doOrderHandle = async (): Promise<void> => {
        const { gashapons } = this.state;
        if (gashapons.length === 0) {
            alert('请选择要下单的扭蛋~');
            return;
        } else {
            const { getUserdata } = this.props;

            User.setUser({
                userId  : getUserdata._id,
                address : getUserdata.address && getUserdata.address.detail_home && getUserdata.address.detail_area
                            ? `${getUserdata.address.detail_area} ${getUserdata.address.detail_home}`
                            : '',
                receiver: getUserdata.name,
                phone   : getUserdata.phone,
            });
            const user = User.getUser();  
            const result = await Business.doOrderMethod(user, gashapons); 
            if (result.success === true) {
                console.log('ok');
                history.push('/success');
            } else {
                console.log(`${result.type}--${result.message}`);
                alert(result.message);
            }
        }
    }

    render() {
        const { getInventory } = this.props;
        return (
            <div styleName="container">
                <div onClick={() => this.onNavHandle('inventory')}>back</div>
                {getInventory.map((item: Gashapon, i: number) => (
                    <div 
                        key={i}
                        styleName="item"
                        onClick={() => this.doChangeOrderHandle(item)}
                    >
                        <div 
                            styleName="option"
                            style={{
                                background: this.renderIcon(item)
                            }}
                        />
                        <GashaItem 
                            item={item}
                            propsClickHandle={this.propsClickHandle}
                        />
                    </div>
                ))}
                <div style={{marginTop: '20px'}} onClick={() => this.doAllChoiceHandle()}>全选</div>
                <div style={{marginTop: '20px'}} onClick={() => this.doOrderHandle()}>下单</div>
            </div>
        );
    }

    private renderIcon = (item: Gashapon) => {
        const { gashapons } = this.state;
        let token = false;
        console.log(gashapons);
        const result = gashapons.findIndex(gashapon => gashapon._id === item._id);
        if (result !== -1) {
            token = true;
        } else {
            token = false;
        }
        return token === true ? '#f27a7a' : '#ffffff';
    }
}

const MakeOridersHoc = CSSModules(MakeOriders, styles);

export const mapStateToProps = (state: Stores) => ({
    getInventory: getInventory(state),
    getUserdata : getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<InventoryActions>, state: Stores) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MakeOridersHoc);