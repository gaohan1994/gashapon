import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

interface Props {

}

interface State {
    
}

class Header extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <header styleName="container">
                <div styleName="logo"/>
                <div styleName="download" onClick={this.clickHandle}/>
            </header>
        );
    }

    private clickHandle = () => {
        window.location.href = '//www.huanmusic.com/download.html';
    }
}

const HeaderHoc = CSSModules(Header, styles);
export default HeaderHoc;