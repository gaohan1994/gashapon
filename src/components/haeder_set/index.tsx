import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

import history from '../../history';
// import Meta from 'react-document-meta';

interface Props {
    title       : string;
    metaTitle   ?: string;
    propsClick  ?: () => void;
}

const onNavHandle = (): void => {
    history.goBack();
};  

// const renderMeta = (metaTitle: string): object => {
//     const meta = {title: metaTitle};
//     return meta;
// };

const Header = ({title, metaTitle, propsClick}: Props) => (
    <header styleName="container">
        {/* {metaTitle
        ? <Meta {...renderMeta(metaTitle)}/> 
        : ''} */}
        <i 
            styleName="icon"
            style={{
                backgroundImage: 'url(http://net.huanmusic.com/gasha/gacha-icon.png)',
                backgroundPosition: '-119px -28px',
                backgroundSize: '146.5px auto',
                width: '21px',
                height: '21px',
            }}
            onClick={propsClick ? propsClick : () => onNavHandle()}
        />
        <span 
            styleName="text"
            onClick={propsClick ? propsClick : () => onNavHandle()}
        >
            {title}
        </span>
    </header>
);

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;