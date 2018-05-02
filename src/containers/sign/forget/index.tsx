import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../../components/haeder_set';
import Button from '../../../components/button';

export interface Props {
    
}

export interface State {
    phone   : string;
    vercode : string;
}

class Forget extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            phone   : '',
            vercode : ''
        };
    }

    public onChangePhoneHandle = (e: any): void => {
        this.setState({
            phone: e.target.value
        });
    }

    public onChangeVercodeHandle = (e: any): void => {
        this.setState({
            vercode: e.target.value
        });
    }

    render() {

        const { phone, vercode } = this.state;

        return (
            <div 
                styleName="container"
                container-with-header="true"
            >
                <Header title="忘记密码"/>

                <div styleName="box">
                    <div styleName="border">
                        <span>手机号</span>
                        <input 
                            styleName="phone"
                            value={phone}
                            onChange={this.onChangePhoneHandle}
                            placeholder="请输入手机号码"
                        />
                    </div>
                    <div styleName="border">
                        <span>验证码 </span>
                        <input 
                            styleName="vercode"
                            value={vercode}
                            onChange={this.onChangeVercodeHandle}
                            placeholder="请输入验证码"
                        />
                        <Button 
                            btnText="发送验证码"
                            btnSize="small"
                            btnRadius={true}
                        />
                    </div>
                </div>

                <div 
                    styleName="btnBox"
                    flex-center="all-center"
                >
                    <Button 
                        btnText="确认"
                        btnSize="big"
                        btnRadius={true}
                    />
                </div>
            </div>
        );
    }
}

const ForgetHoc = CSSModules(Forget, styles);

export default ForgetHoc;