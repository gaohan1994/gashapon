import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';

import { 
    hideNews,
    StatusActions,
} from '../../actions/status';
import { 
    getNewsStatus
} from '../../reducers/status';
// import config from '../../config/index';
// import history from '../../history';

interface Props {
    display ?: boolean;
    hideNews?: () => void;
}

interface State {

}

class News extends React.Component<Props, State> {
    render (): JSX.Element {

        const { display, hideNews } = this.props;

        return (
            <section
                styleName={display === true ? 'show' : 'hide'}
                flex-center="all-center"
                onClick={hideNews}
            >
                <div
                    styleName="content"
                    style={{bottom: display === true ? '10vh' : '-100vh'}}
                >
                    <div styleName="header">系统通知</div>
                    <div styleName="newsBody" flex-center="all-center">暂时没有收到消息</div>
                </div>
            </section>
        );
    }
}

const NewsHoc = CSSModules(News, styles);

const mapStateToProps = (state: Stores) => ({
    display: getNewsStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch<StatusActions>) => ({
    hideNews: bindActionCreators(hideNews, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewsHoc);