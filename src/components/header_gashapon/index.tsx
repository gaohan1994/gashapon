import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';
import Recharge from '../recharge';

interface Props {

}

interface State {
    
}

class Header extends React.Component<Props, State> {

    render() {
        return (
            <header styleName="container">
                <i
                    styleName="back"
                    onClick={() => this.onBackHandle()}
                />
                <i 
                    styleName="home"
                    onClick={() => this.onNavHandle('')}
                />
                <Recharge/>
            </header>
        );
    }

    private onNavHandle = (param: string): void => {
        history.push(`/${param}`);
    }

    private onBackHandle = (): void => {
        history.goBack();
    }
}

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;