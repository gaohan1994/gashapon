import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../../components/haeder_set';
import Modal from '../../../components/modal';
import Button from '../../../components/button';
import Sign from '../../../classes/sign';
import Validator from '../../../classes/validate';
import history from '../../../history';
import User from '../../../classes/user';

interface Props {

}

interface State {
    nick        : string;
    showModal   : boolean;
    errorModal  : boolean;
    modalValue  : string;
}

class ChangeName extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            nick        : '',
            showModal   : false,
            errorModal  : false,
            modalValue  : ''
        };
    }

    public onChangeNickHandle = (e: any) => {
        this.setState({
            nick: e.target.value
        });
    }

    public onShowModal = (): void => {
        this.setState({
            errorModal: true
        });
    }

    public onHideModal = (): void => {
        this.setState({
            errorModal: false
        });
    }

    public doChangeNameHandle = async (): Promise<void> => {
        const helper = new Validator();

        helper.add(this.state.nick, [{
            strategy: 'isNonEmpty',
            errorMsg: '昵称不能为空~',
            elementName: 'nick',
        }]);

        let errorMsg = helper.start();

        if (errorMsg) {
            this.setState({
                modalValue: errorMsg.errMsg
            });
            this.onShowModal();
        } else {
            const user = User.getUser();
            if (!user.uid) {
                history.push('/my');
            } else {
                const result = await Sign.doChangeUserdata({
                    uid : user.uid, 
                    name: this.state.nick
                });

                if (result.success === true) {
                    console.log('修改成功');
                    this.setState({
                        showModal: true
                    });
                } else {
                    this.setState({
                        modalValue: result.message ? result.message : '修改失败'
                    });
                    this.onShowModal();
                }
            }
        }
    }

    public onCancelClickHandle = (): void => {
        this.setState({
            showModal: false
        });
        history.push('/my');
    }

    public onConfirmClickHandle = (): void => {
        this.setState({
            showModal: false
        });
        history.push('/my');
    }

    render () {
        const { nick, showModal } = this.state;
        return (
            <div 
                styleName="container"
                container-with-header="true"
                bg-white="true"
            >
                {this.renderErrorModal()}
                <Header title="修改昵称"/>
                <Modal 
                    display={showModal}
                    value="修改成功"
                    onCancelClickHandle={this.onCancelClickHandle}
                    onConfirmClickHandle={this.onConfirmClickHandle}
                />
                <div styleName="box">
                    <div styleName="border">
                        <span>昵称</span>
                        <input 
                            styleName="phone"
                            value={nick}
                            onChange={this.onChangeNickHandle}
                            placeholder="请输入昵称~"
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
                        clickHandle={() => this.doChangeNameHandle()}
                    />
                </div>
            </div>
        );
    }

    private renderErrorModal = (): JSX.Element => {
        const { errorModal, modalValue } = this.state;
        return (
            <Modal
                display={errorModal}
                value={modalValue}
                onConfirmClickHandle={this.onHideModal}
            />
        );
    }
}

const ChangeNameHoc = CSSModules(ChangeName, styles);

export default ChangeNameHoc;