import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/haeder_set';
import Line from '../../components/lineItem';

const About = ({}): JSX.Element => (
    <div styleName="container" bg-white="true">
        <Header 
            title="关于嘀哩扭蛋"
        />
        <Line 
            value="帮助与反馈"
            param="help"
        />
    </div>
);

const AboutHoc = CSSModules(About, styles);

export default AboutHoc;