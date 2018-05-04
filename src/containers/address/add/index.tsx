import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../../components/haeder_set';

export interface Props {
    
}

export interface State {
    name        : string;
    phone       : string;
    area        : string;
    address     : string;
    postcode    : string;

    setDefault  : boolean;
}

export interface Item {
    title           : string;
    value           : string;
    placeholder     : string;
    onChangeHandle  : (event: any) => void;
}

class AddAddress extends React.Component <Props, State> {
    
    constructor (props: Props) {
        super(props);
        this.state = {
            name        : '',
            phone       : '',
            area        : '',
            address     : '',
            postcode    : '',
            
            setDefault  : false,
        };
    }

    public onNameChangeHandle = (event: any): void => {
        this.setState({
            name: event.target.value
        });
    }

    public onPhoneChangeHandle = (event: any): void => {
        this.setState({
            phone: event.target.value
        });
    }

    public onAreaChangeHandle = (event: any): void => {
        this.setState({
            area: event.target.value
        });
    }

    public onAddressChangeHandle = (event: any): void => {
        this.setState({
            address: event.target.value
        });
    }

    public onPostcodeChangeHandle = (event: any): void => {
        this.setState({
            postcode: event.target.value
        });
    }

    public onChangeDefault = (): void => {
        this.setState({
            setDefault: !this.state.setDefault
        });
    }

    public doSaveAddressHandle = async (): Promise<void> => {
        //
    }

    render (): JSX.Element {
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

                {this.renderDetail()}
                {this.renderDefault()}
            </div>
        );
    }

    private renderDetail = (): JSX.Element => {
        const { name, phone, area, address, postcode  } = this.state;
        const data: Item[] = [
            {
                title           : '姓名',
                value           : name,
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
                value           : area,
                placeholder     : '省份 城市 县区',
                onChangeHandle  : this.onAreaChangeHandle
            },
            {
                title           : '地址',
                value           : address,
                placeholder     : '请填写详细地址，5~60个字',
                onChangeHandle  : this.onAddressChangeHandle
            },
            {
                title           : '邮编',
                value           : postcode,
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
        const { setDefault } = this.state;
        return (
            <div 
                styleName="default"
                onClick={() => this.onChangeDefault()}
            >
                <span 
                    styleName="icon"
                    style={{background: setDefault === true ? '#f27a7a' : '#ffffff'}}
                />
                <span styleName="defaultText">设置成默认收货地址</span>
            </div>
        );
    }
}

const AddAddressHoc = CSSModules(AddAddress, styles);

export default AddAddressHoc;