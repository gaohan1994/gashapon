import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Address as AddressType } from '../../types/user';

export interface Props {
    data            : AddressType;
    propsClickHandle?: (address?: AddressType) => void;
}

const AddressItem = ({data, propsClickHandle = (address: AddressType) => {/*no empty*/}}: Props): JSX.Element => {
    return (
        <div 
            styleName="item"
            onClick={propsClickHandle ? () => propsClickHandle(data) : () => {/* no empty */}}
        >
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

                <span styleName="bge">{`>`}</span>
            </div>
        </div>
    );
};

const AddressItemHoc = CSSModules(AddressItem, styles);

export default AddressItemHoc;