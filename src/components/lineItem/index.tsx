import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';

interface Props {
    value   : string;
    subValue?: string;
    param   ?: string;
}

const onNavHandle = (param: string): void => {
    history.push(`/${param}`);   
};

const Line = ({value, subValue, param}: Props): JSX.Element => (
    <div 
        styleName="container"
        onClick={param
                ? () => onNavHandle(param)
                : () => {/*no empty*/}}
    >
        <span>{value}</span>
        
        {subValue
        ? <span>{subValue}</span>
        : <i styleName="icon"/>}
    </div>
);

const LineHoc = CSSModules(Line, styles);

export default LineHoc;