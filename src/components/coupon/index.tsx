import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Ticket as TicketType } from '../../types/componentTypes';
import * as moment from 'moment';

interface Props {
    ticket?: TicketType;
}

const Coupon = ({ticket}: Props): JSX.Element => (
    <div styleName="container">
        <i styleName="bge" bgimg-center="100"/>
        <div styleName="price">
            ￥<span>{ticket && ticket.price ? ticket.price : 0}</span>
        </div>
        <span styleName="fullcut">满{0}可用</span>
        <span styleName="name">{ticket && ticket.value ? ticket.value : '蛋券'}</span>
        <span styleName="time">
            有效期：{ticket && ticket.end_time 
                    ? moment(ticket.end_time).format('YYYY-MM-DD') 
                    : moment(new Date()).format('YYYY-MM-DD')}
        </span>
    </div>
);

const CouponHoc = CSSModules(Coupon, styles);

export default CouponHoc;