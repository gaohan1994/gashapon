import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../components/haeder_set';

export interface Props {
    
}

export interface State {

}

class Address extends React.Component <Props, State> {
    
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
                    renderAddressItem
                </div>
            </div>
        );
    }

    private renderFooter = (): JSX.Element => {
        return (
            <div 
                styleName="footer"
                bgimg-center="100"
            >
                新建收货地址
            </div>
        );
    }
}

const AddressHoc = CSSModules(Address, styles);

export default AddressHoc;