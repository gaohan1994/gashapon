import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

interface Props {

}

interface State {
    
}

class Header extends React.Component<Props, State> {

    render() {
        return (
            <header styleName="container">
                <i styleName="gift"/>
                <div styleName="money">money</div>
            </header>
        );
    }
}

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;