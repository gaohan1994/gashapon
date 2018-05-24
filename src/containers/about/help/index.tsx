import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../../components/haeder_set';
import Line from '../../../components/lineItem';

const Help = ({}): JSX.Element => (
    <div styleName="container">
        <Header 
            title="帮助与反馈"
        />
        <Line 
            value="FAQ"
            param="faq"
        />
    </div>
);

const HelpHop = CSSModules(Help, styles);

export default HelpHop;