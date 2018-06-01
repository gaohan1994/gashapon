import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';

interface Props {

}

interface State {
    
}

class Header extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render (): React.ReactNode {
        return (
            <header styleName="container">
                <div styleName="logo"/>
                <div styleName="download" onClick={this.clickHandle}/>
            </header>
        );
    }

    private clickHandle = (): void => {
        window.location.href = `${config.downloadUrl}`;
    }
}

const HeaderHoc = CSSModules(Header, styles);
export default HeaderHoc;