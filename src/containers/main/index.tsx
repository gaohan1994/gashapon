
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Header from '../../components/header_home';
import Footer from '../../components/footer';
// import config from '../../config';
import Banner from '../../components/banner';
import Search from '../../components/search';
import News from '../../components/news';
import Menu from '../../components/menu_v1';
import DataItem from '../../components/content_item';
import { Stores } from '../../reducers/type';
// import history from '../../history';
import { 
    MainData
} from '../../types/componentTypes';
import { 
    loadBanners,
    loadGenres,
    loadTopics,
    loadMainData,
} from '../../actions/main';
import { 
    loadNotifies,
} from '../../actions/status';
import {
    getData,
} from '../../reducers/main';

interface Props {
    loadBanners : () => void;
    loadGenres  : () => void;
    loadTopics  : () => void;
    loadMainData: () => void;
    loadNotifies: () => void;
    getData     : MainData;
}

interface State {
    meta: string;
}

/**
 * @returns 
 * @memberof Main
 * 首页
 * render:
 * renderHotItems   : func  渲染热卖商品
 */
class Main extends React.Component<Props, State> {

    async componentDidMount() {
        const { 
            loadBanners,
            loadGenres,
            loadTopics,
            loadMainData,
            loadNotifies,
        } = this.props;
        loadBanners();
        loadGenres();
        loadTopics();
        loadMainData();
        loadNotifies();

        // history.push('/login');
    }

    render() {
        return (
            <div styleName="container">
                <Header/>
                <Search/>
                <News/>
                {this.renderMenu()}
                {this.renderTimeLimit()}
                {this.renderMainData()}
                {/* 
                    <Banner/>
                    {this.renderHotItems()}
                    {this.renderHotItems()}  
                */}
                <Footer/>
            </div>
        );
    }

    private renderTimeLimit = (): JSX.Element => {
        return (
            <div styleName="timeLimit">
                <i styleName="timeIcon"/>
            </div>
        );
    }

    private renderMenu = (): JSX.Element => {
        const menu = [
            {
                _id: 1,
                img: 'http://net.huanmusic.com/gasha/%E7%83%AD%E5%8D%96%E6%8E%92%E8%A1%8C.png',
                value: '热卖排行'
            },
            {
                _id: 2,
                img: 'http://net.huanmusic.com/gasha/%E8%B6%85%E5%80%BC%E7%89%B9%E4%BB%B7.png',
                value: '超值特价'
            },
            {
                _id: 3,
                img: 'http://net.huanmusic.com/gasha/%E6%8A%A2%E5%85%88%E9%A2%84%E8%AE%A2.png',
                value: '抢先预订'
            },
            {
                _id: 4,
                img: 'http://net.huanmusic.com/gasha/%E6%96%B0%E5%93%81%E4%B8%8A%E6%9E%B6.png',
                value: '新品上架'
            },
        ];
        return (
            <div styleName="menus">
                <Menu menus={menu}/>
            </div>
        );
    }

    private renderMainDataHeaderImg = (type: string): string => {
        switch (type) {
            case '热门推荐':
                return 'http://net.huanmusic.com/gasha/%E7%83%AD%E9%97%A8%E4%B8%BB%E9%A2%981.png';

            default: return '';
        }
    }

    private renderMainData = (): JSX.Element => {
        const { getData } = this.props;

        return (
            <div styleName="mainData" content-clear="clear">
                {getData.content && getData.content.length > 0
                ? getData.content.map((item, i) => (
                    <div 
                        key={i}
                        content-clear="clear"
                    >
                        {item.name 
                        ? <div 
                            styleName="mainDataHeader"
                            style={{
                                backgroundImage: this.renderMainDataHeaderImg(item.name)
                            }}
                        />
                        : ''}

                        {item.banner
                        ? <div styleName="bannerBox">
                            <Banner banner={item.banner}/>
                        </div>
                        : ''}

                        {item.content && item.content.length > 0
                        ? <div styleName="hotItems">
                            {item.content.map((content, j) => (
                                <DataItem 
                                    key={i + j} 
                                    content={content}
                                />
                            ))}
                        </div>
                        : ''}
                    </div>
                ))
                : ''}
            </div>
        );
    }
}

const MainHoc = CSSModules(Main, styles);

const mapStateToProps = (state: Stores) => ({
    getData: getData(state),
});

const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    loadBanners : bindActionCreators(loadBanners, dispatch),
    loadGenres  : bindActionCreators(loadGenres, dispatch),
    loadTopics  : bindActionCreators(loadTopics, dispatch),
    loadMainData: bindActionCreators(loadMainData, dispatch),
    loadNotifies: bindActionCreators(loadNotifies, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainHoc);