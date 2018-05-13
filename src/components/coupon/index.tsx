import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Ticket as TicketType } from '../../types/componentTypes';
import * as moment from 'moment';

interface Props {
    ticket: TicketType;
}

const Coupon = ({ticket}: Props): JSX.Element => (
    <div styleName="container">

        <i styleName="bge" bgimg-center="100"/>

        <div styleName="box">
            <span styleName="price">
                ￥{ticket.discount && ticket.discount.price ? ticket.discount.price : 0}
            </span>
            <span styleName="fullcut">
                满{ticket.discount && ticket.discount.condition ? ticket.discount.condition : 0}可用
            </span>
        </div>
        
        <div styleName="box">
            <span styleName="name">{'蛋券'}</span>
            <span styleName="time">
                有效期：{ticket && ticket.create_date
                        ? moment(ticket.create_date).format('YYYY-MM-DD') 
                        : moment(new Date()).format('YYYY-MM-DD')}
            </span>
        </div>
        
    </div>
);

const CouponHoc = CSSModules(Coupon, styles);

export default CouponHoc;