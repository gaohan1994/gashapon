import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
// import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';

import Header from '../../components/header';
import Footer from '../../components/footer';

import { Stores } from '../../types/reducerTypes';

import { 
    WrapImagesType,
} from '../../types/componentTypes';

import { 

} from '../../actions/main';

import { 

} from '../../reducers/main';

export interface Props {
    getWrapImages           : WrapImagesType;
    loadMainImages          : () => void;
}

export interface State {
    
}

/**
 * @returns 
 * @memberof Main
 * 首页
 * render:
 */
class Main extends React.Component<Props, State> {

    componentDidMount() {
        const { 

        } = this.props;
    }

    render() {
        const { } = this.props;
        return (
            <div styleName="container">
                <Header/>
                <Footer/>
            </div>
        );
    }

}

const MainHoc = CSSModules(Main, styles);

export const mapStateToProps = (state: Stores) => ({

});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainHoc);