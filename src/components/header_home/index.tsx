import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Swiper from '../swiper';
import { connect } from 'react-redux';
import { Stores } from '../../types/reducerTypes';
import { BannerType } from '../../types/componentTypes';
import { getBanners } from '../../reducers/main';

interface Props {
    getBanners: {contents: BannerType[]};
}

interface State {
    
}

class Header extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const { getBanners } = this.props;
        return (
            <header styleName="container">
                <i styleName="clock"/>
                <i styleName="search"/>
                <div styleName="item">分类</div>
                <div styleName="item">分类</div>
                <div styleName="item">分类</div>
                <div styleName="swiper">
                    <Swiper
                        images={getBanners.contents}
                    />
                </div>
            </header>
        );
    }
}

const HeaderHoc = CSSModules(Header, styles);

export const mapStateToProps = (state: Stores) => ({
    getBanners: getBanners(state),
});

export default connect(mapStateToProps)(HeaderHoc);