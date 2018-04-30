import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import * as Numeral from 'numeral';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BusinessActions } from '../../actions/business';
import { Stores } from '../../reducers/type';
import { getUserdata } from '../../reducers/home';
import { Userdata } from '../../types/user';
import history from '../../history';

import Header from '../../components/haeder_set';
import Button from '../../components/button';
import Validator from '../../classes/validate';
import Business from '../../classes/business';
import User from '../../classes/user';
import config from '../../config';

interface Props {
    getUserdata: Userdata;
}

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
        const { getUserdata } = this.props;

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

                User.setUser({
                    userId  : getUserdata._id, 
                    name    : getUserdata.name, 
                    headimg : config.empty_pic.url
                });
                const user = User.getUser();
                
                const recharge = await Business.doRechargeMethod(user, value);
                if (recharge.success === true) {
                    history.push('/');
                } else {
                    console.log(`${recharge.type}--${recharge.message}`);
                    alert(recharge.message);
                }
            }
        }
    }

    render() {
        const { getUserdata } = this.props;
        return (
            <div styleName="container">
                <Header title="充值"/>
                <div styleName="content">
                    <span styleName="record">消费记录 ></span>
                    <i 
                        bgimg-center="bgimg-center"
                        styleName="icon"
                        style={{
                            backgroundImage: `url(${config.empty_pic.url})`
                        }}
                    />
                    <span styleName="moneySpan">剩余金额</span>
                    <span styleName="money">
                        ￥{getUserdata && getUserdata.remain
                            ? Numeral(getUserdata.remain / 100).format('0.00')
                            : '0.00'}
                    </span>
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
                    <span styleName="tips">*账户余额不能提现</span>
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

const mapStateToProps = (state: Stores) => ({
    getUserdata: getUserdata(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>) => ({

});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PayHoc);