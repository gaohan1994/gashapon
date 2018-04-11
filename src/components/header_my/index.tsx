import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';

interface Props {

}

interface State {
    
}

class Header extends React.Component<Props, State> {

    render() {
        return (
            <header styleName="container">
                <i styleName="gift"/>
                <div 
                    styleName="money"
                    onClick={() => this.onNavHandle('pay')}
                >
                    <span styleName="moneyIcon">￥</span>
                    0
                    <i styleName="pay"/>
                </div>
            </header>
        );
    }

    private onNavHandle = (param: string): void => {
        history.push(`/${param}`);
    }
}

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;