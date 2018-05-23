import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';
import SignModal from '../../containers/sign';
import News from '../../components/news';
import User from '../../classes/user';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    StatusActions, 
    showSignModal,
    showNews,
} from '../../actions/status';
import { Stores } from '../../reducers/type';
import { getGenres } from '../../reducers/main';
import { Genres, Genre } from '../../types/componentTypes';

interface Props {
    title           : string;
    showSignModal   ?: () => void;
    showNews        ?: () => void;
    getGenres       ?: Genres;
}

interface State {
    value       : string;
    showSearch  : boolean;
    showGenres  : boolean;
}

class Header extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = { 
            value       : '',
            showSearch  : false,
            showGenres  : false,
        };
    }

    public doShowSearchHandle = () => {
        const { showSignModal } = this.props;
        const user = User.getUser();
        if (!user.uid) {
            
            if (showSignModal) {
                showSignModal();
            }
        } else {

            this.setState({
                showSearch: true
            });
        }
    }

    public doShowNewsHandle = () => {
        const { showNews, showSignModal } = this.props;
        const user = User.getUser();

        if (!user.uid) {

            if (showSignModal) {
                showSignModal();
            }
        } else {

            if (showNews) {
                showNews();
            }
        }
    }

    public doHideSearchHandle = () => {
        this.clearValue();
        this.setState({
            showSearch: false
        });
    }

    public onChangeHandle = (e: any) => {
        this.setState({
            value: e.target.value
        });
    }

    public clearValue = () => {
        this.setState({
            value: ''
        });
    }

    public doSearchHandle = () => {
        const { value } = this.state;
        this.doHideSearchHandle();
        history.push(`/inventory/word/${value}`);
    }

    public doSearchHandleCallback = () => {
        this.setState({
            showSearch: false,
        });
    }

    public toggleGenres = (): void => {
        this.setState({
            showGenres: !this.state.showGenres,
        });
    }

    public doChangeGenreHandle = (genre: string): void => {
        this.toggleGenres();
        history.push(`/inventory/genre/${genre}`);
    }

    public onNavHandle = (): void => {
        history.push('/inventory');
    }

    render() {
        const { title } = this.props; 
        return (
            <header 
                styleName="container"
                bgimg-center="100"
            >
                <SignModal/>
                <News/>
                <i 
                    styleName="icons"
                    bgimg-center="100"
                    style={{backgroundImage: `url(//net.huanmusic.com/gasha/inventory/%E5%88%86%E7%B1%BB.png)`}}
                    onClick={() => this.toggleGenres()}
                />
                <div 
                    styleName="search"
                    onClick={this.doShowSearchHandle}
                >
                    <i 
                        styleName="searchIcon"
                        bgimg-center="100"
                    />
                    {title ? title : '输入关键字搜索扭蛋'}
                </div>
                <i 
                    styleName="icons"
                    bgimg-center="100"
                    style={{backgroundImage: `url(//net.huanmusic.com/gasha/%E6%B6%88%E6%81%AF.png)`}}
                    onClick={() => this.doShowNewsHandle()}
                />
                {this.renderSearch()}
                {this.renderGenre()}
            </header>
        );
    }

    private renderSearch = (): JSX.Element => {
        const { showSearch, value } = this.state;
        return (
            <div 
                styleName={showSearch === true ? 'show' : 'hide'}
                style={{bottom: showSearch === true ? '0' : '-100vh'}}
            >
                <div 
                    styleName="container"
                    bgimg-center="100"
                >
                    <i 
                        styleName="icons"
                        bgimg-center="100"
                        style={{backgroundImage: `url(//net.huanmusic.com/gasha/%E8%BF%94%E5%9B%9E%E6%8B%B7%E8%B4%9D2.png)`}}
                        onClick={this.doHideSearchHandle}
                    />
                    <input
                        styleName="search"
                        placeholder="输入关键字搜索"
                        value={value}
                        onChange={this.onChangeHandle}
                    />
                    <i 
                        styleName="icons"
                        bgimg-center="100"
                        style={{backgroundImage: 'url(//net.huanmusic.com/gasha/%E6%9F%A5%E8%AF%A2.png)'}}
                        onClick={this.doSearchHandle}
                    />
                </div>
            </div>
        );
    }

    private renderGenre = (): JSX.Element => {
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
                    <button styleName="bigButton" onClick={() => this.onNavHandle()}>全部分类</button>
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
}

const HeaderHoc = CSSModules(Header, styles);

export const mapStateToProps = (state: Stores) => ({
    getGenres: getGenres(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<StatusActions>, state: Stores) => ({
    showNews        : bindActionCreators(showNews, dispatch),
    showSignModal   : bindActionCreators(showSignModal, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HeaderHoc);