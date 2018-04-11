import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
// import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Footer from '../../components/footer';
import Header from '../../components/header_my';
import Menu from '../../components/menu';
import history from '../../history';
import Hoc from '../hoc';
import config from '../../config';
import { Userdata } from '../../types/user';
import { Stores } from '../../reducers/type';

import { 
    
} from '../../types/componentTypes';

import { 

} from '../../actions/home';

import { 
    getUserdata
} from '../../reducers/home';

interface Props {
    getUserdata: Userdata;
    loadUserData: (userId: string) => void;
}

interface State {
    
}

/**
 * @returns 
 * @memberof My
 * 我的页面
 * render:
 */

class My extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
    }

    componentDidMount(): void {
        const { 

        } = this.props;
    }

    public onNavHandle = (param: string): void => {
        history.push(`/${param}`);
    }

    render(): JSX.Element {
        const { } = this.props;
        return (
            <div styleName="container">
                <Header/>
                {this.renderProfile()}
                {this.renderMenu()}
                {this.renderUtils()}
                {this.renderMyData()}
                <Footer/>
            </div>
        );
    }

    private renderProfile = (): JSX.Element => {
        const { getUserdata } = this.props;
        console.log('getUserdata', getUserdata);
        return (
            <div styleName="user">
                <i 
                    styleName="set"
                    onClick={() => this.onNavHandle('set')}
                />
                <div 
                    bgimg-center="bgimg-center"
                    styleName="cover"
                    style={{
                        backgroundImage: `url(${config.empty_pic.url})`
                    }}
                />
                <div styleName="module">
                    <span styleName="status">
                        {getUserdata._id && getUserdata.name
                        ? getUserdata.name
                        : '未登录'}
                    </span>
                    <i 
                        bgimg-center="bgimg-center"
                        styleName="sex"
                        style={{
                            backgroundImage: `url(http://net.huanmusic.com/www/img/rs/%E7%94%B7%E6%A0%87%E8%AF%86.png)`
                        }}
                    />
                </div>
                {/* <i styleName="money"/> */}
            </div>
        );
    }

    private renderMenu = (): JSX.Element => {
        const menus = [
            {
                _id: 1,
                value: '收藏',
                img: 'http://net.huanmusic.com/gasha/gacha-center.png',
                size: '127px auto',
                position: '-38px 0',
            },
            {
                _id: 2,
                value: '砍价',
                img: 'http://net.huanmusic.com/gasha/gacha-center.png',
                size: '127px auto',
                position: '-96px -114px',
            },
            {
                _id: 3,
                value: '地址',
                img: 'http://net.huanmusic.com/gasha/gacha-center.png',
                size: '127px auto',
                position: '-62.5px -56px',
            },
            {
                _id: 4,
                value: '成就',
                img: 'http://net.huanmusic.com/gasha/gacha-center.png',
                size: '127px auto',
                position: '-97px 0',
            },
            {
                _id: 5,
                value: '优惠券',
                img: 'http://net.huanmusic.com/gasha/gacha-center.png',
                size: '127px auto',
                position: '0 -25px',
            },
        ];
        return (
            <div styleName="menu">
                <Menu 
                    menus={menus}
                    height={170}
                    iconWidth="33px"
                    iconHeight="29.5px"
                />
            </div>
        );
    }

    private renderUtils = (): JSX.Element => {
        const menus = [
            {
                _id: 1,
                value: '我的订单',
                img: 'http://net.huanmusic.com/gasha/gacha-center.png',
                size: '127px auto',
                position: '-71px -2px',
                param: 'order',
            },
            {
                _id: 2,
                value: '待确认',
                img: 'http://net.huanmusic.com/gasha/gacha-center.png',
                size: '127px auto',
                position: '-72.5px -30px',
                param: '123',
            },
            {
                _id: 3,
                value: '待发货',
                img: 'http://net.huanmusic.com/gasha/gacha-center.png',
                size: '127px auto',
                position: '-32.5px -30.5px',
                param: '12312',
            },
            {
                _id: 4,
                value: '已发货',
                img: 'http://net.huanmusic.com/gasha/gacha-center.png',
                size: '127px auto',
                position: '-30.5px -56.5px',
                param: '123',
            },
        ];
        return (
            <div styleName="utils">
                <Menu 
                    menus={menus}
                    height={160} 
                    iconWidth="29px"
                    iconHeight="25px"
                />
            </div>
        );
    }

    private renderMyData = (): JSX.Element => {
        const menus = [
            {
                _id: 1,
                value: '扭蛋',
                img: '',
                param: '123',
            },
            {
                _id: 2,
                value: '集齐',
                img: '',
                param: '123',
            },
            {
                _id: 3,
                value: '弹幕',
                img: '',
                param: '12312',
            },
            {
                _id: 4,
                value: '砍价',
                img: '',
                param: '123',
            },
            {
                _id: 5,
                value: '蛋卷折扣',
                img: '',
                param: '123',
            },
        ];
        return (
            <Hoc>
                <div styleName="data">
                    <div styleName="dataBanner">我的数据</div>
                    <Menu 
                        menus={menus}
                        height={190}
                    />
                </div>
            </Hoc>
        );
    }
}

const MyHoc = CSSModules(My, styles);

export const mapStateToProps = (state: Stores) => ({
    getUserdata: getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MyHoc);