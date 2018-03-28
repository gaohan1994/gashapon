import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

interface Props {

}

interface State {
    
}

class Footer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <footer styleName="container">
                <div styleName="logo"/>
                <div styleName="download"/>
            </footer>
        );
    }
}

const FooterHoc = CSSModules(Footer, styles);

export default FooterHoc;