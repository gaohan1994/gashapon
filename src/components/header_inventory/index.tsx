import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';

interface Props {
    title: string;
}

interface State {
    value       : string;
    showSearch  : boolean;
}

class Header extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = { 
            value: '',
            showSearch: false
        };
    }

    public doShowSearchHandle = () => {
        this.setState({
            showSearch: true
        });
    }

    public doHideSearchHandle = () => {
        this.clearValue();
        this.setState({
            showSearch: false
        });
    }

    public onChangeHandle = (e: any) => {
        this.setState({
            value: e.target.value
        });
    }

    public clearValue = () => {
        this.setState({
            value: ''
        });
    }

    public doSearchHandle = () => {
        const { value } = this.state;
        this.doHideSearchHandle();
        history.push(`/inventory/word/${value}`);
    }

    public doSearchHandleCallback = () => {
        this.setState({
            showSearch: false,
        });
    }

    render() {
        // const { value } = this.state;
        const { title } = this.props; 
        return (
            <header 
                styleName="container"
            >
                <i 
                    styleName="icons"
                    style={{
                        width   : '30px',
                        height  : '30px'
                    }}
                />
                <div 
                    styleName="search"
                    onClick={this.doShowSearchHandle}
                >
                    {title ? title : '输入关键字搜索扭蛋'}
                </div>
                <i 
                    styleName="icons"
                    style={{
                        width   : '30px',
                        height  : '30px'
                    }}
                />
                {this.renderSearch()}
            </header>
        );
    }

    private renderSearch = (): JSX.Element => {
        const { showSearch, value } = this.state;
        return (
            <div 
                styleName={showSearch === true ? 'show' : 'hide'}
                style={{bottom: showSearch === true ? '0' : '-100vh'}}
            >
                <div 
                    styleName="container"
                >
                    <i 
                        styleName="icons"
                        style={{
                            width   : '30px',
                            height  : '30px'
                        }}
                        onClick={this.doHideSearchHandle}
                    />
                    <input 
                        styleName="search"
                        placeholder="输入关键字搜索"
                        value={value}
                        onChange={this.onChangeHandle}
                    />
                    <i 
                        styleName="icons"
                        style={{
                            width   : '30px',
                            height  : '30px'
                        }}
                        onClick={this.doSearchHandle}
                    />
                </div>
            </div>
        );
    }
}

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;