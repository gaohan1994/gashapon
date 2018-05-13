import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Achievement from '../../components/achievement';
import history from '../../history';

interface Props {

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
                desc: '扭蛋1次',
                img: 'http://net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E8%9B%8B%E5%9C%88.png',
                progress: 0,
                totalProgress: 1,
            },
            {
                name: '扭蛋爱好者',
                desc: '扭蛋30次',
                img: 'http://net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E8%9B%8B%E5%9C%88.png',
                progress: 5,
                totalProgress: 30,
            },
            {
                name: '我的处女蛋',
                desc: '百蛋斩',
                img: 'http://net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E8%9B%8B%E5%9C%88.png',
                progress: 17,
                totalProgress: 100,
            },
            {
                name: '我的处女蛋',
                desc: '扭蛋1次',
                img: 'http://net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E8%9B%8B%E5%9C%88.png',
                progress: 5,
                totalProgress: 6,
            },
            {
                name: '我的处女蛋',
                desc: '扭蛋1次',
                img: 'http://net.huanmusic.com/gasha/%E5%88%9D%E5%85%A5%E8%9B%8B%E5%9C%88.png',
                progress: 10,
                totalProgress: 10,
            }
        ];

        return (
            <div styleName="container">
                {this.renderHeader()}

                {achievements.map((item, i) => (
                    <div styleName="item" key={i}>
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

export default AchievementsHoc;