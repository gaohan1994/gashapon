import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';

const onClickHandle = (): void => {
    history.push('/');
};

const NoMatch = ({}): JSX.Element => (
    <div 
        styleName="container"
        onClick={onClickHandle}
    >
        没这个页面啊，瞎晃啥呢 ：（
    </div>
);

const NoMatchHoc = CSSModules(NoMatch, styles);

export default NoMatchHoc;