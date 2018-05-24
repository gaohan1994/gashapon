import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Header from '../../components/header_home';
import Footer from '../../components/footer';
import Banner from '../../components/banner';
import Search from '../../components/search';
import News from '../../components/news';
import Menu, { MenuItem } from '../../components/menu_v1';
import DataItem from '../../components/content_item';
import Sign from '../../classes/sign';
import Base from '../../classes/base';
import SignModal from '../sign';
import Hoc from '../hoc';
import config from '../../config/index';
import { Stores } from '../../reducers/type';
import history from '../../history';
import { MainData } from '../../types/componentTypes';
import { 
    loadBanners,
    loadGenres,
    loadTopics,
    loadMainData
} from '../../actions/main';
import { loadNotifies } from '../../actions/status';
import { getData } from '../../reducers/main';
import { timeFn } from '../../config/util';
import * as moment from 'moment';

interface Props {
    loadBanners : () => void;
    loadGenres  : () => void;
    loadTopics  : () => void;
    loadMainData: (callback: (res: any) => void) => void;
    loadNotifies: () => void;
    getData     : MainData;
}

interface State {
    flashDate   : string;
}

/**
 * @returns 
 * @memberof Main
 * 首页
 * render:
 * renderHotItems   : func  渲染热卖商品
 */
class Main extends React.Component<Props, State> {

    private timer: any;

    constructor (props: Props) {
        super(props);
        this.state = {
            flashDate: ''
        };

        this.onNavHandle = this.onNavHandle.bind(this);
        this.onMenuClickHandle = this.onMenuClickHandle.bind(this);
        this.doLogoutHandle = this.doLogoutHandle.bind(this);
        this.goGashaponHandle = this.goGashaponHandle.bind(this);
        this.loadMainDataCallback = this.loadMainDataCallback.bind(this);
        this.setDateHandle = this.setDateHandle.bind(this);
    }

    componentDidMount(): void {
        
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
        loadMainData(this.loadMainDataCallback);
        loadNotifies();
    }

    componentWillUnmount(): void {
        
        clearInterval(this.timer);
    }

    public onNavHandle = (type: string): void => {
        
        history.push(`/${type}`);
    }

    public onMenuClickHandle = (type: number, param: string): void => {

        Base.onNavHandle(type, param);
    }

    public doLogoutHandle = async (): Promise<void> => {
        
        await Sign.doLogoutMethod();
        window.location.reload();
    }

    public goGashaponHandle = (param: string): void => {
        history.push(`/gashapon/${param}`);
    }

    public loadMainDataCallback = (data: MainData): void => {

        if (!!data.flash_sale) {
            
            if (!!data.flash_sale.open_time) {
                this.timer = setInterval(() => this.setDateHandle(data.flash_sale.end_time), 1000);
            }
        }
    }

    public setDateHandle = (date?: Date): void => {

        if (!!date) {
            const endDate = moment(date).format();
            const result = ' 距离开始还有 ' + timeFn(endDate);
            this.setState({
                flashDate: result
            });
        }
    }

    render() {
        return (
            <Hoc>
                <div styleName="container" bg-white="true">
                    <SignModal/>
                    <Header/>
                    <Search/>
                    <News/>
                    {this.renderMenu()}
                    {this.renderTimeLimit()}
                    {this.renderMainData()}
                    <Footer/>
                </div>
            </Hoc>
        );
    }

    private readonly renderTimeLimit = (): JSX.Element => {
        const { getData } = this.props;
        return (
            <div styleName="timeLimit">
                <i 
                    styleName="timeIcon"
                    bgimg-center="100"
                />
                <div 
                    styleName="flash"
                    bgimg-center="bgimg-center"
                    style={{
                        backgroundImage: getData.flash_sale && getData.flash_sale.pics
                                        ? `url(//${config.host.pic}/${getData.flash_sale.pics[0]})`
                                        : `url(${config.empty_pic.url})`
                    }}
                    onClick={() => this.goGashaponHandle(getData.flash_sale._id)}
                >
                    
                    {this.renderFlashDate()}
                </div>
            </div>
        );
    }

    private readonly renderFlashDate = (): JSX.Element => {
        
        const { flashDate } = this.state;
        return (
            <span 
                styleName="flashName"
                font-s="24"
            >
                {flashDate}
            </span>
        );
    }

    private readonly renderMenu = (): JSX.Element | string => {

        const { getData } = this.props;
        
        const imgs = {
            '热卖排行': '//net.huanmusic.com/gasha/%E7%83%AD%E5%8D%96%E6%8E%92%E8%A1%8C.png',
            '超值特价': '//net.huanmusic.com/gasha/%E8%B6%85%E5%80%BC%E7%89%B9%E4%BB%B7.png',
            '抢先预定': '//net.huanmusic.com/gasha/%E6%8A%A2%E5%85%88%E9%A2%84%E8%AE%A2.png',
            '抢先预订': '//net.huanmusic.com/gasha/%E6%8A%A2%E5%85%88%E9%A2%84%E8%AE%A2.png',
            '新品上架': '//net.huanmusic.com/gasha/%E6%96%B0%E5%93%81%E4%B8%8A%E6%9E%B6.png',
        };
        
        if (getData && getData.advice && getData.advice.length > 0) {
            const menu: MenuItem[] = getData.advice.map((item, i) => {
                return {
                    _id             : i,
                    img             : imgs[item.name],
                    value           : item.name,
                    propsClickHandle: () => this.onMenuClickHandle(item.type, item._id),
                };
            });

            return (
                <div styleName="menus">
                    <Menu menus={menu}/>
                </div>
            );
        } else {
            return '';
        }
    }

    private readonly renderMainData = (): JSX.Element => {

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
                            bgimg-center="bgimg-center"
                            style={{backgroundImage: `url(//${config.host.pic}/${item.head})`}}
                        />
                        : ''}

                        {item.banner
                        ? <div styleName="bannerBox">
                                <Banner banner={item.banner}/>
                            </div>
                        : ''}

                        {item.content && item.content.length > 0
                        ? <div styleName="hotItems">
                            {item.content.map((content, j: number) => (
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