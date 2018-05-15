import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    StatusActions,
    hideShareModal,
} from '../../actions/status';
import { getShareStatus } from '../../reducers/status';

export type ShareType = 'weibo' | 'weixin' | 'qzone' | 'qq'; 

interface Props {
    getShareStatus  ?: boolean;
    hideShareModal  ?: () => void;
    propsClickHandle?: (type: ShareType) => void;
}

type Menus = Array<{
    _id     : number, 
    value   : 'weibo' | 'weixin' | 'qzone' | 'qq',
    title   : string;
    img     : string;
}>;

class ShareModal extends React.Component <Props, {}> {

    render () {

        const { 
            getShareStatus, 
            propsClickHandle = (type: ShareType) => {/*no empty*/},
            hideShareModal,
        } = this.props;

        const menus: Menus = [
            {
                _id: 1,
                value: 'qq',
                title: 'qq',
                img: 'http://net.huanmusic.com/activity/qq.png',
            },
            {
                _id: 2,
                value: 'weixin',
                title: '微信',
                img: 'http://net.huanmusic.com/activity/weixin.png',
            },
            {
                _id: 3,
                value: 'weibo',
                title: '微博',
                img: 'http://net.huanmusic.com/activity/weibo.png',
            },
            {
                _id: 4,
                value: 'qzone',
                title: 'qq空间',
                img: 'http://net.huanmusic.com/activity/qqzone.png',
            },
        ];

        return (
            <div 
                styleName="container"
                // onClick={hideShareModal}
                style={{
                    visibility  : getShareStatus === true ? 'visible' : 'hidden',
                    opacity     : getShareStatus === true ? 1 : 0
                }}
            >
                <div 
                    styleName="content"
                    style={{bottom  : getShareStatus === true ? '0' : '100vh'}}
                >
                    <div 
                        styleName="menus"
                        flex-center="all-center"
                    >
                        {menus.map((item) => {
                            return (
                                <div
                                    styleName="item"
                                    flex-center="all-center"
                                    key={item._id}
                                    onClick={propsClickHandle ? () => propsClickHandle(item.value) : () => {/*no empty*/}}
                                >
                                    <i 
                                        styleName="icon"
                                        bgimg-center="100"
                                        style={{backgroundImage: `url(${item.img})`}}
                                    />
                                    <span styleName="title">{item.title}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div styleName="button" onClick={hideShareModal}>取消分享</div>
                </div>
                
            </div>
        );
    }
}

const ShareModalHoc = CSSModules(ShareModal, styles);

const mapStateToProps = (state: Stores) => ({
    getShareStatus: getShareStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch<StatusActions>) => ({
    hideShareModal: bindActionCreators(hideShareModal, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ShareModalHoc);