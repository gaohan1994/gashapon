import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

interface Props {
    clickHandle ?: () => void;
    btnText     : string;       // 按钮文本内容
    btnType     ?: string;      // 按钮类型 
    btnSize     ?: 'big' | 'normal' | 'small';      // 按钮尺寸大小 one of big normal small
    btnRadius   ?: boolean;
    // btnOutline  : boolean;   // 只有边框的按钮样式 
    // btnActive   : boolean;   // 按钮状态，是一个布尔值，true表示激活（当前状态） 
    // btnBlock    : boolean;   // 按钮是不是块元素，是一个布遥值，true表示块元素
}

const renderType = (btnType?: string): string => {
    return btnType ? btnType : 'button-primary';
};

const renderSize = (btnSize?: string): string => {
    return btnSize ? btnSize : 'normal';
};

const renderRadius = (btnRadius?: boolean): string => {
    return btnRadius ? 'true' : 'false';
};

const Button = ({ btnText, btnType, btnSize, btnRadius, clickHandle = () => {/**/} }: Props): JSX.Element => (
    <div
        styleName="container"
        button-type={renderType(btnType)}
        button-size={renderSize(btnSize)}
        button-radius={renderRadius(btnRadius)}
        onClick={clickHandle ? clickHandle : () => {/*no empty*/}}
    >
        {btnText}
    </div>
);

const ButtonHoc = CSSModules(Button, styles);

export default ButtonHoc;