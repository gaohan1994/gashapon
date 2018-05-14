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

export interface Props {
    getUserdata : Userdata;
    getConfig   : orderAddressConfig;
}

export interface State {

}

class Address extends React.Component <Props, State> {

    public onNavHandle = (param: string): void => {
        history.push(`/${param}`);
    }

    public subPropsClickHandle = (): void => {
        //
    }
    
    render (): JSX.Element {

        const { getUserdata }  = this.props;
        return (
            <div
                styleName="container"
                container-with-header="true"
            >
                <Header
                    title="收货地址"
                    subTitle="编辑"
                    subPropsClick={() => this.subPropsClickHandle()}
                />
                
                {getUserdata.address && getUserdata.address.length > 0
                ? getUserdata.address.map((item: AddressType, i: number) => {
                    return (
                        <AddressItem
                            data={item} 
                            key={i}
                        />
                    );
                })
                : ''}

                {this.renderFooter()}
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

export const mapStateToProps = (state: Stores) => ({
    getUserdata : getUserdata(state),
    getConfig   : getConfig(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddressHoc);