import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';

const onClickHandle = (): void => {
    history.push('/');
};

const Working = ({}): JSX.Element => (
    <div 
        styleName="container"
        bg-white="true"
        onClick={onClickHandle}
    >
        正在建设中
    </div>
);

const WorkingHoc = CSSModules(Working, styles);

export default WorkingHoc;