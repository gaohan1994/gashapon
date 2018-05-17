import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { Gashapon as GashaponType } from '../../types/componentTypes';
import config from '../../config';
// import history from '../../history';

interface Props {
    item            : GashaponType;
    propsClickHandle?: () => void;
}

interface State {
    showImg: boolean;
}

/**
 * 蛋柜页面扭蛋组件
 * @param param0 
 */
class Gashapon extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showImg: false
        };
    }

    public onClickHandle = (_id: string): void => {

        this.onShowImgHandle();
    }

    public onShowImgHandle = (): void => {
        this.setState({
            showImg: true
        });
    }

    public onHideImgHandle = (): void => {
        console.log('hide');
        this.setState({
            showImg: false
        });
    }

    render (): JSX.Element {
        const { item, propsClickHandle } = this.props;
        return (
            <div 
                styleName="container"
                onClick={propsClickHandle ? propsClickHandle : () => this.onClickHandle(item._id)}
            >
                {/* {this.renderModal()} */}
                <i 
                    styleName="cover"
                    style={{
                        backgroundImage: 
                            item.pics && item.pics[0] 
                            ? `url(http://${config.host.pic}/${item.pics[0]}?imageView/2/w/170/h/220)`
                            : `url(${config.empty_pic.url}?imageView/2/w/170/h/220)`
                    }}
                />
                <span styleName="name">{item.name}</span>
            </div>
        );
    }

    // private renderModal = (): JSX.Element => {
    //     const { showImg } = this.state;
    //     const { item } = this.props;
    //     console.log('showImg', showImg);
    //     return (
    //         <div 
    //             styleName="modal"
    //             flex-center="all-center"
    //             onClick={() => this.onHideImgHandle()}
    //             style={{
    //                 visibility  : showImg === true ? 'visible' : 'hidden',
    //                 opacity     : showImg === true ? 1 : 0
    //             }}
    //         >   
    //             <div 
    //                 styleName="modalimg"
    //                 bgimg-center="100"
    //                 onClick={() => this.onHideImgHandle()}
    //                 style={{
    //                     backgroundImage: item.pics && item.pics[0]
    //                                     ? `url(http://${config.host.pic}/${item.pics[0]})`
    //                                     : `url(${config.empty_pic.url})`
    //                 }}
    //             />
    //             <span styleName="modaltext">{item.name}</span>
    //         </div>
    //     );
    // }
}

const GashaponHoc = CSSModules(Gashapon, styles);

export default GashaponHoc;