import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../../components/haeder_set';
import { merge } from 'lodash';
import User from '../../../classes/user';
import Validator from '../../../classes/validate';
import history from '../../../history';
import { connect } from 'react-redux';
import { 
    Dispatch, 
    bindActionCreators 
} from 'redux';
import { Stores } from '../../../reducers/type';
import { 
    StatusActions,
    setOrderAddressConfig,
} from '../../../actions/status';
import { getConfig } from '../../../reducers/status';
import { 
    HomeActions,
    loadProvinces,
    loadCities,
    loadAreas
} from '../../../actions/home';
import { 
    getProvinces,
    getCities,
    getAreas
} from '../../../reducers/home';
import { orderAddressConfig } from '../../../types/componentTypes';
import Modal from '../../../components/modal';

export interface Province {
    name?: string;
    code?: string;
}

export interface City {
    code?: string;
    name?: string;
    provinceCode?: string;
}

export interface Area {
    code?: string;
    name?: string;
    provinceCode?: string;
    cityCode?: string;
}

export interface Area {
    code?: string;
}

export interface Props {
    getConfig               : orderAddressConfig;
    setOrderAddressConfig   : (config: orderAddressConfig) => void;
    loadProvinces           : () => void;
    loadCities              : () => void;
    loadAreas               : () => void;
    getProvinces            : Province[];
    getCities               : City[];
    getAreas                : Province[];
}

export interface State {
    receiver        : string;
    phone           : string;
    detail_area     : string;
    detail_home     : string;
    postal_code     : string;
    is_default      : boolean;
    showModal       : boolean;
    modalValue      : string;
    showChoiceModal : boolean;

    modalType       : string;
    province        : Province;
    city            : City;
    area            : Area;
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

class AddAddress extends React.Component <Props, State> {
    
    constructor (props: Props) {
        super(props);
        this.state = {
            receiver        : '',
            phone           : '',
            detail_area     : '',
            detail_home     : '',
            postal_code     : '',
            is_default      : false,
            showModal       : false,
            modalValue      : '',
            showChoiceModal : false,

            modalType       : '',
            province        : {},
            city            : {},
            area            : {},
        };

        this.onAddressChangeHandle = this.onAddressChangeHandle.bind(this);
        this.onAreaChangeHandle = this.onAreaChangeHandle.bind(this);
        this.onChangeDefault = this.onChangeDefault.bind(this);
        this.onHideChoiceModal = this.onHideChoiceModal.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.onNameChangeHandle = this.onNameChangeHandle.bind(this);
        this.onPhoneChangeHandle = this.onPhoneChangeHandle.bind(this);
        this.onPostcodeChangeHandle = this.onPostcodeChangeHandle.bind(this);
        this.onShowChoiceModal = this.onShowChoiceModal.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.checkInput = this.checkInput.bind(this);
        this.doSaveAddressHandle = this.doSaveAddressHandle.bind(this);
        this.renderChangeAddressModal = this.renderChangeAddressModal.bind(this);
        this.renderDefault = this.renderDefault.bind(this);
        this.renderDetail = this.renderDetail.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentWillMount (): void {
        const { loadProvinces, loadAreas, loadCities } = this.props;
        loadProvinces();
        loadAreas();
        loadCities();
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

    public onShowChoiceModal = (): void => {
        this.setState({
            showChoiceModal : true,
            modalType       : 'province',
            province        : {},
            city            : {},
            area            : {}
        });
    }

    public onCancelChoiceModal = (): void => {
        this.setState({
            showChoiceModal: false,
            modalType: '',
            province: {},
            city: {},
            area: {}
        });
    }

    public onHideChoiceModal = (): void => {
        this.setState({
            showChoiceModal: false
        });
    }

    public checkInput = (): CheckInputReturn => {

        const { receiver, phone, detail_area, detail_home, postal_code, is_default  } = this.state;

        const helper = new Validator();

        helper.add(receiver, [{
            strategy    : 'isNonEmpty',
            errorMsg    : '请输入姓名~',
            elementName : 'receiver'
        }]);

        helper.add(phone, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入电话~',
            elementName: 'phone'
        }]);

        helper.add(phone, [{
            strategy    : 'isNumberVali',
            errorMsg    : '请输入正确的电话格式~',
            elementName : 'phone'
        }]);

        helper.add(detail_area, [{
            strategy: 'isNonEmpty',
            errorMsg: '请输入地区~',
            elementName: 'detail_area'
        }]);

        helper.add(detail_home, [{
            strategy    : 'isNonEmpty',
            errorMsg    : '请输入地址~',
            elementName : 'detail_home'
        }]);

        helper.add(postal_code, [{
            strategy    : 'isNonEmpty',
            errorMsg    : '请输入邮编~',
            elementName : 'postal_code'
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
                data    : merge({}, { receiver, phone, detail_area, detail_home, postal_code, is_default }, {})
            };
        }
    }

    public doSaveAddressHandle = async (): Promise<void> => {

        const { 
            getConfig, 
            setOrderAddressConfig 
        } = this.props;

        const data = this.checkInput();

        if (data.success === true && data.data) {

            /* loading 动画 */
            const result = await User.doAddAddressMethod({data: data.data});
            
            if (result.success === true) {

                /*
                 * 如果有config的path 走config的path 之后置空
                 * 如果没有config的path 正常走
                 */
                if (!getConfig.path) {

                    history.push('/my');
                } else {

                    const path = getConfig.path;
                    const config: orderAddressConfig = {};
                    setOrderAddressConfig(config);
                    history.push(`/${path}`);
                }
            } else {

                /* do error stuff */
                this.setState({
                    modalValue: result.message ? result.message : '添加地址出错'
                });
                this.onShowModal();
                history.push('/my');
            }
        } else {

            /* do error stuff */
            this.setState({
                modalValue: data.message ? data.message : '请检查输入正确性'
            });
            this.onShowModal();
        }
    }

    public onSaveProvince = (param: Province): void => {
        this.setState({
            province: param
        });
    }

    public onSaveCity = (param: City): void => {
        this.setState({
            city: param
        });
    }

    public onSaveArea = (param: Area): void => {
        this.setState({
            area: param
        });
    }

    public changeModalType = (param: string): void => {
        this.setState({
            modalType: param
        });
    }

    /**
     * 保存Province
     * 修改ModalType = city
     * @memberof AddAddress
     */
    public onProvinceClickHandle = (item: Province): void => {

        this.onSaveProvince(item);
        this.changeModalType('city');
    }

    /**
     * 保存Province
     * 修改ModalType = area
     * @memberof AddAddress
     */
    public onCityClickHandle = (item: City): void => {

        this.onSaveCity(item);
        this.changeModalType('area');
    }

    /**
     * 保存Province
     * 关闭modal
     * @memberof AddAddress
     */
    public onAreaClickHandle = (item: Area): void => {

        this.onSaveArea(item);
        this.onHideChoiceModal();
    }

    render (): React.ReactNode {

        const { 
            showModal, 
            modalValue 
        } = this.state;
        return (
            <div
                styleName="container"
                container-with-header="true"
            >
                <Header
                    title="收货地址"
                    subTitle="保存"
                    subPropsClick={() => this.doSaveAddressHandle()}
                />
                <Modal
                    display={showModal}
                    value={modalValue}
                    onConfirmClickHandle={this.onHideModal}
                />

                {this.renderDetail()}
                {this.renderDefault()}
                {this.renderChangeAddressModal()}
            </div>
        );
    }

    private renderChangeAddressModal = (): JSX.Element => {

        const { 
            showChoiceModal, 
            modalType,
            province,
            city,
        } = this.state;

        const {
            getProvinces,
            getCities,
            getAreas
        } = this.props;

        return (
            <div
                styleName="choiceAddress"
                style={{
                    visibility  : showChoiceModal === true ? 'visible' : 'hidden',
                    opacity     : showChoiceModal === true ? 1 : 0
                }}
            >
                <Header 
                    title="选择地区"
                    propsClick={this.onCancelChoiceModal}
                />

                {modalType === 'province'
                ? <div styleName="choinceContent">
                    {getProvinces.map((item: Province) => {
                        return (
                            <div 
                                styleName="addItem" 
                                key={item.code}
                                onClick={() => this.onProvinceClickHandle(item)}
                            >
                                {item.name}
                            </div>
                        );
                    })}
                    <div 
                        styleName="addItem"
                    >
                        海外其他
                    </div>
                </div>
                : ''}

                {modalType === 'city'
                ? <div styleName="choinceContent">
                    {getCities.map((item: City) => {
                        if (item.provinceCode === province.code) {
                            return (
                                <div
                                    styleName="addItem" 
                                    key={item.code}
                                    onClick={() => this.onCityClickHandle(item)}
                                >
                                    {item.name}
                                </div>
                            );
                        } else {
                            return '';
                        }
                    })}
                </div>
                : ''}

                {modalType === 'area'
                ? <div styleName="choinceContent">
                    {getAreas.map((item: Area) => {
                        if (
                            item.provinceCode === province.code
                            && item.cityCode === city.code
                        ) {
                            return (
                                <div 
                                    styleName="addItem" 
                                    key={item.code}
                                    onClick={() => this.onAreaClickHandle(item)}
                                >
                                    {item.name}
                                </div>
                            );
                        } else {
                            return '';
                        }
                    })}
                </div>
                : ''}
            </div>
        );
    }

    private renderChoiceLine = (): JSX.Element => {
        console.log('renderChoiceLine', this.renderChoiceLine);
        return (
            <div>
                choice
            </div>
        );
    }

    private renderDetail = (): JSX.Element => {

        const { 
            receiver, 
            phone, 
            detail_area, 
            detail_home, 
            postal_code,
            province,
            city,
            area
        } = this.state;

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
            }
        ];

        return (
            <div styleName="box">
                {data.map((item: Item, i) => {
                    return this.renderItem(item);
                })}
                <div
                    styleName="item"
                    flex-center="all-center"
                >
                    <span styleName="title">地区</span>
                    <span 
                        styleName="input"
                        onClick={this.onShowChoiceModal}
                    >
                        {`${province.name ? province.name : ''}  ${city.name ? city.name : ''}  ${area.name ? area.name : ''}`}
                    </span>
                </div>
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

const AddAddressHoc = CSSModules(AddAddress, styles);

export const mapStateToProps = (state: Stores) => ({
    getConfig   : getConfig(state),
    getProvinces: getProvinces(state),
    getCities   : getCities(state),
    getAreas    : getAreas(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<StatusActions | HomeActions>, state: Stores) => ({
    setOrderAddressConfig   : bindActionCreators(setOrderAddressConfig, dispatch),
    loadProvinces           : bindActionCreators(loadProvinces, dispatch),
    loadCities              : bindActionCreators(loadCities, dispatch),
    loadAreas               : bindActionCreators(loadAreas, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddAddressHoc);