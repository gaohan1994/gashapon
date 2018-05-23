import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { Userdata } from '../../types/user';
import config from '../../config';
import {
    StatusActions,
    hidePhone
} from '../../actions/status';
import {
    getPhoneStatus
} from '../../reducers/status';
import {
    getUserdata
} from '../../reducers/home';
import history from '../../history';

export interface HotSearchWord {
    status  : number;
    content : string;
}

interface RenderParam {
    title       ?: string;
    clickHandle ?: () => void;
}

interface Props {
    display     ?: boolean;
    hidePhone   ?: () => void;
    getUserdata ?: Userdata;
}

interface State {
    phone       : string;
    vercode     : string;
    showResult  : boolean;
    showVercode : boolean;
}

class Phone extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            phone       : '',
            vercode     : '',
            showResult  : false,
            showVercode : false,
        };
    }

    public secondStep = () => {
        this.setState({
            showVercode: true
        });
    }

    public thirdStep = () => {
        this.setState({
            showResult: true
        });
    }

    public doNavHome = () => {
        this.setState({
            showVercode: false,
            showResult: false
        });
        history.push('/');
    }

    public hideVercode = () => {
        this.setState({
            showVercode: false
        });
    }

    public hideResult = () => {
        this.setState({
            showResult: false
        });
    }

    public hidePhone = () => {
        const { hidePhone } = this.props;
        this.setState({
            showVercode: false,
            showResult: false,
        });
        if (hidePhone) {
            hidePhone();
        }
    }

    public onPhoneChangeHandle = (e: any) => {
        this.setState({
            phone: e.target.value
        });
    }

    public onCodeChangeHandle = (e: any) => {
        this.setState({
            vercode: e.target.value
        });
    }

    render() {
        const { phone } = this.state;
        const { display, getUserdata } = this.props;
        console.log('display', display);
        return (
            <div 
                styleName={display === true ? 'show' : 'hide'}
                style={{bottom: display === true ? '0' : '-100vh'}}
            >   
                {this.renderHeader({clickHandle: this.hidePhone})}

                <span styleName="desc">当前手机号：{getUserdata && getUserdata.phone ? getUserdata.phone : '无'}</span>
                <div styleName="input">
                    <span styleName="area">+86</span>
                    <input 
                        styleName="phone"
                        value={phone}
                        onChange={this.onPhoneChangeHandle}
                    />
                </div>

                {this.renderVercode()}
                {this.renderResult()}

                {this.renderFooter({clickHandle: this.secondStep})}
            </div>
        );
    }

    private renderHeader = ({title, clickHandle}: RenderParam): JSX.Element => {
        return (
            <div styleName="header">
                <i 
                    styleName="icon"
                    style={{
                        backgroundImage: 'url(//net.huanmusic.com/gasha/gacha-icon.png)',
                        backgroundPosition: '-119px -28px',
                        backgroundSize: '146.5px auto',
                        width: '21px',
                        height: '21px',
                    }}
                    onClick={clickHandle}
                />
                <span 
                    styleName="text"
                    onClick={clickHandle}
                >
                    {title ? title : '绑定手机号'}
                </span>
            </div>
        );
    }

    private renderFooter = ({title, clickHandle}: RenderParam): JSX.Element => {
        return (
            <div 
                styleName="footer" 
                onClick={clickHandle}
            >
                {title ? title : '下一步'}
            </div>
        );
    }

    private renderVercode = (): JSX.Element => {
        const { showVercode, vercode, phone } = this.state;
        return (
            <div
                styleName={showVercode === true ? 'show' : 'hide'}
                style={{bottom: showVercode === true ? '0' : '-100vh'}}
            >
                {this.renderHeader({title: '填写验证码', clickHandle: this.hideVercode})}
                <span styleName="desc">请填写手机号{phone}收到的短信验证码</span>
                <div styleName="input">
                    <span styleName="area">验证码</span>
                    <input 
                        styleName="phone"
                        value={vercode}
                        onChange={this.onCodeChangeHandle}
                    />
                </div>
                {this.renderFooter({clickHandle: this.thirdStep})}
            </div>
        );
    }

    private renderResult = (): JSX.Element => {
        const { showResult, phone } = this.state;
        return (
            <div
                styleName={showResult === true ? 'show' : 'hide'}
                style={{bottom: showResult === true ? '0' : '-100vh'}}
            >
                {this.renderHeader({title: '验证成功', clickHandle: this.hideResult})}

                <div 
                    styleName="result"
                    flex-center="all-center"
                >
                    <i 
                        styleName="resultImg"
                        bgimg-center="100"
                        style={{backgroundImage: `url(${config.empty_pic.url})`}}
                    />
                    <span styleName="resultStatus">绑定成功：{phone}</span>
                </div>

                {this.renderFooter({title: '完成', clickHandle: this.doNavHome})}
            </div>
        );
    }
}

const PhoneHoc = CSSModules(Phone, styles);

const mapStateToProps = (state: Stores) => ({
    display: getPhoneStatus(state),
    getUserdata: getUserdata(state),
});

const mapDispatchToProps = (dispatch: Dispatch<StatusActions>) => ({
    hidePhone: bindActionCreators(hidePhone, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PhoneHoc);