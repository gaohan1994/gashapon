import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../../components/haeder_set';
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
    totalData   : Gashapon;
    onHideHandle: () => void;
}

interface State {
    current: number;
}

class Select extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            current: 0
        };
    }

    render (): JSX.Element | string {

        const { current } = this.state;

        const { display, totalData, onHideHandle } = this.props;
        
        const 
            data: Array<JSX.Element> = [],
            trig: Array<JSX.Element> = [];

        if (totalData.product_list) {
            totalData.product_list.map((item: GashaponProductItem, i) => {
                data.push(
                    <div 
                        key={i}
                        styleName="image"
                    >
                        <img 
                            styleName="imageItem"
                            src={item.pics && item.pics[0]
                                ? `//${config.host.pic}/${item.pics[0]}`
                                : `${config.empty_pic.url}`}
                        />
                    </div>
                );
                trig.push(
                    <span 
                        key={i}
                        styleName={current === i ? `on` : ``}
                    />
                );
            });
        }

        if (display === true) {

            const style = {
                width: '60vw',
                height: '60vw'
            };
    
            const containerStyle = {
                width: '100%',
                height: '100%',
            };

            return (
                <div styleName="container">
                    <Header 
                        title={totalData.name || '加载中'}
                        propsClick={onHideHandle}
                    />
                    <div 
                        styleName="content"
                        flex-center="all-center"
                    >
                        <AutoSwipeableViews
                            autoplay={true}
                            style={style}
                            index={current}
                            containerStyle={containerStyle}
                            onChangeIndex={this.onChangeIndex}
                            enableMouseEvents={true}
                        >
                            {data}
                        </AutoSwipeableViews>
                    </div>
                    <div 
                        styleName="trig"
                        flex-center="all-center"
                    >
                        {trig}
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }

    private readonly onChangeIndex = (index: number, indexLast: number): void => {
        this.setState({
            current: index
        });
    }
}

const SelectHoc = CSSModules(Select, styles);

export default SelectHoc;