import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Footer from '../../components/footer';
import GashaItem from '../../components/gashapon_item';
import { arriveFooter } from '../../config/util';
import { Stores } from '../../reducers/type';
import config from '../../config/index';
import { 
    Gashapons,
    BannerType,
} from '../../types/componentTypes';
import { 
    loadGashapons,
    loadGashaponsByGenre,
    loadGashaponsByTopic,
    loadBannersByGenre,
    loadBannersByTopic,
    LoadGashaponsParam,
    loadGashaponsByWord,
} from '../../actions/main';
import { 
    getGashapons,
    getGashaponBanner,
    getBanners,
} from '../../reducers/main';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoSwipeableViews = autoPlay(SwipeableViews);

interface Props {
    match: {
        params: {
            genre?: string;
            topic?: string;
            word ?: string;
        }
    };
    getGashapons        : Gashapons;
    loadGashapons       : () => void;
    loadGashaponsByGenre: ({}: LoadGashaponsParam) => void;
    loadGashaponsByTopic: ({}: LoadGashaponsParam) => void;
    loadBannersByGenre  : (genre: string) => void;
    loadBannersByTopic  : (topic: string) => void;
    getGashaponBanner   : BannerType[];
    loadGashaponsByWord : ({}: LoadGashaponsParam) => void;
    getBanners          : {contents: BannerType[]};
}

interface State {
    page: number;
    current: number;
}

/**
 * @returns 
 * @memberof Gashapon
 * 首页
 * render:
 */
class Gashapon extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            page    : 0,
            current : 0,
        };
    }

    componentDidMount(): void {
        const { 
            match,
            loadGashapons,
            loadGashaponsByGenre,
            loadGashaponsByTopic,
            loadBannersByGenre,
            loadBannersByTopic,
            loadGashaponsByWord,
        } = this.props;
        
        if (!!match.params.genre) {

            loadGashaponsByGenre({genre: match.params.genre});
            loadBannersByGenre(match.params.genre);
        } else if (!!match.params.topic) {

            loadBannersByTopic(match.params.topic);
            loadGashaponsByTopic({topic: match.params.topic});
        } else if (!!match.params.word) {

            loadGashaponsByWord({word: match.params.word});
        } else {
            
            loadGashapons();
        }
        
        arriveFooter.add('gashapons', (): void => {
            
            if (!!match.params.genre) {
                loadGashaponsByGenre({
                    genre   : match.params.genre, 
                    page    : this.state.page + 1, 
                    callback: this.loadGashaponCallback
                });
            }

            if (!!match.params.word) {
                loadGashaponsByWord({
                    word    : match.params.word, 
                    page    : this.state.page + 1, 
                    callback: this.loadGashaponCallback
                });
            }

            if (!!match.params.topic) {
                loadGashaponsByTopic({
                    topic   : match.params.topic, 
                    page    : this.state.page + 1, 
                    callback: this.loadGashaponCallback
                });
            }
        });
    }

    componentWillUnmount(): void {
        arriveFooter.remove('gashapons');
    }

    public loadGashaponCallback = (page: number): void => {
        this.setState({page: page + 1});
    }

    public readonly onChangeIndex = (index: number, indexLast: number): void => {
        this.setState({
            current: index
        });
    }

    render(): JSX.Element {
        const { getGashapons, getGashaponBanner, getBanners } = this.props;
        return (
            <div styleName="container">
                {(getGashaponBanner && getGashaponBanner.length > 0) || (getBanners.contents && getBanners.contents.length > 0)
                    ? this.renderBanners()
                    : ''}
                {getGashapons.map((item, i) => (
                    <div 
                        key={i}
                        styleName="item"
                    >
                        <GashaItem item={item}/>
                    </div>
                ))}

                {/* <div style={{width: '400px', height: '400px'}}>1</div>
                <div style={{width: '400px', height: '400px'}}>1</div>
                <div style={{width: '400px', height: '400px'}}>1</div>
                <div style={{width: '400px', height: '400px'}}>1</div> */}
                <Footer/>
            </div>
        );
    }

    private renderBanners = (): JSX.Element => {

        const { current } = this.state;
        const { getGashaponBanner, getBanners } = this.props;

        const style = {
            width: '95.2vw',
            height: '100%'
        };

        const containerStyle = {
            width: '100%',
            height: '100%'
        };

        const 
            data: Array<JSX.Element> = [],
            trig: Array<JSX.Element> = [];

        let prepareData: BannerType[] = [];

        if (getGashaponBanner && getGashaponBanner.length > 0) {
            prepareData = getGashaponBanner;
        } else {
            prepareData = getBanners.contents;
        }

        console.log('prepareData', prepareData);

        prepareData.map((item: BannerType, i) => {
            data.push(
                <div 
                    key={i}
                    styleName="wrapItem"
                >
                    <i
                        // onClick={this.linkTo.bind(this, item.type, item.param)}
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

        return (
            <section styleName="banner">
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
}

const GashaponHoc = CSSModules(Gashapon, styles);

export const mapStateToProps = (state: Stores) => ({
    getGashapons        : getGashapons(state),
    getGashaponBanner   : getGashaponBanner(state),
    getBanners          : getBanners(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>, state: Stores) => ({
    loadGashapons       : bindActionCreators(loadGashapons, dispatch),
    loadGashaponsByGenre: bindActionCreators(loadGashaponsByGenre, dispatch),
    loadGashaponsByTopic: bindActionCreators(loadGashaponsByTopic, dispatch),
    loadBannersByGenre  : bindActionCreators(loadBannersByGenre, dispatch),
    loadBannersByTopic  : bindActionCreators(loadBannersByTopic, dispatch),
    loadGashaponsByWord : bindActionCreators(loadGashaponsByWord, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GashaponHoc);