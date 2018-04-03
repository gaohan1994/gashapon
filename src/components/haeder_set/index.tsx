import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';
import Meta from 'react-document-meta';

interface Props {
    title       : string;
    metaTitle   ?: string;
}

const onNavHandle = (): void => {
    history.goBack();
};  

const renderMeta = (metaTitle: string): object => {
    const meta = {title: metaTitle};
    return meta;
};

const Header = ({title, metaTitle}: Props) => (
    <header styleName="container">
        {metaTitle
        ? <Meta {...renderMeta(metaTitle)}/> 
        : ''}
        <i/>
        <span onClick={() => onNavHandle()}>{title}</span>
    </header>
);

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;