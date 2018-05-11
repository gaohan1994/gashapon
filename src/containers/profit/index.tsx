import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import * as Numeral from 'numeral';
import history from '../../history';

interface Props {
    
}

class Profit extends React.Component <Props, {}> {

    public onBackHandle = (): void => {
        history.goBack();
    }

    public onNavHandle = (param: string): void => {
        history.push(`/${param}`);
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
                    <span styleName="backtext">我的收益</span>
                </div>
                <div 
                    styleName="money"
                    flex-center="all-center"
                    bgimg-center="100"
                >   
                    <span font-s="24" styleName="moneytext">收益金额</span>
                    <span styleName="value">￥{Numeral(300).format('0.00')}</span>
                </div>
                <div styleName="set">
                    <div 
                        styleName="setItem"
                        onClick={() => this.onNavHandle('payinfo')}
                    >
                        <i
                            styleName="setIcon"
                            bgimg-center="100"
                            style={{backgroundImage: 'url(http://net.huanmusic.com/gasha/%E4%BD%99%E9%A2%9D.png)'}}
                        />
                        <span styleName="setText">收支明细</span>
                    </div>

                </div>
            </div>
        );
    }
}

const ProfitHoc = CSSModules(Profit, styles);

export default ProfitHoc;