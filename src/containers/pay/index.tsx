import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/haeder_set';
import Button from '../../components/button';

interface Props {

}

interface State {

}

class Pay extends React.Component<Props, State> {
    render() {
        return (
            <div styleName="container">
                <Header title="充值"/>
                <div styleName="content">
                    <span styleName="record"/>
                    <i styleName="icon"/>
                    <span styleName="moneySpan">剩余金额</span>
                    <span styleName="money">￥0.00</span>
                    <div styleName="topup">
                        <span>充值金额￥</span>
                        <Button btnText="充值"/>
                    </div>
                </div>
            </div>
        );
    }
}

const PayHoc = CSSModules(Pay, styles);

export default PayHoc;