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
    loadHotSearchWords
} from '../../actions/main';
import { 
    getSearchStatus,
    getSearchHisotry,
} from '../../reducers/status';
import { 
    getHotSearchWords
} from '../../reducers/main';
import history from '../../history';

export interface HotSearchWord {
    status  : number;
    content : string;
}

interface Props {
    display             ?: boolean;
    hideSearchModal     ?: () => void;
    searchHistory       ?: string[];
    emptySearchItems    ?: () => void;
    addSearchItem       ?: (value: string) => void;
    loadHotSearchWords  ?: () => void;
    getHotSearchWords   ?: HotSearchWord[];
}

interface State {
    value: string;
}

interface DoChangeWordParam {
    content : string;
    status  ?: number;
}

class Search extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    componentDidMount(): void {
        const { loadHotSearchWords } = this.props;
        if (!!loadHotSearchWords) {
            loadHotSearchWords();
        }
    }

    public doSearchHandle = (): void => {
        const { value } = this.state;
        const { addSearchItem, hideSearchModal } = this.props;

        if (!value || !value.trim()) {
            alert('请输入搜索内容~');
            return;
        }

        if (!!addSearchItem && !!hideSearchModal) {
            /* 重置value */
            this.onChangeHandle({target: {value: ''}});

            /* 加入历史搜索 */
            addSearchItem(value);

            /* 跳转页面 */
            this.doChangeWordHandle({content: value});

            /* 隐藏modal */
            hideSearchModal();
        }
    }

    public doClearHistoryHandle = (): void => {
        const { emptySearchItems } = this.props;
        if (emptySearchItems) {
            emptySearchItems();
        }  
    }

    public doChangeWordHandle = ({content, status}: DoChangeWordParam): void => {
        //
        history.push(`/gashapons/word/${content}`);
    }

    public onChangeHandle = (event: any): void => {
        this.setState({
            value: event.target.value
        });
    }

    public onItemClickHandle = ({content, status}: DoChangeWordParam): void => {
        console.log('hello');
        const { hideSearchModal } = this.props;
        if (hideSearchModal) {
            
            this.doChangeWordHandle({content: content});

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
        return (
            <div 
                flex-center="all-center"
                styleName="searchHeader"
                bgimg-center="100"
            >
                <i 
                    styleName="icon" 
                    onClick={hideSearchModal}
                    bgimg-center="100"
                />
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
        const { getHotSearchWords } = this.props;
        return (
            <div styleName="hot">
                <div styleName="typeIcon">热门搜索</div>
                <div styleName="content">
                    {getHotSearchWords && getHotSearchWords.length > 0
                    ? getHotSearchWords.map((item: HotSearchWord, i: number) => (
                        <span 
                            key={i} 
                            styleName="hotItem"
                            onClick={() => this.onItemClickHandle({content: item.content, status: item.status})}
                        >
                            {item.content}
                        </span>
                    ))
                    : ''}
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
                            onClick={() => this.onItemClickHandle({content: item})}
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
    display             : getSearchStatus(state),
    searchHistory       : getSearchHisotry(state),
    getHotSearchWords   : getHotSearchWords(state),
});

const mapDispatchToProps = (dispatch: Dispatch<StatusActions>) => ({
    hideSearchModal     : bindActionCreators(hideSearchModal, dispatch),
    emptySearchItems    : bindActionCreators(emptySearchItems, dispatch),
    addSearchItem       : bindActionCreators(addSearchItem, dispatch),
    loadHotSearchWords  : bindActionCreators(loadHotSearchWords, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchHoc);