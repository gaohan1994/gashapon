import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../../components/haeder_set';
import Modal from '../../../components/modal';
import Sign from '../../../classes/sign';
import Validator from '../../../classes/validate';
import history from '../../../history';

interface Props {

}

interface State {
    value       : string;
    showModal   : boolean;
}

class ChangeName extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            value       : '',
            showModal   : false,
        };
    }

    public onChangeHandle = (e: any) => {
        this.setState({
            value: e.target.value
        });
    }

    public doChangeNameHandle = async (): Promise<void> => {
        const helper = new Validator();

        helper.add(this.state.value, [{
            strategy: 'isNonEmpty',
            errorMsg: '昵称不能为空~',
            elementName: 'name',
        }]);

        let errorMsg = helper.start();

        if (errorMsg) {
            alert(errorMsg.errMsg);
        } else {
            const result = await Sign.doChangeUserdata({name: this.state.value});
            if (result.success === true) {
                console.log('修改成功');
                this.setState({
                    showModal: true
                });
            } else {
                /* do error stuff */
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
        const { value, showModal } = this.state;
        return (
            <div
                styleName="container"
                container-with-header="true"
            >
                <Modal 
                    display={showModal}
                    value="修改成功"
                    onCancelClickHandle={this.onCancelClickHandle}
                    onConfirmClickHandle={this.onConfirmClickHandle}
                />
                <Header 
                    title="修改昵称"
                />

                <input
                    value={value}
                    onChange={this.onChangeHandle}
                />

                <button onClick={() => this.doChangeNameHandle()}>保存</button>
            </div>
        );
    }
}

const ChangeNameHoc = CSSModules(ChangeName, styles);

export default ChangeNameHoc;