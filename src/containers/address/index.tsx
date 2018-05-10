import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';
import Header from '../../components/haeder_set';
import { connect, Dispatch } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { getUserdata } from '../../reducers/home';
import { Userdata, Address as AddressType } from '../../types/user';
import { Stores } from '../../reducers/type';
// import User from '../../classes/user';

export interface Props {
    getUserdata: Userdata;
}

export interface State {

}

class Address extends React.Component <Props, State> {

    public onNavHandle = (param: string): void => {
        history.push(`/${param}`);
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
                />
                {getUserdata.address && getUserdata.address.length > 0
                ? getUserdata.address.map((item: AddressType, i: number) => {
                    return this.renderAddressItem(item, i);
                })
                : ''}
                {this.renderFooter()}
            </div>
        );
    }

    private renderAddressItem = (data: AddressType, i: number): JSX.Element => {
        return (
            <div styleName="item" key={i}>
                <div styleName="border">
                    <div styleName="box">
                        <span styleName="big">{data.receiver}</span>
                        <span styleName="big">{data.phone}</span>
                    </div>
                    
                    <div styleName="box">
                        {data.status === 1
                        ?   <span style={{color: `#fea270`}} styleName="small">
                            【默认】
                            </span>
                        :   ''}
                        
                        <span style={{color: `#999999`}} styleName="small">
                            {data.detail_area}
                            {data.detail_home}
                        </span>
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

export const mapStateToProps = (state: Stores) => ({
    getUserdata: getUserdata(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddressHoc);