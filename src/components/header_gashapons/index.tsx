import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    Genre,
    Genres,
} from '../../types/componentTypes';
import { 
    getTopics,
} from '../../reducers/main';
import { 
    StatusActions,
    showSearchModal,
    showNews,
} from '../../actions/status';
import history from '../../history';

interface Props {
    showSearchModal ?: () => void;
    getTopics       ?: Genres;
    showNews        ?: () => void;
}

interface State {
    showTopics: boolean;
}

class Header extends React.Component<Props, State> {

    constructor(props: Props) {

        super(props);

        this.state = {
            showTopics: false,
        };
    }

    public doChangeTopicHandle = (topic: string): void => {
        this.toggleTopics();
        history.push(`/gashapons/topic/${topic}`);
    }

    public toggleTopics = (): void => {
        this.setState({
            showTopics: !this.state.showTopics
        });
    }

    render() {
        return (
            <header styleName="container">
                {this.renderTopics()}
                {this.renderHeader()}
            </header>
        );
    }

    private renderHeader = (): JSX.Element => {
        const { showSearchModal, showNews } = this.props;
        return (
            <div styleName="header">
                <i styleName="search" onClick={showSearchModal}/>
                <div styleName="item2" onClick={this.toggleTopics}/>
                <div styleName="item3" onClick={showNews}/>
            </div>
        );
    }

    private renderTopics = (): JSX.Element => {
        const { showTopics } = this.state;
        const { getTopics } = this.props;
        return (
            <div 
                styleName={showTopics === true ? 'show' : 'hide'}
                onClick={this.toggleTopics}
            >
                <div 
                    styleName="wrapper"
                    style={{bottom: showTopics === true ? '0' : '-80vh'}}
                >
                    <button styleName="bigButton">全部关注</button>
                    {getTopics && getTopics.map((item: Genre, i) => (
                        <button 
                            key={i}
                            styleName="smallButton"
                            onClick={() => this.doChangeTopicHandle(item._id)}
                        >
                            {item.name}
                        </button>
                    ))}
                    <button styleName="bigButton">取消</button>
                </div>
            </div>
        );
    }
}

const HeaderHoc = CSSModules(Header, styles);

const mapStateToProps = (state: Stores) => ({
    getTopics   : getTopics(state),
});

const mapDispatchToProps = (dispatch: Dispatch<StatusActions>, state: Stores) => ({
    showSearchModal : bindActionCreators(showSearchModal, dispatch),
    showNews        : bindActionCreators(showNews, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HeaderHoc);