import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Swiper from '../swiper';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    BannerType,
    Genre,
    Genres,
} from '../../types/componentTypes';
import { 
    getBanners, 
    getGenres,
    getTopics,
} from '../../reducers/main';
import { 
    StatusActions,
    showSearchModal,
    showNews,
} from '../../actions/status';
import history from '../../history';

interface Props {
    getBanners      ?: {contents: BannerType[]};
    getGenres       ?: Genres;
    showSearchModal ?: () => void;
    getTopics       ?: Genres;
    showNews        ?: () => void;
}

interface State {
    showGenres: boolean;
    showTopics: boolean;
}

class Header extends React.Component<Props, State> {

    constructor(props: Props) {

        super(props);

        this.state = {
            showGenres: false,
            showTopics: false,
        };
    }

    public doChangeGenreHandle = (genre: string): void => {
        this.toggleGenres();
        history.push(`/gashapons/${genre}`);
    }

    public doChangeTopicHandle = (topic: string): void => {
        this.toggleTopics();
        history.push(`/gashapons/topic/${topic}`);
    }

    public toggleGenres = (): void => {
        this.setState({
            showGenres: !this.state.showGenres
        });
    }

    public toggleTopics = (): void => {
        this.setState({
            showTopics: !this.state.showTopics
        });
    }

    public goCheckHandle = () => {
        history.push('/check');
    }

    render() {
        const { getBanners } = this.props;
        return (
            <header styleName="container">
                {this.renderGenres()}
                {this.renderTopics()}
                {this.renderHeader()}
                <div styleName="swiper">
                    {getBanners && getBanners.contents
                    ? <Swiper images={getBanners.contents}/>
                    : ''}
                </div>
            </header>
        );
    }

    private renderHeader = (): JSX.Element => {
        const { showSearchModal, showNews } = this.props;
        return (
            <div styleName="header">
                <i styleName="clock" onClick={this.goCheckHandle}/>
                <i styleName="search" onClick={showSearchModal}/>
                <div styleName="item1" onClick={this.toggleGenres}/>
                <div styleName="item2" onClick={this.toggleTopics}/>
                <div styleName="item3" onClick={showNews}/>
            </div>
        );
    }

    private renderGenres = (): JSX.Element | string => {
        const { showGenres } = this.state;
        const { getGenres } = this.props;
        return (
            <div 
                styleName={showGenres === true ? 'show' : 'hide'}
                onClick={this.toggleGenres}
            >
                <div 
                    styleName="wrapper"
                    style={{bottom: showGenres === true ? '0' : '-100vh'}}
                >
                    <button styleName="bigButton">全部关注</button>
                    {getGenres && getGenres.map((item: Genre, i) => (
                        <button
                            key={i}
                            styleName="smallButton"
                            onClick={() => this.doChangeGenreHandle(item._id)}
                        >
                            {item.name}
                        </button>
                    ))}
                    <button styleName="bigButton">取消</button>
                </div>
            </div>
        );
    }

    private renderTopics = (): JSX.Element => {
        const { showTopics } = this.state;
        const { getTopics } = this.props;
        return (
            <div 
                styleName={showTopics === true ? 'show' : 'hide'}
                onClick={this.toggleTopics}
            >
                <div 
                    styleName="wrapper"
                    style={{bottom: showTopics === true ? '0' : '-80vh'}}
                >
                    <button styleName="bigButton">全部关注</button>
                    {getTopics && getTopics.map((item: Genre, i) => (
                        <button 
                            key={i}
                            styleName="smallButton"
                            onClick={() => this.doChangeTopicHandle(item._id)}
                        >
                            {item.name}
                        </button>
                    ))}
                    <button styleName="bigButton">取消</button>
                </div>
            </div>
        );
    }
}

const HeaderHoc = CSSModules(Header, styles);

const mapStateToProps = (state: Stores) => ({
    getBanners  : getBanners(state),
    getGenres   : getGenres(state),
    getTopics   : getTopics(state),
});

const mapDispatchToProps = (dispatch: Dispatch<StatusActions>, state: Stores) => ({
    showSearchModal : bindActionCreators(showSearchModal, dispatch),
    showNews        : bindActionCreators(showNews, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HeaderHoc);