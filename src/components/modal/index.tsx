import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

interface Props {
    children            ?: JSX.Element;
    display             : boolean;
    value               ?: string;
    headerValue         ?: string;
    cancelButtonText    ?: string;
    confirmButtonText   ?: string;
    onConfirmClickHandle?: () => void;
    onCancelClickHandle ?: () => void;
    
    close               ?: boolean;
    closeClickHandle    ?: () => void;
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
            headerValue,
            cancelButtonText,
            confirmButtonText,
            onCancelClickHandle,
            onConfirmClickHandle,
            close,
            closeClickHandle,
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
                
                    {close === true
                    ? <span 
                        styleName="close"
                        onClick={closeClickHandle}
                    >
                        X
                    </span>
                    : ''}
                    
                    <span styleName="haeder">{headerValue ? headerValue : '提示'}</span>
                    <div
                        styleName="content"
                        flex-center="all-center"
                    >
                        {this.props.children
                        ? this.props.children
                        : value}
                    </div>
                    <div 
                        styleName="buttons"
                    >
                        {onCancelClickHandle
                        ? <button styleName="button" onClick={onCancelClickHandle}>
                            {cancelButtonText ? cancelButtonText : '取消'}
                        </button>
                        : ''}
                        
                        <button styleName="button" onClick={onConfirmClickHandle}>
                            {confirmButtonText ? confirmButtonText : '确定'}
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}

const ModalHoc = CSSModules(Modal, styles);

export default ModalHoc;