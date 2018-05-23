import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';

interface Props {
    propsClick  ?: () => void;
}

const onNavHandle = (): void => {
    history.goBack();
};  

const Header = ({propsClick}: Props) => (
    <header styleName="container">
        <i
            styleName="icon"
            style={{
                backgroundImage: 'url(//net.huanmusic.com/gasha/gacha-icon.png)',
                backgroundPosition: '-119px -28px',
                backgroundSize: '146.5px auto',
                width: '21px',
                height: '21px',
            }}
            onClick={propsClick ? propsClick : () => onNavHandle()}
        />
    </header>
);

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;