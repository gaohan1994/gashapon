import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

interface Props {
    display: boolean;
    onHide : () => void;
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

const Modal = ({display, onHide}: Props) => (
    <div 
        styleName="container"
        style={{
                display: display === true ? 'block' : 'none', 
                opacity: display === true ? 1 : 0
            }}

        onClick={onHide}
    >
        <i styleName="title"/>
        <div styleName="image">image</div>
        <i styleName="tip"/>
        <i styleName="button"/>
    </div>
);

const ModalHoc = CSSModules(Modal, styles);

export default ModalHoc;