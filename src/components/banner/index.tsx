import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config';

interface Props {
    banner?: Banner;
    BannerType?: BannerType;
}

interface Banner {
    img: string;
}

interface BannerType {
    img: string;
}

// class Banner extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div styleName="container">
//                 banner
//             </div>
//         );
//     }
// }

const onClickHandle = (): void => {
    alert('hello');
};

const Banner = ({banner, BannerType}: Props) => (
    <div styleName="container">
        <i 
            styleName="banner"
            style={{
                backgroundImage: `url(${config.empty_pic.url})`
            }}
            onClick={onClickHandle}
        />
        <i 
            styleName="bannerType"
            style={{
                backgroundImage: `url(${config.empty_pic.url})`
            }}
            onClick={onClickHandle}
        />
    </div>
);

const BannerHoc = CSSModules(Banner, styles);

export default BannerHoc;