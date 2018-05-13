import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';

interface Props {
    title       : string;
    propsClick  ?: () => void;
}

interface State {
    showItems   : boolean;
    type        : 'create' | 'condition' | 'price' | 'expire';
}

class Header extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showItems   : false,
            type        : 'create'
        };
        this.clickListenHandle = this.clickListenHandle.bind(this);
    }

    componentDidMount (): void {
        window.addEventListener('click', this.clickListenHandle);
    }

    componentWillUnmount (): void {
        window.removeEventListener('click', this.clickListenHandle);
    }
    
    public clickListenHandle = (event: any): void => {
        if (event.target.getAttribute('id') !== 'showItems') {
            this.onHideItems();
        }
    }

    public onShowItems = (): void => {
        this.setState({
            showItems: true
        });
    }

    public onHideItems = (): void => {
        this.setState({
            showItems: false
        });
    }

    public toogleShowItems = (): void => {
        this.setState({
            showItems: !this.state.showItems
        });
    }

    public onNavHandle = (): void => {
        history.goBack();
    }

    public onChangeTypeHandle = (type: 'create' | 'condition' | 'price' | 'expire') => {
        this.setState({
            type: type
        });
        history.push(`/coupons/${type}`);
    }

    render () {
        const { showItems, type } = this.state;
        const { title, propsClick } = this.props;
        return (
            <header styleName="container">
                <div styleName="left">
                    <i 
                        styleName="icon"
                        onClick={propsClick ? propsClick : () => this.onNavHandle()}
                    />
                    <span 
                        styleName="text"
                        onClick={propsClick ? propsClick : () => this.onNavHandle()}
                    >
                        {title}
                    </span>
                </div>
                <div 
                    styleName="list"
                    id="showItems"
                    onClick={this.toogleShowItems}
                >
                    {this.renderTypeValue(type)}
                    <ul 
                        styleName="items"
                        style={{
                            visibility  : showItems === true ? 'visible' : 'hidden',
                            opacity     : showItems === true ? 1 : 0
                        }}
                    >
                        <li onClick={() => this.onChangeTypeHandle('create')}>获得时间排序</li>
                        <li onClick={() => this.onChangeTypeHandle('condition')}>使用门槛排序</li>
                        <li onClick={() => this.onChangeTypeHandle('price')}>优惠券价格排序</li>
                        <li onClick={() => this.onChangeTypeHandle('expire')}>过期排序</li>
                    </ul>
                </div>
            </header>
        );
    }

    private renderTypeValue = (type: string): string => {
        console.log('type', type);
        if (type === 'create') {
            return '获得时间排序';
        } else if (type === 'condition') {
            return '使用门槛排序';
        } else if (type === 'price') {
            return '优惠券价格排序';
        } else if (type === 'expire') {
            return '过期排序';
        } else {
            return '';
        }
    }
}

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;