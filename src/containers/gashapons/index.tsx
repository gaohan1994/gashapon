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
} from '../../actions/main';
import { 
    getGashapons,
    getGashaponBanner,
} from '../../reducers/main';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoSwipeableViews = autoPlay(SwipeableViews);

interface Props {
    match: {
        params: {
            genre: string;
            topic: string;
        }
    };
    getGashapons        : Gashapons;
    loadGashapons       : () => void;
    loadGashaponsByGenre: ({}: LoadGashaponsParam) => void;
    loadGashaponsByTopic: ({}: LoadGashaponsParam) => void;
    loadBannersByGenre  : (genre: string) => void;
    loadBannersByTopic  : (topic: string) => void;
    getGashaponBanner   : BannerType[];
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
            page: 0,
            current: 0,
        };
    }

    componentDidMount(): void {
        const { page } = this.state;
        const { 
            match,
            loadGashapons,
            loadGashaponsByGenre,
            loadGashaponsByTopic,
            loadBannersByGenre,
            loadBannersByTopic,
        } = this.props;
        
        if (!!match.params.genre) {

            loadGashaponsByGenre({genre: match.params.genre});
            loadBannersByGenre(match.params.genre);
        } else if (!!match.params.topic) {

            loadBannersByTopic(match.params.topic);
            loadGashaponsByTopic({topic: match.params.topic});
        } else {
            
            loadGashapons();
        }
        
        arriveFooter.add('gashapons', () => {
            if (!!match.params.genre) {
                loadGashaponsByGenre({genre: match.params.genre, page: page + 1, callback: this.loadGashaponCallback});
            }
        });
    }

    componentWillUnmount(): void {
        arriveFooter.remove('gashapons');
    }

    public loadGashaponCallback = (page: number): void => {
        this.setState({page: page}, () => { console.log(this.state.page) ; } );
    }

    public readonly onChangeIndex = (index: number, indexLast: number): void => {
        this.setState({
            current: index
        });
    }

    render(): JSX.Element {
        const { getGashapons, getGashaponBanner } = this.props;
        return (
            <div styleName="container">
                {getGashaponBanner && getGashaponBanner.length > 0
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
                <Footer/>
            </div>
        );
    }

    private renderBanners = (): JSX.Element => {

        const { current } = this.state;
        const { getGashaponBanner } = this.props;

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

        getGashaponBanner.map((item: BannerType, i) => {
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
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>, state: Stores) => ({
    loadGashapons       : bindActionCreators(loadGashapons, dispatch),
    loadGashaponsByGenre: bindActionCreators(loadGashaponsByGenre, dispatch),
    loadGashaponsByTopic: bindActionCreators(loadGashaponsByTopic, dispatch),
    loadBannersByGenre  : bindActionCreators(loadBannersByGenre, dispatch),
    loadBannersByTopic  : bindActionCreators(loadBannersByTopic, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GashaponHoc);