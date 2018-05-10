import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';
import SignModal from '../../containers/sign';
import News from '../../components/news';
import User from '../../classes/user';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    StatusActions, 
    showSignModal,
    showNews,
} from '../../actions/status';
import { Stores } from '../../reducers/type';

interface Props {
    title           : string;
    showSignModal   ?: () => void;
    showNews        ?: () => void;
}

interface State {
    value       : string;
    showSearch  : boolean;
}

class Header extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = { 
            value       : '',
            showSearch  : false
        };
    }

    public doShowSearchHandle = () => {
        const { showSignModal } = this.props;
        const user = User.getUser();
        if (!user.uid) {
            
            if (showSignModal) {
                showSignModal();
            }
        } else {

            this.setState({
                showSearch: true
            });
        }
    }

    public doShowNewsHandle = () => {
        const { showNews, showSignModal } = this.props;
        const user = User.getUser();

        if (!user.uid) {

            if (showSignModal) {
                showSignModal();
            }
        } else {

            if (showNews) {
                showNews();
            }
        }
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
        const { title } = this.props; 
        return (
            <header 
                styleName="container"
                bgimg-center="100"
            >
                <SignModal/>
                <News/>
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
                    <i 
                        styleName="searchIcon"
                        bgimg-center="100"
                    />
                    {title ? title : '输入关键字搜索扭蛋'}
                </div>
                <i 
                    styleName="icons"
                    bgimg-center="100"
                    style={{backgroundImage: `url(http://net.huanmusic.com/gasha/%E6%B6%88%E6%81%AF.png)`}}
                    onClick={() => this.doShowNewsHandle()}
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
                    bgimg-center="100"
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

export const mapStateToProps = (state: Stores) => ({

});

export const mapDispatchToProps = (dispatch: Dispatch<StatusActions>, state: Stores) => ({
    showNews        : bindActionCreators(showNews, dispatch),
    showSignModal   : bindActionCreators(showSignModal, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HeaderHoc);