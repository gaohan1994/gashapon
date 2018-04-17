import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/header_achievement';

interface Props {

}

interface State {

}

class Achievements extends React.Component<Props, State> {
    render () {
        return (
            <div styleName="container">
                <Header/>
                
            </div>
        );
    }
}

const AchievementsHoc = CSSModules(Achievements, styles);

export default AchievementsHoc;