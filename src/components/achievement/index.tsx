import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

export interface AchievementType {
    name            : string;
    desc            : string;
    progress        ?: number;
    totalProgress   ?: number;
    img             : string;
}

interface Props {
    achievement: AchievementType;
}

const Achievement = ({achievement}: Props) => (
    <div 
        styleName="container"
        flex-center="all-center"
    >
        <i styleName="cover"  bgimg-center="100" style={{backgroundImage: `url(${achievement.img})`}}/>
        <span styleName="name" font-s="30">{achievement.name}</span>
        <span styleName="desc">{achievement.desc}</span>
    </div>
);

const AchievementHoc = CSSModules(Achievement, styles);

export default AchievementHoc;