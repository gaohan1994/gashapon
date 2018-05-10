import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/haeder_set';
import GashaItem from '../../components/gashapon_row_item';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { getUserdata, getCollectGashapons } from '../../reducers/home';
import { Userdata } from '../../types/user';
import { Gashapon } from '../../types/componentTypes';
import { loadCollectGashapons, LoadCollectGashapons } from '../../actions/home';

interface Props {
    getUserdata         ?: Userdata;
    getCollectGashapons ?: Gashapon[];
    loadCollectGashapons: (machineIds?: string[]) => void;
}

class Collect extends React.Component<Props, {}> {

    componentDidMount() {
        const { getUserdata, loadCollectGashapons } = this.props;
        loadCollectGashapons(getUserdata && getUserdata.collect_machines && getUserdata.collect_machines.machines);
    }

    render () {
        return (
            <div styleName="container">
                <Header title="我的"/>
                {this.renderGashapons()}
            </div>
        );
    }

    private renderGashapons = (): JSX.Element[] | string => {
        const { getCollectGashapons } = this.props;

        if (getCollectGashapons && getCollectGashapons.length > 0) {
            const data = getCollectGashapons.map((item, i) => (
                <div 
                    key={i}
                    styleName="item"
                >
                    <GashaItem gashapon={item}/>
                </div>
            ));
            return data;
        } else {
            return '';
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