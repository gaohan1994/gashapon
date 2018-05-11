import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Footer from '../../components/footer';
import GashaItem from '../../components/gashapon_item';
import Header from '../../components/header_gashapons';
import Search from '../../components/search';
import News from '../../components/news';
import Hoc from '../hoc';
import Base from '../../classes/base';
import { arriveFooter } from '../../config/util';
import { Stores } from '../../reducers/type';
import config from '../../config/index';
import history from '../../history';
import { 
    Gashapons,
    BannerType,
    Genres,
    Genre,
} from '../../types/componentTypes';
import { 
    loadGashapons,
    loadGenres,
    loadTopics,
    loadGashaponsByGenre,
    loadGashaponsByTopic,
    loadBannersByGenre,
    loadBannersByTopic,
    LoadGashaponsParam,
    loadGashaponsByWord,
} from '../../actions/main';
import { 
    getGenres,
    getTopics,
    getGashapons,
    getGashaponBanner,
    getBanners,
} from '../../reducers/main';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoSwipeableViews = autoPlay(SwipeableViews);

interface Props {
    location: {
        pathname: string;
    };
    match: {
        params: {
            price?: string;
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
    loadGenres          : () => void;
    loadTopics          : () => void;
    getGenres           : Genres;
    getTopics           : Genres;
}

interface State {
    page        : number;
    current     : number;
    showGenre   : boolean;
    showPrice   : boolean;
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
            page        : 0,
            current     : 0,
            showGenre   : false,
            showPrice   : false,
        };
        this.clickListenHandle = this.clickListenHandle.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {
        
        const { 
            loadGashapons,
            loadGashaponsByGenre,
            loadGashaponsByTopic,
            loadBannersByGenre,
            loadBannersByTopic,
            loadGashaponsByWord,
        } = this.props;

        if (nextProps.location.pathname !== this.props.location.pathname) {
            
            if (!!nextProps.match.params.price) {

                const price = JSON.parse(nextProps.match.params.price);
                loadGashaponsByGenre({
                    genre       : nextProps.match.params.genre, 
                    min_price   : price.min, 
                    max_price   : price.max,
                });
                loadBannersByGenre(nextProps.match.params.genre);
            } else if (!!nextProps.match.params.genre) {

                loadGashaponsByGenre({genre: nextProps.match.params.genre});
                loadBannersByGenre(nextProps.match.params.genre);
            } else if (!!nextProps.match.params.topic) {
    
                loadBannersByTopic(nextProps.match.params.topic);
                loadGashaponsByTopic({topic: nextProps.match.params.topic});
            } else if (!!nextProps.match.params.word) {
    
                loadGashaponsByWord({word: nextProps.match.params.word});
            } else {
                
                loadGashapons();
            }
        }
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

            getGenres,
            getTopics,
            loadGenres,
            loadTopics,
        } = this.props;
        
        if (getGenres.length === 0) {
            loadGenres();
        }
        
        if (getTopics.length === 0) {
            loadTopics();
        }

        if (!!match.params.price && !!match.params.genre) {

            const price = JSON.parse(match.params.price);

            loadGashaponsByGenre({
                genre   : match.params.genre, min_price: price.min, max_price: price.max,
            });
            loadBannersByGenre(match.params.genre);
        }

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

        window.addEventListener('click', this.clickListenHandle);
        
        arriveFooter.add('gashapons', (): void => {
            
            if (!!match.params.price) {

                const price = JSON.parse(match.params.price);

                loadGashaponsByGenre({
                    genre       : match.params.genre, 
                    page        : this.state.page + 1, 
                    min_price   : price.min,
                    max_price   : price.max,
                    callback    : this.loadGashaponCallback
                });
            }

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

        const clickEnd = window.removeEventListener('click', this.clickListenHandle);
        console.log(clickEnd);
    }

    public clickListenHandle = (event: any) => {
        console.log(event.target.getAttribute('id'));
        if (event.target.getAttribute('id') !== 'showGenre' 
            && event.target.getAttribute('id') !== 'showPrice') {
            this.doHideAllHandle();
        }
    }

    public loadGashaponCallback = (page: number): void => {
        this.setState({page: page + 1});
    }

    public readonly onChangeIndex = (index: number, indexLast: number): void => {
        this.setState({
            current: index
        });
    }

    public doChangeGenreHandle = (genre: string): void => {
        history.push(`/gashapons/${genre}`);
    }

    public doChangeTopicHandle = (topic: string): void => {
        history.push(`/gashapons/topic/${topic}`);
    }

    public onBannerNavHandle = (type: number, param: string) => {
        Base.onNavHandle(type, param);
    }

    public doChangePriceHandle = ({min, max}: {min: number, max?: number}): void => {
        console.log(min, max);
        const { match } = this.props;
        const price = {
            min: min,
            max: max
        };
        history.push(`/gashapons/${match.params.genre}/${JSON.stringify(price)}`);
    }

    public doToogleGenreHandle = (): void => {
        this.setState({
            showGenre: !this.state.showGenre
        });
    }

    public doTooglePriceHandle = (): void => {
        this.setState({
            showPrice: !this.state.showPrice
        });
    }

    public doHideAllHandle = (): void => {
        this.setState({
            showGenre: false,
            showPrice: false,
        });
    }

    render(): JSX.Element {
        const { 
            getGashapons, 
            getGashaponBanner,
            getBanners,
        } = this.props;
        return (
            <Hoc>
                <div styleName="container">
                    <Header/>
                    <Search/>
                    <News/>
                    {(getGashaponBanner && getGashaponBanner.length > 0) || (getBanners.contents && getBanners.contents.length > 0)
                    ? this.renderBanners()
                    : ''}
                    
                    {this.renderClass()}

                    {getGashapons.map((item, i) => (
                        <div 
                            key={i}
                            styleName="item"
                        >
                            <GashaItem item={item}/>
                        </div>
                    ))}
                    <Footer/>
                </div>
            </Hoc>
        );
    }

    private renderClass = (): JSX.Element => {
        const { showGenre, showPrice } = this.state;
        const { getGenres } = this.props;
        const prices = [
            {
                value: '0-8',
                min: 0,
                max: 8
            },
            {
                value: '9-16',
                min: 9,
                max: 16
            },
            {
                value: '17-24',
                min: 17,
                max: 24
            },
            {
                value: '24',
                min: 24,
            },
        ];

        return (
            <div 
                styleName="type"
            >
                <div styleName="typeBox">
                    <span 
                        id="showGenre"
                        styleName="typeIcon"
                        onClick={() => this.doToogleGenreHandle()}
                    >
                        全部分类
                    </span>
                    <div 
                        styleName="typeDetail"
                        style={{
                            visibility  : showGenre === true ? 'visible' : 'hidden',
                            opacity     : showGenre === true ? 1 : 0
                        }}
                    >
                        {getGenres.map((item: Genre, i: number) => (
                            <span 
                                key={i}
                                onClick={() => this.doChangeGenreHandle(item._id)}
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                    
                </div>
                
                <div styleName="typeBox">
                    <span 
                        id="showPrice"
                        styleName="typeIcon"
                        onClick={() => this.doTooglePriceHandle()}
                    >
                        全部价格
                    </span>
                    <div 
                        styleName="typeDetail"
                        style={{
                            visibility  : showPrice === true ? 'visible' : 'hidden',
                            opacity     : showPrice === true ? 1 : 0
                        }}
                    >
                        {prices.map((item: any, i: number) => (
                            <div 
                                key={i}
                                onClick={() => this.doChangePriceHandle({min: item.min, max: item.max})}
                            >
                                {item.value}
                            </div>
                        ))}    
                    </div> 
                </div>
            </div>
        );
    }

    private renderBanners = (): JSX.Element => {

        const { current } = this.state;
        const { getGashaponBanner, getBanners } = this.props;

        const style = {
            width: '92vw',
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

        prepareData.map((item: BannerType, i) => {
            data.push(
                <div 
                    key={i}
                    styleName="wrapItem"
                    onClick={() => this.onBannerNavHandle(item.type, item.param)}
                >
                    <i
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
    getGenres           : getGenres(state),
    getTopics           : getTopics(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>, state: Stores) => ({
    loadGashapons       : bindActionCreators(loadGashapons, dispatch),
    loadGashaponsByGenre: bindActionCreators(loadGashaponsByGenre, dispatch),
    loadGashaponsByTopic: bindActionCreators(loadGashaponsByTopic, dispatch),
    loadBannersByGenre  : bindActionCreators(loadBannersByGenre, dispatch),
    loadBannersByTopic  : bindActionCreators(loadBannersByTopic, dispatch),
    loadGashaponsByWord : bindActionCreators(loadGashaponsByWord, dispatch),
    loadGenres          : bindActionCreators(loadGenres, dispatch),
    loadTopics          : bindActionCreators(loadTopics, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GashaponHoc);