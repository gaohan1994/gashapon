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

    footer?: Footer;
}

interface State {}

class Product extends React.Component<Props, State> {

    render() {
        
        const { data, footer } = this.props;
        
        return (
            <div styleName="box">
                {data && data.length > 0
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
                                        ? `url(http://${config.host.pic}/${item.pics[0]})`
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
                : ''}
                {footer && footer.show === true
                ? <div styleName="footer">
                    <div styleName="buttons">
                        {footer.buttons && footer.buttons.map((item: Button, i: number) => (
                            <span 
                                styleName="button"
                                key={i}
                                onClick={item.clickHandle}
                            >
                                {item.value}
                            </span>
                        ))}
                    </div>
                </div>
                : ''}
            </div>
            
        );
    }
}

const ProductHoc = CSSModules(Product, styles);

export default ProductHoc;