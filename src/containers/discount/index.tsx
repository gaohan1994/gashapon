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
                bgimg-center="100"
            >
                <Login/>
                <Registe/>
                <div 
                    style={{
                        width: '200px',
                        height: '200px',
                        backgroundImage: `url(http://${config.host.pic}/${getDiscountData.image})`
                    }}
                />
                <div onClick={() => this.doHelpDiscoutHandle()}>
                    click me discount
                </div>
            </div>
        );
    }
}

const DiscountHoc = CSSModules(Discount, styles);

export const mapStateToProps = (state: Stores) => ({
    getDiscountData : getDiscountData(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<DiscountActions | StatusActions>) => ({
    loadDiscountData: bindActionCreators(loadDiscountData, dispatch),
    showLogin       : bindActionCreators(showLogin, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DiscountHoc);