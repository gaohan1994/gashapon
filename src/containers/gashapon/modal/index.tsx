import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../../config';
import { 
    Gashapon,
    GashaponProductItem
} from '../../../types/componentTypes';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoSwipeableViews = autoPlay(SwipeableViews);

interface Props {
    display     : boolean;
    onHide      : () => void;
    totalData   : Gashapon;
    data        ?: GashaponProductItem[];
}

interface State {
    current: number;
}

class Modal extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            current: 0
        };
    }

    render (): JSX.Element {
        const { display, onHide } = this.props;
        return (
            <div 
                styleName="container"
                style={{
                        display: display === true ? 'block' : 'none', 
                        opacity: display === true ? 1 : 0
                    }}
            >
                <div styleName="bgimg">
                    <i styleName="title"/>
                    <div styleName="image">
                        {this.renderSwiper()}
                    </div>
                    <span styleName="tip">特别提示：试一试结果与实际库存无关</span>
                    <span 
                        styleName="button"
                        onClick={onHide}
                    >
                        继续扭蛋
                    </span>
                </div>
            </div>
        );
    }

    private renderSwiper = (): JSX.Element => {
        const { current } = this.state;
        const { data, totalData } = this.props;
        const items = data && data.map((item: GashaponProductItem, i) => (
            <div 
                styleName="item"
                key={i}
            >
                <div
                    bgimg-center="bgimg-center"
                    styleName="cover"
                    style={{backgroundImage: 
                            item && item.pics && item.pics[0] 
                            ? `url(http://${config.host.pic}/${item.pics[0]})` 
                            : `url(${config.empty_pic.url})`}}
                />
                <span styleName="name" word-overflow="word-overflow">
                    {item
                    ? `${totalData.name}  全${totalData.product_list && totalData.product_list.length}款  
                    -  ${totalData.product_list && totalData.product_list.indexOf(item)}号`
                    : ''}
                </span>
            </div>
        ));
        const style = {
            width: '60vw',
            height: '100%'
        };
        
        const containerStyle = {
            width: '100%',
            height: '100%'
        };
        return (
            <AutoSwipeableViews
                autoplay={true}
                style={style}
                index={current}
                containerStyle={containerStyle}
                onChangeIndex={this.onChangeIndex}
                enableMouseEvents={true}
            >
                {items ? items : []}
            </AutoSwipeableViews>
        );
    }

    private readonly onChangeIndex = (index: number, indexLast: number): void => {
        this.setState({
            current: index
        });
    }
}

const ModalHoc = CSSModules(Modal, styles);

export default ModalHoc;