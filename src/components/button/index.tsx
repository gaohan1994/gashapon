import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
// import history from '../../history';

/**
 * 
 * 尽量使用纯组件
 * @param {any} {} 
 */

interface Props {
    btnText     : string; // 按钮文本内容 
    btnType     ?: string; // 按钮类型 
    // btnSize     : string; // 按钮尺寸大小 
    // btnOutline  : boolean; // 只有边框的按钮样式 
    // btnActive   : boolean; // 按钮状态，是一个布尔值，true表示激活（当前状态） 
    // btnBlock    : boolean; // 按钮是不是块元素，是一个布遥值，true表示块元素
}

interface State {

}

class Button extends React.Component<Props, State> {
    render() {
        
        const { 
            btnText, 
            btnType,
        } = this.props;

        return (
            <div 
                styleName="container"
                button-type={this.renderType(btnType)}
            >
                {btnText}
            </div>
        );
    }

    private renderType = (btnType?: string): string => {
        return btnType ? btnType : 'button-primary';
    }
}

const ButtonHoc = CSSModules(Button, styles);

export default ButtonHoc;