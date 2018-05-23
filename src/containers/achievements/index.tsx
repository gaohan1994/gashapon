import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Achievement from '../../components/achievement';
import history from '../../history';
import { connect, Dispatch } from 'react-redux';
import { Stores } from '../../reducers/type';
import { getUserdata } from '../../reducers/home';
import { Userdata } from '../../types/user';

interface Props {
    getUserdata: Userdata;
}

interface State {

}

class Achievements extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.onBackHandle = this.onBackHandle.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }

    public onBackHandle = (): void => {
        history.goBack();
    }

    render () {
        const { getUserdata } = this.props;
        const achievements = [
            {
                name: '扭蛋一次',
                desc: '暂无奖励',
                img: '//net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E8%9B%8B%E5%9C%88.png',
                failImg: '//net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E9%BB%91%E7%99%BD.png',
                progress: getUserdata.play_count,
                totalProgress: 1,
            },
            {
                name: '扭蛋30次',
                desc: '暂无奖励',
                img: '//net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E8%9B%8B%E5%9C%88.png',
                failImg: '//net.huanmusic.com/gasha/%E7%82%89%E7%81%AB%E7%BA%AF%E9%9D%92.png',
                progress: getUserdata.play_count,
                totalProgress: 30,
            },
            {
                name: '扭蛋100次',
                desc: '暂无奖励',
                img: '//net.huanmusic.com/gasha/%E7%A5%9E%E4%B9%8E%E5%85%B6%E6%8A%80.png',
                failImg: '//net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E9%BB%91%E7%99%BD.png',
                progress: getUserdata.play_count,
                totalProgress: 100,
            },

            /* bianmai */
            {
                name: '变卖1个扭蛋',
                desc: '暂无奖励',
                img: '//net.huanmusic.com/gasha/%E4%BE%9D%E4%BE%9D%E4%B8%8D%E8%88%8D.png',
                failImg: '//net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E9%BB%91%E7%99%BD.png',
                progress: getUserdata.sell_count,
                totalProgress: 1,
            },
            {
                name: '变卖30个扭蛋',
                desc: '暂无奖励',
                img: '//net.huanmusic.com/gasha/%E6%8C%A5%E6%89%8B%E6%B3%AA%E5%88%AB.png',
                failImg: '//net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E9%BB%91%E7%99%BD.png',
                progress: getUserdata.sell_count,
                totalProgress: 30,
            },
            {
                name: '变卖100个扭蛋',
                desc: '暂无奖励',
                img: '//net.huanmusic.com/gasha/%E7%A6%8F%E6%83%A0%E5%8F%8C%E8%87%B3.png',
                failImg: '//net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E9%BB%91%E7%99%BD.png',
                progress: getUserdata.sell_count,
                totalProgress: 100,
            },
            
            /* danmu */
            {
                name: '发送1条弹幕',
                desc: '暂无奖励',
                img: '//net.huanmusic.com/gasha/%E5%B0%8F%E8%AF%95%E8%BA%AB%E6%89%8B.png',
                failImg: '//net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E9%BB%91%E7%99%BD.png',
                progress: getUserdata.comment_count,
                totalProgress: 1,
            },
            {
                name: '发送30条弹幕',
                desc: '暂无奖励',
                img: '//net.huanmusic.com/gasha/%E5%A3%B0%E5%90%8D%E8%BF%9C%E6%89%AC.png',
                failImg: '//net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E9%BB%91%E7%99%BD.png',
                progress: getUserdata.comment_count,
                totalProgress: 30,
            },
            {
                name: '发送100条弹幕',
                desc: '暂无奖励',
                img: '//net.huanmusic.com/gasha/%E5%BC%B9%E5%B9%95%E7%82%AE%E5%8F%B0.png',
                failImg: '//net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E9%BB%91%E7%99%BD.png',
                progress: getUserdata.comment_count,
                totalProgress: 100,
            },
        ];

        return (
            <div styleName="container" bg-white="true">
                {this.renderHeader()}

                {achievements.map((item, i) => (
                    <div  flex-center="all-center" styleName="item" key={i}>
                        <Achievement 
                            achievement={item}
                        />
                    </div>
                ))}
            </div>
        );
    }

    private readonly renderHeader = (): JSX.Element => {

        const { getUserdata } = this.props;

        let playCount: number = 0;
        let saleCount: number = 0;
        let commentCount: number = 0;
        if (getUserdata && getUserdata.play_count) {
            if (getUserdata.play_count > 100) {
                playCount = 3;
            } else if (getUserdata.play_count > 30) {
                playCount = 2;
            } else if (getUserdata.play_count > 1) {
                playCount = 1;
            } else {
                playCount = 0;
            }
        }

        if (getUserdata && getUserdata.sell_count) {
            if (getUserdata.sell_count > 100) {
                saleCount = 3;
            } else if (getUserdata.sell_count > 30) {
                saleCount = 2;
            } else if (getUserdata.sell_count > 1) {
                saleCount = 1;
            } else {
                saleCount = 0;
            }
        }

        if (getUserdata && getUserdata.comment_count) {
            if (getUserdata.comment_count > 100) {
                commentCount = 3;
            } else if (getUserdata.comment_count > 30) {
                commentCount = 2;
            } else if (getUserdata.comment_count > 1) {
                commentCount = 1;
            } else {
                commentCount = 0;
            }
        }

        return (
            <div 
                styleName="header"
                bgimg-center="100"
            >
                <div styleName="back" onClick={() => this.onBackHandle()}>
                    <i styleName="icon" bgimg-center="100"/>
                    <span styleName="text">我的成就</span>
                </div>

                <ul styleName="medals">
                    <li styleName="medal" style={{width: '34vw'}}>
                        <span>集齐<span font-s="30" styleName="number">{playCount}</span>枚</span>
                        <i 
                            styleName="medalIcon"
                            bgimg-center="100"
                            style={{backgroundImage: `url(//net.huanmusic.com/gasha/%E9%9A%BE.png)`}}
                        />
                    </li>
                    <li styleName="medal"  style={{width: '40vw'}}>
                        <span>集齐<span font-s="30" styleName="number">{saleCount}</span>枚</span>
                        <i 
                            styleName="medalIcon"
                            bgimg-center="100"
                            style={{backgroundImage: `url(//net.huanmusic.com/gasha/%E4%B8%AD.png)`}}
                        />
                    </li>
                    <li styleName="medal"  style={{width: '45vw'}}>
                        <span>集齐<span font-s="30" styleName="number">{commentCount}</span>枚</span>
                        <i 
                            styleName="medalIcon"
                            bgimg-center="100"
                            style={{backgroundImage: `url(//net.huanmusic.com/gasha/%E6%98%93.png)`}}
                        />
                    </li>
                </ul>

                <i styleName="bigIcon" bgimg-center="100"/>
            </div>
        );
    }
}

const AchievementsHoc = CSSModules(Achievements, styles);

export const mapStateToProps = (state: Stores) => ({
    getUserdata: getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AchievementsHoc);