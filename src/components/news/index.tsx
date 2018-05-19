import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    hideNews,
    StatusActions,
    loadNotifies,
} from '../../actions/status';
import { 
    getNewsStatus,
    getNotifies,
} from '../../reducers/status';

export type Notifies = [{
    _id     : string;
    content : string;
}];

interface Props {
    display     ?: boolean;
    hideNews    ?: () => void;
    getNotifies ?: Notifies;
    loadNotifies?: () => void;
}

interface State {

}

class News extends React.Component<Props, State> {

    componentDidMount() {
        
        const { loadNotifies } = this.props;
        if (loadNotifies) {
            loadNotifies();
        }
    }

    render (): JSX.Element {
        const { 
            display, 
            hideNews,
            getNotifies
        } = this.props;

        return (
            <section
                styleName={display === true ? 'show' : 'hide'}
                flex-center="all-center"
                onClick={hideNews}
            >
                <div
                    styleName="content"
                    bgimg-center="100"
                >
                    {getNotifies && getNotifies.length > 0
                    ? <div styleName="newsBodyWithNotifies" >
                        {getNotifies.map((item) => (
                            <div key={item._id}>{item.content}</div>
                        ))}
                    </div>
                    : <div styleName="newsBody" flex-center="all-center">暂时没有收到消息</div>}
                </div>
            </section>
        );
    }
}

const NewsHoc = CSSModules(News, styles);

const mapStateToProps = (state: Stores) => ({
    display     : getNewsStatus(state),
    getNotifies : getNotifies(state),
});

const mapDispatchToProps = (dispatch: Dispatch<StatusActions>) => ({
    hideNews    : bindActionCreators(hideNews, dispatch),
    loadNotifies: bindActionCreators(loadNotifies, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewsHoc);