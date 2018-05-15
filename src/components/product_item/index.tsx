import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import Text from '../text';
import { GashaponProductItem } from '../../types/componentTypes';

interface Props {
    data: GashaponProductItem[];
}

interface State {}

class Product extends React.Component<Props, State> {

    render() {
        
        const { data } = this.props;
        
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
                {this.renderFooter()}
            </div>
            
        );
    }

    private renderFooter = (): JSX.Element => {
        return (
            <div styleName="footer">
                renderFooter
                {this.renderButtons()}
            </div>
        );
    }

    private renderButtons = (): JSX.Element => {
        return (
            <div styleName="buttons">
                <i 
                    styleName="button" 
                    bgimg-center="100"
                    style={{backgroundImage: 'url(http://net.huanmusic.com/gasha/%E4%BB%98%E6%AC%BE.png)'}}
                />
                <i 
                    styleName="button" 
                    bgimg-center="100"
                    style={{backgroundImage: `url(http://net.huanmusic.com/gasha/%E5%8F%96%E6%B6%88%E8%AE%A2%E5%8D%95.png)`}}
                />
            </div>
        );
    }
}

const ProductHoc = CSSModules(Product, styles);

export default ProductHoc;