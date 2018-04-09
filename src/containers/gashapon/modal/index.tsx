import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../../config';
import { 
    Gashapon,
    GashaponProductItem
} from '../../../types/componentTypes';

interface Props {
    display     : boolean;
    onHide      : () => void;
    totalData   : Gashapon;
    data        ?: GashaponProductItem;
}

// class Modal extends React.Component<Props, State> {

//     render() {
//         return (
//             <div styleName="container">
//                 modal
//             </div>
//         );
//     }
// }

const Modal = ({display, onHide, data, totalData}: Props) => (
    <div 
        styleName="container"
        style={{
                display: display === true ? 'block' : 'none', 
                opacity: display === true ? 1 : 0
            }}
    >
        <i styleName="title"/>
        <div styleName="image">
            <div
                bgimg-center="bgimg-center"
                styleName="cover"
                style={{backgroundImage: 
                        data && data.pics && data.pics[0] 
                        ? `url(http://${config.host.pic}/${data.pics[0]})` 
                        : `url(${config.empty_pic.url})`}}
            />
            <span styleName="name" word-overflow="word-overflow">
                {data
                ? `${totalData.name}  全${totalData.product_list && totalData.product_list.length}款  
                -  ${totalData.product_list && totalData.product_list.indexOf(data)}号`
                : ''}
            </span>
        </div>
        <i styleName="tip"/>
        <i styleName="button" onClick={onHide}/>
    </div>
);

const ModalHoc = CSSModules(Modal, styles);

export default ModalHoc;