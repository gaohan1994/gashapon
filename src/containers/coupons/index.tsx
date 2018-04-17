import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/header_achievement';
import Coupon from '../../components/coupon';

interface Props {

}

interface State {

}

class Coupons extends React.Component<Props, State> {
    render () {
        return (
            <div styleName="container">
                <Header/>
                <div styleName="item">
                    <Coupon/>
                </div>
                <div styleName="item">
                    <Coupon/>
                </div>
                <div styleName="item">
                    <Coupon/>
                </div>
            </div>
        );
    }
}

const CouponsHoc = CSSModules(Coupons, styles);

export default CouponsHoc;