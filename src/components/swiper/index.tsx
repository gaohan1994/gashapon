import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import { BannerType } from '../../types/componentTypes';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// import history from '../../history';
import Base from '../../classes/base';

const AutoSwipeableViews = autoPlay(SwipeableViews);

interface Props {
    images: BannerType[];
}

interface State {
    current: number;
}

class Swiper extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    public doNavHandle = (type: number, param: string): void => {
        // history.push(`/gashapon/${param}`);
        console.log(type, param);
        Base.onBannerNavHandle(type, param);
    }

    render() {
        const { current } = this.state;
        const { images } = this.props;
        
        const 
            data: Array<JSX.Element> = [],
            trig: Array<JSX.Element> = [];
            
        images.map((item: BannerType, i) => {
            data.push(
                <div 
                    key={i}
                    styleName="wrapItem"
                >
                    <i
                        onClick={() => this.doNavHandle(item.type, item.param)}
                        styleName="imageItem"
                        style={{
                            backgroundImage: item.pic 
                            ? `url(http://${config.host.pic}/${item.pic}?imageView/2/w/720/h/350)` 
                            : `url(${config.empty_pic.url})`
                        }}
                    />
                </div>
            );
            trig.push(
                <span 
                    key={i}
                    styleName={current === i ? `on` : ``}
                />
            );
        });

        const style = {
            width: '92vw',
            height: '100%'
        };

        const containerStyle = {
            width: '100%',
            height: '100%'
        };

        return (
            <section styleName="container">
                <AutoSwipeableViews
                    autoplay={true}
                    style={style}
                    index={current}
                    containerStyle={containerStyle}
                    onChangeIndex={this.onChangeIndex}
                    enableMouseEvents={true}
                >
                    {data}
                </AutoSwipeableViews>
                <ul styleName="trig">{trig}</ul>
            </section>
        );
    }

    private readonly onChangeIndex = (index: number, indexLast: number): void => {
        this.setState({
            current: index
        });
    }
}

const SwiperHoc = CSSModules(Swiper, styles);

export default SwiperHoc;