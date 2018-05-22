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
import Button from '../../../components/button';

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
                flex-center="all-center"
                style={{
                        visibility  : display === true ? 'visible' : 'hidden',
                        opacity     : display === true ? 1 : 0
                    }}
            >
                <div styleName="bgimg"/>
                <div 
                    styleName="image"
                    bgimg-center="100"
                >
                    {this.renderSwiper()}
                </div>
                <div styleName="button">
                    <Button
                        btnText="继续扭蛋"
                        clickHandle={onHide}
                        btnRadius={true}
                        btnSize="small"
                    />
                </div>
                
                    {/* <span styleName="tip">特别提示：试一试结果与实际库存无关</span> */}
                    {/* <span 
                        styleName="button"
                        onClick={onHide}
                    >
                        继续扭蛋
                    </span> */}
                    
            </div>
        );
    }

    private renderSwiper = (): JSX.Element => {
        const { current } = this.state;
        const { data, totalData } = this.props;

        const items = data && data.map((item: GashaponProductItem, i) => (
            <div 
                styleName="item"
                flex-center="all-center"
                key={i}
            >
                <img
                    styleName="cover"
                    src={item && item.pics && item.pics[0] 
                        ? `http://${config.host.pic}/${item.pics[0]}` 
                        : `${config.empty_pic.url}`}
                />
                <span styleName="name" word-overflow="word-overflow">
                    {item
                    ? `${totalData.name}  全${totalData.product_list && totalData.product_list.length}款  
                    -  ${totalData.product_list && totalData.product_list.indexOf(item)}号`
                    : ''}
                </span>
            </div>
        ));
        
        const containerStyle = {
            width: '100%',
            height: '100%'
        };
        return (
            <div styleName="box">
                <AutoSwipeableViews
                    autoplay={true}
                    style={containerStyle}
                    index={current}
                    containerStyle={containerStyle}
                    onChangeIndex={this.onChangeIndex}
                    enableMouseEvents={true}
                >
                    {items ? items : []}
                </AutoSwipeableViews>
            </div>
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