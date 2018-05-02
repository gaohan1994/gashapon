import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';

import { 
    StatusActions,
    showLogin,
} from '../../actions/status';

interface Props {
    display     : boolean;
    value       ?: string;
    showLogin   ?: () => void;
    hideModal   ?: () => void;
}

interface State {
    
}

/**
 * 对话框组件
 * 
 */
class Modal extends React.Component <Props, State> {
    
    render () {

        const { 
            display,
            value,
            showLogin,
            hideModal,
        } = this.props;

        return (
            <section 
                flex-center="all-center"
                styleName="modal"
                style={{
                    visibility  : display === true ? 'visible' : 'hidden',
                    opacity     : display === true ? 1 : 0
                }}
            >
                <div styleName="box">
                    <span styleName="haeder">{'提示'}</span>
                    <div
                        styleName="content"
                        flex-center="all-center"
                    >
                        {value}
                    </div>
                    <div 
                        styleName="buttons"
                    >
                        <button styleName="button" onClick={hideModal}>取消</button>
                        <button styleName="button" onClick={showLogin}>登录</button>
                    </div>
                </div>
            </section>
        );
    }
}

const ModalHoc = CSSModules(Modal, styles);

export const mapStateToProps = (state: Stores) => ({
    
});

export const mapDispatchToProps = (dispatch: Dispatch<StatusActions>, state: Stores) => ({
    showLogin: bindActionCreators(showLogin, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ModalHoc);