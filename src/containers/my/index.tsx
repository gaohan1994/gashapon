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

import { Stores } from '../../types/reducerTypes';

import { 
    
} from '../../types/componentTypes';

import { 

} from '../../actions/main';

import { 

} from '../../reducers/main';

export interface Props {

}

export interface State {
    
}

/**
 * @returns 
 * @memberof My
 * 我的页面
 * render:
 */

class My extends React.Component<Props, State> {

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
        return (
            <div styleName="user">
                <i 
                    styleName="set"
                    onClick={() => this.onNavHandle('set')}
                />
                <i styleName="money"/>
            </div>
        );
    }

    private renderMenu = (): JSX.Element => {
        const menus = [
            {
                _id: 1,
                value: '收藏',
                img: ''
            },
            {
                _id: 2,
                value: '砍价',
                img: ''
            },
            {
                _id: 3,
                value: '地址',
                img: ''
            },
            {
                _id: 4,
                value: '成就',
                img: ''
            },
            {
                _id: 5,
                value: '优惠券',
                img: ''
            },
        ];
        return (
            <div styleName="menu">
                <Menu 
                    menus={menus}
                    height={170}
                />
            </div>
        );
    }

    private renderUtils = (): JSX.Element => {
        const menus = [
            {
                _id: 1,
                value: '我的订单',
                img: '',
                param: '123',
            },
            {
                _id: 2,
                value: '待确认',
                img: '',
                param: '123',
            },
            {
                _id: 3,
                value: '待发货',
                img: '',
                param: '12312',
            },
            {
                _id: 4,
                value: '已发货',
                img: '',
                param: '123',
            },
        ];
        return (
            <div styleName="utils">
                <Menu 
                    menus={menus}
                    height={160}    
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
            <div styleName="data">
                <div styleName="dataBanner">我的数据</div>
                <Menu 
                    menus={menus}
                    height={190}
                />
            </div>
        );
    }
}

const MyHoc = CSSModules(My, styles);

export const mapStateToProps = (state: Stores) => ({

});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MyHoc);