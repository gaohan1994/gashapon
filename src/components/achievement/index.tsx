import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

export interface AchievementType {
    name            : string;
    desc            : string;
    progress        ?: number;
    totalProgress   ?: number;
    img             : string;
    failImg         ?: string;
}

interface Props {
    achievement: AchievementType;
}

const Achievement = ({achievement}: Props) => (
    <div 
        styleName="container"
        flex-center="all-center"
    >
        {achievement && achievement.progress && achievement.totalProgress &&
        achievement.progress >= achievement.totalProgress
        ? <span 
            styleName="cover"  
            bgimg-center="100" 
            style={{backgroundImage: `url(${achievement.img})`}}
        />
        : <span 
            styleName="cover"  
            bgimg-center="100" 
            style={{backgroundImage: `url(${achievement.failImg})`}}
        >{achievement.progress} / {achievement.totalProgress}
        </span>}
        
        <span 
            styleName="name" 
            font-s="30"
        >
            {achievement.name}
        </span>

        <span styleName="desc">
            {achievement.desc}
        </span>
    </div>
);

const AchievementHoc = CSSModules(Achievement, styles);

export default AchievementHoc;