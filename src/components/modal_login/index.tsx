import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    StatusActions,
    hideLoginModal,
    showSignModal,
} from '../../actions/status';
import { 
    getLoginModalStatus,
} from '../../reducers/status';
import Sign from '../../containers/sign';

interface Props {
    display         ?: boolean;
    value           ?: string;
    hideLoginModal  ?: () => void;
    showSignModal   ?: () => void;
}

interface State {
    
}

/**
 * 对话框组件
 * 
 */
class Modal extends React.Component <Props, State> {
    
    public onConfirmClickHandle = (): void => {
        const { showSignModal } = this.props;
        if (showSignModal) {
            showSignModal();
        }
    }
    
    render () {

        const {
            display,
            value,
            hideLoginModal,
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
                <Sign/>
                <div styleName="box">
                    <span styleName="haeder">{'提示'}</span>
                    <div
                        styleName="content"
                        flex-center="all-center"
                    >
                        {value}
                    </div>
                    <div styleName="buttons">
                        <button styleName="button" onClick={hideLoginModal}>取消</button>
                        <button styleName="button" onClick={() => this.onConfirmClickHandle()}>登录</button>
                    </div>
                </div>
            </section>
        );
    }
}

const ModalHoc = CSSModules(Modal, styles);

export const mapStateToProps = (state: Stores) => ({
    display: getLoginModalStatus(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<StatusActions>, state: Stores) => ({
    hideLoginModal  : bindActionCreators(hideLoginModal, dispatch),
    showSignModal   : bindActionCreators(showSignModal, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ModalHoc);