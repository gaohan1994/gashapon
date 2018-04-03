import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../../components/haeder_set';
import Line from '../../../components/lineItem';

const Account = ({}): JSX.Element => (
    <div styleName="container">
        <Header 
            title="设置"
            metaTitle="账号"
        />
        <Line 
            value="完蛋趣号"
            subValue="123456"
        />
    </div>
);

const AccountHoc = CSSModules(Account, styles);

export default AccountHoc;