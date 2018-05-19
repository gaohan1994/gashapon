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

    public onBackHandle = (): void => {
        history.goBack();
    }

    render () {
        const achievements = [
            {
                name: '我的处女蛋',
                desc: '暂无奖励',
                img: 'http://net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E8%9B%8B%E5%9C%88.png',
                progress: 0,
                totalProgress: 1,
            },
            {
                name: '扭蛋爱好者',
                desc: '暂无奖励',
                img: 'http://net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E8%9B%8B%E5%9C%88.png',
                progress: 5,
                totalProgress: 30,
            },
            {
                name: '我的处女蛋',
                desc: '暂无奖励',
                img: 'http://net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E8%9B%8B%E5%9C%88.png',
                progress: 17,
                totalProgress: 100,
            },

            /* bianmai */
            {
                name: '变卖1个扭蛋',
                desc: '暂无奖励',
                img: 'http://net.huanmusic.com/gasha/%E4%BE%9D%E4%BE%9D%E4%B8%8D%E8%88%8D.png',
                progress: 10,
                totalProgress: 10,
            },
            {
                name: '变卖30个扭蛋',
                desc: '暂无奖励',
                img: 'http://net.huanmusic.com/gasha/%E6%8C%A5%E6%89%8B%E6%B3%AA%E5%88%AB.png',
                progress: 10,
                totalProgress: 10,
            },
            {
                name: '变卖100个扭蛋',
                desc: '暂无奖励',
                img: 'http://net.huanmusic.com/gasha/%E7%A6%8F%E6%83%A0%E5%8F%8C%E8%87%B3.png',
                progress: 10,
                totalProgress: 10,
            },
            
            /* danmu */
            {
                name: '发送1条弹幕',
                desc: '暂无奖励',
                img: 'http://net.huanmusic.com/gasha/%E5%B0%8F%E8%AF%95%E8%BA%AB%E6%89%8B.png',
                progress: 10,
                totalProgress: 10,
            },
            {
                name: '发送30条弹幕',
                desc: '暂无奖励',
                img: 'http://net.huanmusic.com/gasha/%E5%A3%B0%E5%90%8D%E8%BF%9C%E6%89%AC.png',
                progress: 10,
                totalProgress: 10,
            },
            {
                name: '发送100条弹幕',
                desc: '暂无奖励',
                img: 'http://net.huanmusic.com/gasha/%E5%BC%B9%E5%B9%95%E7%82%AE%E5%8F%B0.png',
                progress: 10,
                totalProgress: 10,
            },
        ];

        return (
            <div styleName="container" bg-white="true">
                {this.renderHeader()}

                {achievements.map((item, i) => (
                    <div  flex-center="all-center" styleName="item" key={i}>
                        <Achievement achievement={item}/>
                    </div>
                ))}
            </div>
        );
    }

    private renderHeader = (): JSX.Element => {
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
                        <span>集齐<span font-s="30" styleName="number">0</span>枚</span>
                        <i 
                            styleName="medalIcon"
                            bgimg-center="100"
                            style={{backgroundImage: `url(http://net.huanmusic.com/gasha/%E9%9A%BE.png)`}}
                        />
                    </li>
                    <li styleName="medal"  style={{width: '40vw'}}>
                        <span>集齐<span font-s="30" styleName="number">0</span>枚</span>
                        <i 
                            styleName="medalIcon"
                            bgimg-center="100"
                            style={{backgroundImage: `url(http://net.huanmusic.com/gasha/%E4%B8%AD.png)`}}
                        />
                    </li>
                    <li styleName="medal"  style={{width: '45vw'}}>
                        <span>集齐<span font-s="30" styleName="number">0</span>枚</span>
                        <i 
                            styleName="medalIcon"
                            bgimg-center="100"
                            style={{backgroundImage: `url(http://net.huanmusic.com/gasha/%E6%98%93.png)`}}
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