import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import Text from '../text';
import { GashaponProductItem } from '../../types/componentTypes';

export interface Button {
    value       : string;
    clickHandle : () => void;
}

export interface Footer {
    show    : boolean;
    buttons ?: Button[];
}

interface Props {
    data: GashaponProductItem[];
}

interface State {
    showMore: boolean;
}

class Product extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showMore: false
        };
    }

    public toogleShowMore = (): void => {
        this.setState({
            showMore: !this.state.showMore
        });
    }

    render() {
        
        const { showMore } = this.state;
        const { data } = this.props;
        
        return (
            <div styleName="box">
                {data && data.length > 0
                ?   showMore === true
                    ? data.map((item: GashaponProductItem, i: number) => {
                        return (
                            <div 
                                key={i}
                                styleName="container"
                                flex-center="all-center"
                            >
                                <div styleName="border">
                                    <div 
                                        bgimg-center="bgimg-center"
                                        styleName="cover"
                                        style={{
                                            backgroundImage: item.pics && item.pics[0]
                                            ? `url(//${config.host.pic}/${item.pics[0]})`
                                            : `url(${config.empty_pic.url})`
                                        }}
                                    />
                                    <div styleName="detail">
                                        <Text 
                                            value={item.name}
                                            size="bold"
                                        />
                                        <Text
                                            value={`X${item.quantity}`} 
                                            subValue={`￥10`}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    : data.slice(0, 2).map((item: GashaponProductItem, i: number) => {
                        return (
                            <div 
                                key={i}
                                styleName="container"
                                flex-center="all-center"
                            >
                                <div styleName="border">
                                    <div 
                                        bgimg-center="bgimg-center"
                                        styleName="cover"
                                        style={{
                                            backgroundImage: item.pics && item.pics[0]
                                            ? `url(//${config.host.pic}/${item.pics[0]})`
                                            : `url(${config.empty_pic.url})`
                                        }}
                                    />
                                    <div styleName="detail">
                                        <Text 
                                            value={item.name}
                                            size="bold"
                                        />
                                        <Text
                                            value={`X${item.quantity}`} 
                                            subValue={`￥10`}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                :   ''}
                
                {this.renderShowMore()}
            </div>
        );
    }

    private renderShowMore = (): JSX.Element | string => {
        const { showMore } = this.state;
        const { data } = this.props;

        if (data && data.length > 2) {
            return (
                <div 
                    styleName="more"
                    flex-center="all-center"
                    onClick={this.toogleShowMore}
                >
                    共{data && data.length}件
                    <span 
                        styleName="morebge"
                        bgimg-center="100"
                        style={{
                            transform: showMore === true ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                    />
                </div>
            );
        } else {
            return '';
        }
    }
}

const ProductHoc = CSSModules(Product, styles);

export default ProductHoc;