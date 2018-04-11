import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

/**
 * 文字组件
 * value: 左内容
 * subvalue：右内容
 * 如果只想显示右内容则传入value=""
 * size：one of [normal, bold];
 */
interface Props {
    value   : string;
    subValue?: string;
    size    ?: string; 
    color   ?: string;
}

class TextItem extends React.Component <Props, {}> {
    render () {
        const { value, subValue, size } = this.props;
        return (
            <div styleName="container">
                {this.renderText(value, size)}
                
                {subValue
                ? this.renderText(subValue, size)
                : ''}
            </div>
        );
    }

    private renderText = (value: string, size?: string): JSX.Element => {
        return (
            <span text-font-weight={size ? size : 'normal'}>
                {value}
            </span>
        );
    }
}

const TextHoc = CSSModules(TextItem, styles);

export default TextHoc;