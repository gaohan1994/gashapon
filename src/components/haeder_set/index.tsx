import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

import history from '../../history';
// import Meta from 'react-document-meta';

interface Props {
    title           : string;
    subTitle        ?: string;
    propsClick      ?: () => void;
    subPropsClick   ?: () => void;
}

const onNavHandle = (): void => {
    history.goBack();
};  

const Header = ({title, subTitle, propsClick, subPropsClick}: Props) => (
    <header styleName="container">
        <i 
            styleName="icon"
            onClick={propsClick ? propsClick : () => onNavHandle()}
        />
        <span 
            styleName="text"
            onClick={propsClick ? propsClick : () => onNavHandle()}
        >
            {title}
        </span>
        {subTitle
        ? <span styleName="subtitle" onClick={subPropsClick ? subPropsClick : () => onNavHandle()}>
            {subTitle}
        </span>
        : ''}
    </header>
);

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;