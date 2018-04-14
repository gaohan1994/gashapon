import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Swiper from '../swiper';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    BannerType,
    Genre,
    Genres,
} from '../../types/componentTypes';
import { 
    getBanners, 
    getGenres,
} from '../../reducers/main';
import { 
    MainActions,
} from '../../actions/main';
import history from '../../history';

interface Props {
    getBanners  ?: {contents: BannerType[]};
    getGenres   ?: Genres;
}

interface State {
    showGenres: boolean;
}

class Header extends React.Component<Props, State> {

    constructor(props: Props) {

        super(props);

        this.state = {
            showGenres: false
        };
    }

    render() {
        const { getBanners } = this.props;
        return (
            <header styleName="container">
                {this.renderGenres()}
                <i styleName="clock"/>
                <i styleName="search"/>
                <div styleName="item1" onClick={this.toggleGenres}/>
                <div styleName="item2"/>
                <div styleName="item3"/>
                <div styleName="swiper">
                    {getBanners && getBanners.contents
                    ? <Swiper images={getBanners.contents}/>
                    : ''}
                </div>
            </header>
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
                <div styleName="wrapper">
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

    private doChangeGenreHandle = (genre: string): void => {
        history.push(`/gashapons/${genre}`);
    }

    private toggleGenres = (): void => {
        this.setState({
            showGenres: !this.state.showGenres
        });
    }
}

const HeaderHoc = CSSModules(Header, styles);

const mapStateToProps = (state: Stores) => ({
    getBanners  : getBanners(state),
    getGenres   : getGenres(state),
});

const mapDispatchToProps = (dispatch: Dispatch<MainActions>, state: Stores) => ({

});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HeaderHoc);