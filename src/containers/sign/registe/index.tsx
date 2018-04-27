import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
// import { bindActionCreators } from 'redux';
import { MainActions } from '../../../actions/main';
import * as styles from './index.css';
import { Stores } from '../../../reducers/type';
import { 

} from '../../../actions/main';

import {

} from '../../../reducers/main';

export interface Props {

}

export interface State {
    
}

class Registe extends React.Component<Props, State> {

    render() {
        const { } = this.props;
        return (
            <div styleName="container">
                RegisteHoc
            </div>
        );
    }
}

const RegisteHoc = CSSModules(Registe, styles);

export const mapStateToProps = (state: Stores) => ({

});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RegisteHoc);