import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Swiper from '../swiper';

interface Props {

}

interface State {
    
}

class Header extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const images = [
            {
                param   : '1',
                pic     : '',
                tag     : '3',
                title   : '4',
                type    : 444,
            },
            {
                param   : '2',
                pic     : '',
                tag     : '4',
                title   : '5',
                type    : 554,
            }
        ];
        return (
            <header styleName="container">
                <i styleName="clock"/>
                <i styleName="search"/>
                <div styleName="item">分类</div>
                <div styleName="item">分类</div>
                <div styleName="item">分类</div>
                <div styleName="swiper">
                    <Swiper
                        images={images}
                    />
                </div>
            </header>
        );
    }
}

const HeaderHoc = CSSModules(Header, styles);
export default HeaderHoc;