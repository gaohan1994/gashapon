import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config';
import { 
    BannerType as Bntype,
} from '../../types/componentTypes';

interface Props {
    banner?: Bntype;
    BannerType?: BannerType;
}

interface BannerType {
    img: string;
}

const onClickHandle = (): void => {
    alert('hello');
};

/**
 * @param {Props} {banner, BannerType} 
 */
const Banner = ({banner, BannerType}: Props) => (
    <div styleName="container">
        <i 
            styleName="banner"
            style={{
                backgroundImage: banner && banner.pic
                                ? `url(http://${config.host.pic}/${banner.pic})`
                                : `url(${config.empty_pic.url})`
            }}
            onClick={onClickHandle}
        />
    </div>
);

const BannerHoc = CSSModules(Banner, styles);

export default BannerHoc;