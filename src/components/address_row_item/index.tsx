import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Address as AddressType } from '../../types/user';
import Modal from '../modal';
import { NormalReturnObject } from '../../classes/base';
import User from '../../classes/user';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { 
    HomeActions,
    loadUserDataFromUuid,
} from '../../actions/home';
import { Stores } from '../../reducers/type';

export interface Props {
    data                : AddressType;
    propsClickHandle    ?: (address?: AddressType) => void;
    loadUserDataFromUuid?: () => void;
}

export interface State {
    showDeleteModal: boolean;
}

class AddressItem extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showDeleteModal: false
        };
    }

    public onShowDeleteHandle = (): void => {
        this.setState({
            showDeleteModal: true
        });
    }

    public onHideDeleteHandle = (): void => {
        this.setState({
            showDeleteModal: false
        });
    }

    public onConfirmHandle = async (id: string): Promise <void> => {
        const { loadUserDataFromUuid } = this.props;
        const result: NormalReturnObject = await User.doDeleteAddressMethod(id);

        if (result.success === true) {
            if (loadUserDataFromUuid) {
                loadUserDataFromUuid();
                this.onHideDeleteHandle();
            }
        } else {
            this.onHideDeleteHandle();
        }
    }

    render (): JSX.Element {
        const { showDeleteModal } = this.state;
        const { data, propsClickHandle } = this.props;
        return (
            <div styleName="item">
                <Modal
                    display={showDeleteModal}
                    value="是否确认删除该地址？"
                    onCancelClickHandle={this.onHideDeleteHandle}
                    onConfirmClickHandle={() => this.onConfirmHandle(data._id)}
                />
                <div styleName="border">
    
                    <div styleName="box">
                        <span styleName="big">{data.receiver}</span>
                        <span styleName="big" style={{marginLeft: '2vw'}} >{data.phone}</span>
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
                </div>
    
                <div styleName="buttons">
                    <span 
                        styleName="button"
                        bgimg-center="100"
                        style={{backgroundImage: `url(//net.huanmusic.com/gasha/%E7%BC%96%E8%BE%91.png)`}}
                        onClick={propsClickHandle ? () => propsClickHandle(data) : () => {/* no empty */}}
                    />
                    <span 
                        styleName="button"
                        bgimg-center="100"
                        style={{backgroundImage: `url(//net.huanmusic.com/gasha/%E5%88%A0%E9%99%A4.png)`}}
                        onClick={this.onShowDeleteHandle}
                    />
                </div>
            </div>
        );
    }
}

const AddressItemHoc = CSSModules(AddressItem, styles);

export const mapStateToProps = (state: Stores) => ({

});

export const mapDispatchToProps = (dispatch: Dispatch<HomeActions>) => ({
    loadUserDataFromUuid: bindActionCreators(loadUserDataFromUuid, dispatch)
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddressItemHoc);