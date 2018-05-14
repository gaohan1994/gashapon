import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { discount as discountType } from '../../types/componentTypes';
import * as numeral from 'numeral';
import config from '../../config/index';
import Share from '../../classes/share';

interface Props {
    discount: discountType;
}

const renderBgimage = (discount: discountType): string => {
        
    const now   = discount && discount.sum ? discount.sum : 0;	
    const total = discount && discount.max_discount ? discount.max_discount : 1;	
        
    const current = (numeral(now / total).value()) * 100;	
    return `linear-gradient(to right, rgb(254, 162, 112) ${current}%, rgba(255, 255, 255) 0%)`;
};

const doShareHandle = (discount: discountType): void => {
    const data = {
        url     : `${config.url}/discount/${discount._id}`,
        title   : discount.title,
        pic     : `http://${config.host.pic}/${discount.image}`,
    };

    const share = new Share(data, 'qq', '123');

    share.doShare();
};

const Discount = ({discount}: Props): JSX.Element => (
    <div styleName="container">
        <div 
            styleName="detail"
            flex-center="all-center"
        >
            <i 
                styleName="cover"
                bgimg-center="bgimg-center"
                style={{
                    backgroundImage: discount.image 
                                    ? `url(http://${config.host.pic}/${discount.image})`
                                    : `url(${config.empty_pic.url})`
                }}
            />
            <div styleName="box">
                <span styleName="name">{discount.title}</span>
                <div 
                    styleName="progress"
                    style={{
                        backgroundImage: renderBgimage(discount)
                    }}
                >
                    {discount.sum ? discount.sum / 100 : 0}
                    /
                    {discount.max_discount ? discount.max_discount / 100 : 0}
                </div>
            </div>
        </div>

        <div styleName="footer">
            <span 
                styleName="button" 
                bgimg-center="100"
                style={{backgroundImage: `url(http://net.huanmusic.com/gasha/%E5%8F%96%E6%B6%88%E7%A0%8D%E4%BB%B7.png)`}}
            />
            <span 
                styleName="button" 
                bgimg-center="100"
                style={{backgroundImage: 'url(http://net.huanmusic.com/gasha/%E5%88%86%E4%BA%AB.png)'}}
                onClick={() => doShareHandle(discount)}
            />
        </div>
    </div>
);

const DiscountHoc = CSSModules(Discount, styles);

export default DiscountHoc;