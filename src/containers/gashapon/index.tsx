import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Footer from '../../components/footer';
import GashaItem from '../../components/gashapon_item';

import { Stores } from '../../types/reducerTypes';

import { 
    Gashapons
} from '../../types/componentTypes';

import { 
    loadGashapons
} from '../../actions/main';

import { 
    getGashapons
} from '../../reducers/main';

export interface Props {
    getGashapons    : Gashapons;
    loadGashapons   : () => void;
}

export interface State {
    
}

/**
 * @returns 
 * @memberof Gashapon
 * 首页
 * render:
 */
class Gashapon extends React.Component<Props, State> {

    componentDidMount() {
        const { 
            loadGashapons
        } = this.props;
        loadGashapons();
    }

    render() {
        const { getGashapons } = this.props;
        console.log('getGashapons', getGashapons);
        return (
            <div styleName="container">
                {getGashapons.map((item, i) => (
                    <div 
                        key={i}
                        styleName="item"
                    >
                        <GashaItem item={item}/>
                    </div>
                ))}
                <Footer/>
            </div>
        );
    }

}

const GashaponHoc = CSSModules(Gashapon, styles);

export const mapStateToProps = (state: Stores) => ({
    getGashapons: getGashapons(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    loadGashapons: bindActionCreators(loadGashapons, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GashaponHoc);