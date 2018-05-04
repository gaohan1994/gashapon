import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';
import Header from '../../components/haeder_set';

export interface Props {
    
}

export interface State {

}

class Address extends React.Component <Props, State> {

    public onNavHandle = (param: string): void => {
        history.push(`/${param}`);
    }
    
    render (): JSX.Element {
        return (
            <div 
                styleName="container"
                container-with-header="true"
            >
                <Header 
                    title="收货地址"
                />
                {this.renderAddressItem()}
                {this.renderFooter()}
            </div>
        );
    }

    private renderAddressItem = (): JSX.Element => {
        return (
            <div styleName="item">
                <div styleName="border">
                    <div styleName="box">
                        <span styleName="big">姓名</span>
                        <span styleName="big">180000123</span>
                    </div>

                    <div styleName="box">
                        <span style={{color: `#fea270`}} styleName="small">【默认】</span>
                        <span style={{color: `#999999`}} styleName="small">福州市晋安区</span>
                    </div>

                    <span styleName="bge">{`>`}</span>
                </div>
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
}

const AddressHoc = CSSModules(Address, styles);

export default AddressHoc;