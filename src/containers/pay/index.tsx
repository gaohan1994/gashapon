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
                
                <div styleName="detail">
                    <div styleName="line">
                        <i styleName="lineIcon"/>
                        <span styleName="lineText">充值至嘀哩扭蛋余额</span>
                    </div>
                </div>
                
                <div 
                    styleName="content"
                >
                    <div styleName="contentItem">
                        <span styleName="rechargeTitle">充值金额</span>
                    </div>
                    <div styleName="contentItem">{this.renderInput()}</div>
                    <div styleName="contentItem">
                        <span styleName="remain">
                        当前剩余余额{getUserdata && getUserdata.remain
                            ? Numeral(getUserdata.remain / 100).format('0.00')
                            : '0.00'}元
                        </span>
                    </div>
                </div>

                <div 
                    styleName="buttonBox"
                    flex-center="all-center"
                >
                    <Button 
                        btnText="充值"
                        btnSize="normal"
                        btnRadius={true}
                        clickHandle={() => this.onClickHandle()}
                    />
                </div>
            </div>
        );
    }

    private renderInput = (): JSX.Element => {
        const { value } = this.state;
        return (
            <input
                styleName="moneyInput"
                placeholder="￥"
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