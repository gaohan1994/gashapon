import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/header_achievement';
import Achievement from '../../components/achievement';

interface Props {

}

interface State {

}

class Achievements extends React.Component<Props, State> {
    render () {
        const achievements = [
            {
                name: '我的处女蛋',
                desc: '扭蛋1次',
                progress: 0,
                totalProgress: 1,
            },
            {
                name: '扭蛋爱好者',
                desc: '扭蛋30次',
                progress: 5,
                totalProgress: 30,
            },
            {
                name: '我的处女蛋',
                desc: '百蛋斩',
                progress: 17,
                totalProgress: 100,
            },
            {
                name: '我的处女蛋',
                desc: '扭蛋1次',
                progress: 5,
                totalProgress: 6,
            },
            {
                name: '我的处女蛋',
                desc: '扭蛋1次',
                progress: 10,
                totalProgress: 10,
            }
        ];
        return (
            <div styleName="container">
                <Header/>

                {achievements.map((item, i) => (
                    <div styleName="item" key={i}>
                        <Achievement achievement={item}/>
                    </div>
                ))}
            </div>
        );
    }
}

const AchievementsHoc = CSSModules(Achievements, styles);

export default AchievementsHoc;