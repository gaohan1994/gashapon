import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

import history from '../../history';
// import Meta from 'react-document-meta';

interface Props {
    title       : string;
    propsClick  ?: () => void;
}

interface State {

}

class Header extends React.Component <Props, State> {

    public onNavHandle = (): void => {
        history.goBack();
    }

    render () {
        const { title, propsClick } = this.props;
        return (
            <header styleName="container">
                <i 
                    styleName="icon"
                    onClick={propsClick ? propsClick : () => this.onNavHandle()}
                />
                <span 
                    styleName="text"
                    onClick={propsClick ? propsClick : () => this.onNavHandle()}
                >
                    {title}
                </span>
            </header>
        );
    }
}

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;