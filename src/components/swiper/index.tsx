import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import { BannerType } from '../../types/componentTypes';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
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

    public linkTo = (type: number, param: string) => {
        const navPath = config.debug ? `http://www-dev.huanmusic.com` : `http://www.huanmusic.com`;
        switch (type) {
        case 0:
            return;
        case 1:
            /*打开单曲*/
            window.location.href = `${navPath}/song/${param}`;
            return;
        case 2:
            /*打开歌单*/
            window.location.href = `${navPath}/playlist/${param}`;
            break;
        case 3:
            /*打开用户主页*/
            window.location.href = `${navPath}/home/${param}`;
            break;
        case 4:
             /*打开视频*/
            // browserHistory.push(`/video/${param}`);
            break;
        case 5:
            /*进入歌手页面*/
            window.location.href = `${navPath}/artist/${param}`;
            break;
        case 6:
            /*进入登录页面*/
            // browserHistory.push(`/login/${param}`);
            break;
        case 7:
            /*应用内打开连接页面*/
            break;
        case 8:
            /*进入分享页面*/
            // browserHistory.push(`/share/${param}`);
            break;
        case 9:
            /*应用外打开页面*/
            break;
        case 10:
            /*进入圈子页面*/
            window.location.href = `${navPath}/tribe/${param}`;
            break;
        case 11:
            /*进入动态页面*/
            window.open(`//${config.host.pic}/sns/${param}.html`, '_blank');
            break;
        case 12:
            /*APP升级*/
            // browserHistory.push(`/singer/${param}`);
            break;
        case 13:
            /*进入黑市页面*/
            // browserHistory.push(`/shop/${param}`);
            break;
        case 14:
            /*跳转APP打分页面*/
            // browserHistory.push(`/singer/${param}`);
            break;
        case 15:
            /*进入设置页面*/
            // browserHistory.push(`/setting/${param}`);
            break;
        default:
            break;
        }
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
                        onClick={this.linkTo.bind(this, item.type, item.param)}
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
            width: '95.2vw',
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