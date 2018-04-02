import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

interface Props {

}

interface State {
    
}

class Line extends React.Component<Props, State> {

    render() {
        return (
            <div styleName="container">
                line
            </div>
        );
    }
}

const LineHoc = CSSModules(Line, styles);

export default LineHoc;