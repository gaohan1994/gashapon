import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import * as numeral from 'numeral';
import config from '../../config/index';

export interface AchievementType {
    name            : string;
    desc            : string;
    progress        : number;
    totalProgress   : number;
}

interface Props {
    achievement?: AchievementType;
}

interface State {

}

class Achievement extends React.Component<Props, State> {

    render() {
        const { achievement } = this.props;
        return (
            <div 
                styleName="container"
                bgimg-center="bgimg-center"
            >
                <div
                    styleName="cover"
                    bgimg-center="bgimg-center"
                    style={{backgroundImage: `url(${config.empty_pic.url})`}}
                />
                <div styleName="detail">
                    <div styleName="name">{achievement && achievement.name ? achievement.name : '加载中'}</div>
                    <div styleName="desc">{achievement && achievement.desc ? achievement.desc : '加载中'}</div>
                    <div styleName="progress">
                        <span 
                            styleName="bar"
                            style={{backgroundImage: this.renderBackgroundImage()}}
                        >
                            {`
                            ${achievement && achievement.progress ? achievement.progress : 0}
                            /
                            ${achievement && achievement.totalProgress ? achievement.totalProgress : 1}
                            `}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    private renderBackgroundImage = (): string => {
        const { achievement } = this.props;
        
        const now   = achievement && achievement.progress ? achievement.progress : 0;
        const total = achievement && achievement.totalProgress ? achievement.totalProgress : 1;
        
        const current = (numeral(now / total).value()) * 100;
        return `linear-gradient(to right, rgb(239, 78, 77) ${current}%, rgba(0, 0, 0, 0.8) 0%)`;
    }
}

const AchievementHoc = CSSModules(Achievement, styles);

export default AchievementHoc;