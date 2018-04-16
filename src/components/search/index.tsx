import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';

import { 
    hideSearchModal,
    StatusActions,
    emptySearchItems,
    addSearchItem,
} from '../../actions/status';
import { 
    getSearchStatus,
    getSearchHisotry,
} from '../../reducers/status';
// import history from '../../history';

interface Props {
    display         ?: boolean;
    hideSearchModal ?: () => void;
    searchHistory   ?: string[];
    emptySearchItems?: () => void;
    addSearchItem   ?: (value: string) => void;
}

interface State {
    value: string;
}

class Search extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    public doSearchHandle = (): void => {
        const { value } = this.state;
        const { addSearchItem, hideSearchModal } = this.props;
        if (!!addSearchItem && !!hideSearchModal) {
            this.onChangeHandle({target: {value: ''}});
            addSearchItem(value);
            hideSearchModal();
        }
        // history.push(`/gashapons/topic/${value}`);
    }

    public doClearHistoryHandle = (): void => {
        const { emptySearchItems } = this.props;
        if (emptySearchItems) {
            emptySearchItems();
        }  
    }

    public onChangeHandle = (event: any): void => {
        this.setState({
            value: event.target.value
        });
    }

    public onItemClickHandle = (): void => {
        console.log('hello');
        const { hideSearchModal } = this.props;
        if (hideSearchModal) {
            hideSearchModal();
        }
    }

    render() {
        const { display } = this.props;
        
        return (
            <div 
                styleName={display === true ? 'show' : 'hide'}
                style={{bottom: display === true ? '0' : '-100vh'}}
            >
                {this.renderHeader()}
                {this.renderHot()}
                {this.renderHistory()}
            </div>
        );
    }

    private renderHeader = (): JSX.Element => {
        const { value } = this.state;
        const { hideSearchModal } = this.props;
        const iconStyle = {
            backgroundImage: 'url(http://net.huanmusic.com/gasha/gacha-icon.png)',
            backgroundPosition: '-119px -28px',
            backgroundSize: '146.5px auto',
            width: '21px',
            height: '21px',
        };
        return (
            <div 
                flex-center="all-center"
                styleName="searchHeader"
            >
                <i style={iconStyle} onClick={hideSearchModal}/>
                <input 
                    styleName="searchInput"
                    value={value}
                    onChange={this.onChangeHandle}
                />
                <span styleName="doSearch" onClick={() => this.doSearchHandle()}>搜索</span>
            </div>
        );
    }

    private renderHot = (): JSX.Element => {
        const hots = [
            {value: '院子小姐asdasd'}, {value: '院子小姐'}, {value: '院子小姐'}, {value: '院子ssdfdfsdf小姐'}, 
            {value: '院子小姐'}, {value: '院子小姐asdasdasd'}, {value: '院子asd小姐'}, {value: '123123院子小姐'}, 
        ];
        return (
            <div styleName="hot">
                <div styleName="typeIcon">热门搜索</div>
                <div styleName="content">
                    {hots.map((item, i) => (
                        <span 
                            key={i} 
                            styleName="hotItem"
                            onClick={() => this.onItemClickHandle()}
                        >
                            {item.value}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    private renderHistory = (): JSX.Element => {
        const { searchHistory } = this.props;
        return (
            <div styleName="history">
                <div styleName="typeIcon">
                    <span>历史搜索</span>
                    <span onClick={() => this.doClearHistoryHandle()}>X</span>
                </div>
                <div styleName="content">
                    {searchHistory && searchHistory.length > 0
                    ? searchHistory.map((item, i) => (
                        <span 
                            key={i} 
                            styleName="historyitem"
                            onClick={() => this.onItemClickHandle()}
                        >
                            {item}
                        </span>
                    ))
                    : ''}
                </div>
            </div>
        );
    }
}

const SearchHoc = CSSModules(Search, styles);

const mapStateToProps = (state: Stores) => ({
    display         : getSearchStatus(state),
    searchHistory   : getSearchHisotry(state),
});

const mapDispatchToProps = (dispatch: Dispatch<StatusActions>) => ({
    hideSearchModal : bindActionCreators(hideSearchModal, dispatch),
    emptySearchItems: bindActionCreators(emptySearchItems, dispatch),
    addSearchItem   : bindActionCreators(addSearchItem, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchHoc);