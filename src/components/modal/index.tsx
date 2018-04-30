import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

interface Props {
    display             : boolean;
    value               : string;
    headerValue         ?: string;
    onConfirmClickHandle?: () => void;
    onCancelClickHandle ?: () => void;
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
            onCancelClickHandle,
            onConfirmClickHandle,
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
                    <span styleName="haeder">{headerValue ? headerValue : '提示'}</span>
                    <div
                        styleName="content"
                        flex-center="all-center"
                    >
                        {value}
                    </div>
                    <div 
                        styleName="buttons"
                    >
                        <button styleName="button" onClick={onCancelClickHandle}>取消</button>
                        <button styleName="button" onClick={onConfirmClickHandle}>确定</button>
                    </div>
                </div>
            </section>
        );
    }
}

const ModalHoc = CSSModules(Modal, styles);

export default ModalHoc;