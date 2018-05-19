import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';
import config from '../../config/index';
import { connect, Dispatch } from 'react-redux';
import { getUserdata } from '../../reducers/home';
import { Stores } from '../../reducers/type';
import { Userdata } from '../../types/user';

interface Props {
    getUserdata: Userdata;
}

class Vip extends React.Component <Props, {}> {

    public onBackHandle = (): void => {
        history.goBack();
    }

    render (): JSX.Element {

        const { getUserdata } = this.props;

        console.log('getUserdata', getUserdata);
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
                    <div 
                        styleName="cover"
                        bgimg-center="bgimg-center"
                        style={{backgroundImage: `url(${config.empty_pic.url})`}}
                    />
                    <span 
                        styleName="name" 
                        font-s="30"
                        word-overflow="word-overflow"
                    >
                        {getUserdata.name}
                    </span>
                    
                    <div 
                        styleName="exp"
                    >
                        <i 
                            styleName="vipIcon"
                            style={{backgroundImage: `url(http://net.huanmusic.com/gasha/vip/v0.png)`}}
                        />
                        <span styleName="progress">
                            0 / 10
                        </span>
                    </div>
                </div>
                {this.renderLevels()}
                {this.renderRules()}
            </div>
        );
    }

    private renderLevels = (): JSX.Element => {
        const data = [
        {
            experience: 100,
        },
        {
            experience: 500,
            discounts: [{
                condition:   2000,
                price:       300,
                count:       1
            }]
        },
        {
            experience: 1000,
            discounts: [{
                condition:   2000,
                price:       300,
                count:       3
            },
            {
                condition:   3000,
                price:       500,
                count:       1
            }]
        },
        {
            experience: 2000,
            discounts: [{
                condition:   2000,
                price:       300,
                count:       5
            },
            {
                condition:   3000,
                price:       300,
                count:       1
            }]
        },
        {
            experience: 5000,
            discounts: [{
                condition:   2000,
                price:       300,
                count:       5
            },
            {
                condition:   3000,
                price:       500,
                count:       5
            },
            {
                condition:   5000,
                price:       800,
                count:       3
            }]
        },
        {
            experience: 10000,
            discounts: [{
                condition:   2000,
                price:       300,
                count:       10
            },
            {
                condition:   3000,
                price:       500,
                count:       10
            },
            {
                condition:   5000,
                price:       800,
                count:       5
            },
            {
                condition:   10000,
                price:       2000,
                count:       1
            }]
        },
        {
            experience: 30000,
            discounts: [{
                condition:   2000,
                price:       300,
                count:       15
            },
            {
                condition:   3000,
                price:       500,
                count:       15
            },
            {
                condition:   5000,
                price:       800,
                count:       10
            },
            {
                condition:   10000,
                price:       2000,
                count:       5
            }]
        },
        {
            experience: 50000,
            discounts: [{
                condition:   2000,
                price:       300,
                count:       20
            },
            {
                condition:   3000,
                price:       500,
                count:       20
            },
            {
                condition:   5000,
                price:       800,
                count:       15
            },
            {
                condition:   10000,
                price:       2000,
                count:       10
            }]
        }];
        return (
            <div styleName="levels">
                {data.map((item, i) => (
                    <div 
                        key={i}
                        styleName="level"
                    >
                        <i styleName="icon" bgimg-center="100"/>
                        <span styleName="reword">暂无奖励</span>
                        {item.discounts && item.discounts.length > 0
                        ? item.discounts.map((text, j) => {
                            return (
                                <span key={j} styleName="reword">
                                    满{text.condition / 100}减{text.price / 100}
                                </span>
                            );
                        })
                        : <span styleName="reword">暂无奖励</span>}
                    </div>
                ))}
            </div>
        );
    }

    private renderRules = (): JSX.Element => {
        return (
            <div 
                styleName="rules"
                flex-center="all-center"
            >
                <i bgimg-center="100" styleName="ruleicon"/>
                <span font-s="30" styleName="ruletext">1.使用余额消费获得经验值；</span>
                <span font-s="30" styleName="ruletext">2.消费1元获得1经验值；</span>
                <span font-s="30" styleName="ruletext">3.余额抵扣运费不获得经验值。</span>
            </div>
        );
    }
}

const VipHoc = CSSModules(Vip, styles);

export const mapStateToProps = (state: Stores) => ({
    getUserdata: getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(VipHoc);