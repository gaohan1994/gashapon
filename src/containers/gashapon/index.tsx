import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
// import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Footer from '../../components/footer';
import GashaItem from '../../components/gashapon_item';

import { Stores } from '../../types/reducerTypes';

import { 
    WrapImagesType,
} from '../../types/componentTypes';

import { 

} from '../../actions/main';

import { 

} from '../../reducers/main';

export interface Props {
    getWrapImages   : WrapImagesType;
    loadMainImages  : () => void;
    children        : any;
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

        } = this.props;
    }

    render() {
        const { } = this.props;
        return (
            <div styleName="container">
                <div styleName="item">
                    <GashaItem/>
                </div>
                <Footer/>
            </div>
        );
    }

}

const GashaponHoc = CSSModules(Gashapon, styles);

export const mapStateToProps = (state: Stores) => ({

});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GashaponHoc);