import * as React from 'react';
import * as Proptypes from 'prop-types';
import Meta from 'react-document-meta';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Stores } from '../../reducers/type';
import { HomeActions , loadUserData } from '../../actions/home';
// import { getUserdata } from '../../reducers/home';

interface Props {
    children    : JSX.Element;
    loadUserData?: (userId: string) => void;
}

interface State {
    title: string;
}

/**
 * @returns 
 * @memberof Hoc
 */
class Hoc extends React.Component<Props, State> {

    static childContextTypes = {
        setMeta: Proptypes.func
    };

    getChildContext() {
        return {
            setMeta: this.setMeta
        };
    }
    
    constructor (props: Props) {
        super(props);
        this.state = {
            title: '幻音音乐'
        };
    }

    componentDidMount() {
        const { loadUserData } = this.props;
        const userId = '5ac1f31087e83ef4915abc02';
        if (loadUserData) {
            loadUserData(userId);
        }
    }

    render() {
        const { title } = this.state;
        const meta = {
            title: title
        };
        return (
            <Meta {...meta}>
                {this.props.children}
            </Meta>
        );
    }

    private setMeta = (title: string): void => {
        this.setState({
            title: title
        });
    }
}

const mapStateToProps = (state: Stores) => ({
    // getUserdata: 
});

const mapDispatchToProps = (dispatch: Dispatch<HomeActions>) => ({
    loadUserData: bindActionCreators(loadUserData, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hoc);