import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';
import Header from '../../components/haeder_set';
import AddressItem from '../../components/address_row_item';
import { connect, Dispatch } from 'react-redux';
import { getUserdata } from '../../reducers/home';
import { Userdata, Address as AddressType } from '../../types/user';
import { Stores } from '../../reducers/type';
import { getConfig } from '../../reducers/status';
import { orderAddressConfig } from '../../types/componentTypes';
import User from '../../classes/user';
import { NormalReturnObject } from '../../classes/base';
import { merge } from 'lodash';
import Validator from '../../classes/validate';
import Modal from '../../components/modal';

export interface Props {
    getUserdata : Userdata;
    getConfig   : orderAddressConfig;
}

export interface State {
    showModify  : boolean;
    receiver    : string;
    phone       : string;
    detail_area : string;
    detail_home : string;
    postal_code : string;
    is_default  : boolean;

    showModal   : boolean;
    modalValue  : string;
}

export interface Item {
    title           : string;
    value           : string;
    placeholder     : string;
    onChangeHandle  : (event: any) => void;
}

interface CheckInputReturn {
    success ?: boolean;
    data    ?: {
        receiver    : string;
        phone       : string;
        detail_area : string;
        detail_home : string;
        postal_code : string;
        is_default  ?: boolean;
    };
    message ?: string;
}

class Address extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showModify  : false,
            
            receiver    : '',
            phone       : '',
            detail_area : '',
            detail_home : '',
            postal_code : '',
            is_default  : false,

            showModal   : false,
            modalValue  : ''
        };
    }

    public onClearStateHandle = (): void => {
        this.setState({
            receiver    : '',
            phone       : '',
            detail_area : '',
            detail_home : '',
            postal_code : '',
        });
    }

    public onSetSelectedAddress = (data: AddressType): void => {
        this.setState({
            receiver    : data.receiver,
            phone       : data.phone,
            detail_area : data.detail_area,
            detail_home : data.detail_home,
            postal_code : data.postal_code,
            is_default  : data.status === 1 ? true : false
        });
    }

    public onNameChangeHandle = (event: any): void => {
        this.setState({
            receiver: event.target.value
        });
    }

    public onPhoneChangeHandle = (event: any): void => {
        this.setState({
            phone: event.target.value
        });
    }

    public onAreaChangeHandle = (event: any): void => {
        this.setState({
            detail_area: event.target.value
        });
    }

    public onAddressChangeHandle = (event: any): void => {
        this.setState({
            detail_home: event.target.value
        });
    }

    public onPostcodeChangeHandle = (event: any): void => {
        this.setState({
            postal_code: event.target.value
        });
    }

    public onChangeDefault = (): void => {
        this.setState({
            is_default: !this.state.is_default
        });
    }

    public onShowModifyAddress = (): void => {
        this.setState({
            showModify: true
        });
    }

    public onHideModifyAddress = (): void => {
        this.setState({
            showModify: false
        });
    }

    public onNavHandle = (param: string): void => {
        history.push(`/${param}`);
    }

    public doShowModifyModalHandle = (data: AddressType): void => {

        this.onSetSelectedAddress(data);
        this.onShowModifyAddress();
    }

    public onShowModal = (): void => {
        this.setState({
            showModal: true
        });
    }

    public onHideModal = (): void => {
        this.setState({
            showModal: false
        });
    }

    public checkInput = (): CheckInputReturn => {

        const { receiver, phone, detail_area, detail_home, postal_code, is_default  } = this.state;

        const helper = new Validator();

        helper.add(receiver, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入姓名~',
            elementName: 'receiver'
        }]);

        helper.add(phone, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入电话~',
            elementName: 'phone'
        }]);

        helper.add(phone, [{
            strategy: 'isNumberVali',
            errorMsg: '请输入正确的电话格式~',
            elementName: 'phone'
        }]);

        helper.add(detail_area, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入地区~',
            elementName: 'detail_area'
        }]);

        helper.add(detail_home, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入地址~',
            elementName: 'detail_home'
        }]);

        helper.add(postal_code, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入邮编~',
            elementName: 'postal_code'
        }]);

        const result = helper.start();

        if (result) {
            /* do error stuff */
            return { 
                success: false,
                message: result.errMsg
            };
        } else {
            return {
                success : true,
                data    : merge({}, {receiver, phone, detail_area, detail_home, postal_code, is_default}, {})
            };
        }
    }

    public doSaveModifyAddress = async (): Promise <void> => {

        const data = this.checkInput();

        if (data.success === true && data.data) {
            const result: NormalReturnObject = await User.doChangeAddressMethod({data: data.data});

            if (result.success === true) {
                /* 修改成功，隐藏modal然后清除state */
                this.onClearStateHandle();
                this.onHideModifyAddress();
            } else {
                this.setState({
                    modalValue: result.message ? result.message : '修改地址失败!'
                });
                this.onShowModal();
            }
        } else {
            this.setState({
                modalValue: data.message ? data.message : '请校验输入的数据'
            });
            this.onShowModal();
        }
    }
    
    render (): JSX.Element {
        const { showModal, modalValue } = this.state;
        const { getUserdata }  = this.props;
        return (
            <div
                styleName="container"
                container-with-header="true"
                bg-white="true"
            >
                <Header title="收货地址"/>
                
                <Modal
                    display={showModal}
                    value={modalValue}
                    onConfirmClickHandle={this.onHideModal}
                />

                {getUserdata.address && getUserdata.address.length > 0
                ? getUserdata.address.map((item: AddressType, i: number) => {
                    return (
                        <AddressItem
                            data={item} 
                            key={i}
                            propsClickHandle={this.doShowModifyModalHandle}
                        />
                    );
                })
                : ''}

                {this.renderFooter()}

                {this.renderModifyAddress()}
            </div>
        );
    }

    private renderFooter = (): JSX.Element => {
        return (
            <div 
                styleName="footer"
                bgimg-center="100"
                onClick={() => this.onNavHandle('addaddress')}
            >
                新建收货地址
            </div>
        );
    }

    private renderModifyAddress = (): JSX.Element => {
        const { showModify } = this.state;
        return (
            <div 
                styleName="modify"
                style={{
                    visibility  : showModify === true ? 'visible' : 'hidden',
                    opacity     : showModify === true ? 1 : 0,
                    bottom      : showModify === true ? '0' : '100vh'
                }}
                container-with-header="true"
            >
                <Header
                    title="修改地址"
                    subTitle="保存"
                    propsClick={this.onHideModifyAddress}
                    subPropsClick={() => this.doSaveModifyAddress()}
                />

                {this.renderDetail()}

                {this.renderDefault()}
            </div>
        );
    }

    private renderDetail = (): JSX.Element => {
        const { receiver, phone, detail_area, detail_home, postal_code  } = this.state;
        const data: Item[] = [
            {
                title           : '姓名',
                value           : receiver,
                placeholder     : '最少2个，最多15个字',
                onChangeHandle  : this.onNameChangeHandle
            },
            {
                title           : '电话',
                value           : phone,
                placeholder     : '请输入手机号码',
                onChangeHandle  : this.onPhoneChangeHandle
            },
            {
                title           : '地区',
                value           : detail_area,
                placeholder     : '省份 城市 县区',
                onChangeHandle  : this.onAreaChangeHandle
            },
            {
                title           : '地址',
                value           : detail_home,
                placeholder     : '请填写详细地址，5~60个字',
                onChangeHandle  : this.onAddressChangeHandle
            },
            {
                title           : '邮编',
                value           : postal_code,
                placeholder     : '6位邮政编码',
                onChangeHandle  : this.onPostcodeChangeHandle
            },
        ];

        return (
            <div styleName="box">
                {data.map((item: Item, i) => {
                    return this.renderItem(item);
                })}
            </div>
        );
    }

    private renderItem = (data: Item): JSX.Element => {
        return (
            <div 
                key={data.title}
                styleName="item"
                flex-center="all-center"
            >
                <span styleName="title">{data.title}</span>
                <input 
                    styleName="input"
                    type="text"
                    value={data.value}
                    onChange={data.onChangeHandle}
                    placeholder={data.placeholder}
                />
            </div>
        );
    }

    private renderDefault = (): JSX.Element => {
        const { is_default } = this.state;
        return (
            <div 
                styleName="default"
                onClick={() => this.onChangeDefault()}
            >
                <span 
                    styleName="icon"
                    style={{background: is_default === true ? '#f27a7a' : '#ffffff'}}
                />
                <span styleName="defaultText">设置成默认收货地址</span>
            </div>
        );
    }
}

const AddressHoc = CSSModules(Address, styles);

export const mapStateToProps = (state: Stores) => ({
    getUserdata : getUserdata(state),
    getConfig   : getConfig(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddressHoc);