import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/haeder_set';
import Button from '../../components/button';
import Validator from '../../classes/validate';
import Business from '../../classes/business';
import User from '../../classes/user';

interface Props {}

interface State {
    value?: number;
}

class Pay extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {};
    }

    public onClickHandle = async (): Promise<void> => {
        const { value } = this.state;

        if (!value) {
            alert('请输入整数金额~');
        } else {
            const helper = new Validator();

            helper.add(value, [{
                strategy: 'isNumberVali',
                errorMsg: '请输入整数金额~',
                elementName: 'value'
            }]);
            
            const result = helper.start();
    
            if (result) {
                alert(result.errMsg);
            } else {
                const u = new User({_id: '5ac1f31087e83ef4915abc02', name: 'Ghan', headimg: 'img'});
                const user = u.getGashaponUser();
                const recharge = await Business.doRechargeMethod(user, value);
                if (recharge.success === true) {
                    console.log('ok do stuff');
                } else {
                    console.log(`${recharge.type}--${recharge.message}`);
                }
            }
        }
    }

    render() {
        return (
            <div styleName="container">
                <Header title="充值"/>
                <div styleName="content">
                    <span styleName="record"/>
                    <i styleName="icon"/>
                    <span styleName="moneySpan">剩余金额</span>
                    <span styleName="money">￥0.00</span>
                    <div styleName="topup">
                        <span>充值金额￥</span>
                        {this.renderInput()}
                    </div>
                    <div styleName="buttonBox">
                        <Button 
                            btnText="充值"
                            btnSize="big"
                            clickHandle={() => this.onClickHandle()}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private renderInput = (): JSX.Element => {
        const { value } = this.state;
        return (
            <input
                styleName="moneyInput"
                placeholder="请您输入充值金额"
                value={value ? value : ''}
                onChange={this.onChangeHandle}
            />
        );
    }

    private onChangeHandle = (e: any): void => {
        this.setState({
            value: e.target.value
        });
    }
}

const PayHoc = CSSModules(Pay, styles);

export default PayHoc;