import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import config from '../../config/index';
import { 
    DiscountActions,
    loadDiscountData,
    LoadDiscountDataParam,
} from '../../actions/discount';
import { 
    StatusActions,
    showLogin,
} from '../../actions/status';
import { 
    getDiscountData,
} from '../../reducers/discount';
import {
    DiscountDataType,
} from '../../types/componentTypes';
import DiscountClass,
{
    HelpDiscountMethodReturn
} from '../../classes/discount';
import User from '../../classes/user';
import Registe from '../sign/registe';
import Login from '../sign/login';

interface Props {
    match: {
        params: {
            id: string;
        }
    };
    loadDiscountData: ({}: LoadDiscountDataParam) => void;
    getDiscountData : DiscountDataType;
    showLogin       : () => void;
}

interface State {}

/* 5ae3e0bfce432fc877c64b3d */
class Discount extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
    }

    componentDidMount() {
        const { 
            match,
            loadDiscountData,
        } = this.props;

        if (match.params && match.params.id) {

            loadDiscountData({id: match.params.id});
        } else {
            
            window.location.href = 'http://gacha-dev.hy233.tv';
        }
    }

    public doHelpDiscoutHandle = async (): Promise<void> => {
        
        /* userId, discountId, nick, image */
        const { getDiscountData, match, showLogin } = this.props;
        const user = User.getUser();

        if (!user.userId) {

            /* do no sign stuff */
            showLogin();
        } else {

            const result: HelpDiscountMethodReturn = await DiscountClass.helpDiscountMethod({
                userId      : user.userId,
                discountId  : match.params.id,
                nick        : '123',
                image       : getDiscountData.image
            });

            if (result.success === true) {
                
                /* do ok stuff */
                if (result.result) {
                    alert(`成功帮忙砍价${result.result / 100}元 `);
                } else {
                    alert(`成功砍价`);
                }
            } else {
                
                if (result.type === 'PARAM_ERROR') {

                    switch (result.message) {
                        case 'userId':
                            showLogin();
                            return;
                        case 'discountId':
                            return;
                        case 'nick':
                            return;
                        case 'image':
                            return;
                        default: return;
                    }
                } else {
                    alert(result.message ? result.message : '砍价失败~');
                }
            }
        }
    }

    render (): JSX.Element {

        const { getDiscountData } = this.props;
        return (
            <div 
                styleName="container"
            >
                <i 
                    styleName="bgimg"
                    bgimg-center="100"
                />

                <div styleName="content">
                    {/* <Login/>
                    <Registe/> */}
                    <img styleName="logo" alt="嘀哩扭蛋" src="http://net.huanmusic.com/gasha/discount/%E5%A5%BD%E5%8F%8B%E7%A0%8D%E4%BB%B7.png"/>
                    
                    <div styleName="coverbox">
                        <span 
                            styleName="cover" 
                            bgimg-center="bgimg-center"
                            style={{
                                backgroundImage: getDiscountData.image 
                                                ? `url(http://${config.host.pic}/${getDiscountData.image})`
                                                : `url(${config.empty_pic.url})`
                            }}
                        />
                        <span styleName="name">{getDiscountData.title}</span>
                    </div>

                    <div styleName="buttons">
                        <button 
                            styleName="button"
                            bgimg-center="100"
                            style={{backgroundImage: `url(http://net.huanmusic.com/gasha/discount/%E5%B8%AETA%E7%A0%8D%E4%BB%B7.png)`}}
                            onClick={() => this.doHelpDiscoutHandle()}
                        />
                        <button 
                            styleName="button"
                            bgimg-center="100"
                            style={{backgroundImage: `url(http://net.huanmusic.com/gasha/discount/%E6%88%91%E4%B9%9F%E6%83%B3%E8%A6%81.png)`}}
                        />
                    </div>

                    <div 
                        styleName="colorbox"
                    >
                        <span styleName="title">{`---- 砍价详情 ----`}</span>
                        <div styleName="item">
                            <span 
                                styleName="avator"
                                bgimg-center="bgimg-center"
                                style={{
                                    backgroundImage: `url(${config.empty_pic.url})`
                                }}
                            />
                            <span styleName="username" word-overflow="word-overflow">姓名</span>
                            <span styleName="userdiscount">砍掉2元</span>
                            <i styleName="dicounticon" bgimg-center="100"/>
                        </div>
                    </div>
                    
                    <div styleName="colorbox">
                        <span styleName="title">{`---- 活动详情 ----`}</span>
                        <span>1.每位用户注册或登录成功后即可为好友随机砍价；</span>
                        <span>2.随机砍价减免金额仅限本次商品当日内购买有效，若当日内用户最终放弃购买，则砍价金额失效，需重新发起；</span>
                        <span>3.用户完成帮好友砍价后，点击“我也想要”即可发起自己的砍价行为；</span>
                        <span>4.每次砍价最低可砍至0元，需发起更多好友一起助力；</span>
                        <span>5.嘀哩扭蛋保留法律范围内允许的对活动的解释权。</span>
                    </div>
                </div>
            </div>
        );
    }
}

const DiscountHoc = CSSModules(Discount, styles);

export const mapStateToProps = (state: Stores) => ({
    getDiscountData: getDiscountData(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<DiscountActions | StatusActions>) => ({
    loadDiscountData: bindActionCreators(loadDiscountData, dispatch),
    showLogin       : bindActionCreators(showLogin, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DiscountHoc);