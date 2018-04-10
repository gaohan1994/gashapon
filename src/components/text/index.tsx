import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

interface Props {
    value   : string;
    subValue?: string;
}

class TextItem extends React.Component <Props, {}> {
    render () {
        const { value, subValue } = this.props;
        return (
            <div styleName="container">
                <span>{value}</span>
                
                {subValue
                ? <span>{subValue}</span>
                : ''}
            </div>
        );
    }
}

const TextHoc = CSSModules(TextItem, styles);

export default TextHoc;