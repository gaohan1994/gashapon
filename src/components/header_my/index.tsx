import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Recharge from '../recharge';

interface Props {

}

interface State {
    
}

class Header extends React.Component<Props, State> {

    render() {
        return (
            <header styleName="container">
                <i styleName="gift"/>
                <Recharge/>
            </header>
        );
    }
}

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;