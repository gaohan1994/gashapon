import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';

interface Props {
    
}

class Vip extends React.Component <Props, {}> {

    public onBackHandle = (): void => {
        history.goBack();
    }

    render (): JSX.Element {
        return (
            <div styleName="container">
                <div 
                    styleName="back"
                    onClick={() => this.onBackHandle()}
                >
                    <i 
                        styleName="backicon" 
                        bgimg-center="100"
                    />
                    <span styleName="backtext">嘀哩扭蛋会员</span>
                </div>

                <div 
                    styleName="content"
                    bgimg-center="100"
                    flex-center="all-center"
                >
                    1
                </div>

                {this.renderLevels()}
                
                {this.renderRules()}
            </div>
        );
    }

    private renderLevels = (): JSX.Element => {
        const data = [0, 1, 2, 3, 4, 5, 6];
        return (
            <div styleName="levels">
                {data.map(item => (
                    <div 
                        key={item}
                        styleName="level"
                    >
                        <i styleName="icon" bgimg-center="100"/>
                        <span styleName="reword">暂无奖励</span>
                    </div>
                ))}
            </div>
        );
    }

    private renderRules = (): JSX.Element => {
        return (
            <div 
                styleName="rules"
                flex-cener="all-center"
            >
                <i bgimg-center="100" styleName="ruleicon"/>
                <span font-s="30" styleName="ruletext">renderRules</span>
                <span font-s="30" styleName="ruletext">renderRules</span>
                <span font-s="30" styleName="ruletext">renderRules</span>
                
            </div>
        );
    }
}

const VipHoc = CSSModules(Vip, styles);

export default VipHoc;