import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Header from '../../components/header_home';
import Footer from '../../components/footer';
import config from '../../config';
import Banner from '../../components/banner';

import { Stores } from '../../reducers/type';

import { 

} from '../../types/componentTypes';

import { 
    loadBanners
} from '../../actions/main';

import {

} from '../../reducers/main';

interface Props {
    loadBanners : () => void;
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

    componentDidMount() {
        const { 
            // loadBanners
        } = this.props;
        // loadBanners();
    }

    render() {
        return (
            <div styleName="container">
                <Header/>
                {this.renderHotItems()}
                <Banner/>
                {this.renderHotItems()}
                {this.renderHotItems()} 
                <Footer/>
            </div>
        );
    }

    private renderHotItems = () => {
        const items = [
            {
                _id: 1,
                name: '热卖',
            },
            {
                _id: 2,
                name: '限时',
            },
            {
                _id: 3,
                name: '3',
            },
            {
                _id: 4,
                name: '4',
            }
        ];
        return (
            <div styleName="hotItems">
                {items.map((item: {_id: number, name: string}) => (
                    <div 
                        key={item._id}
                        styleName="hotItem"
                        style={{
                            backgroundImage: `url(${config.empty_pic.url})`
                        }}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        );
    }
}

const MainHoc = CSSModules(Main, styles);

const mapStateToProps = (state: Stores) => ({
    
});

const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    loadBanners: bindActionCreators(loadBanners, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainHoc);