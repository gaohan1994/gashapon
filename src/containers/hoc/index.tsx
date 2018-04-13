import * as React from 'react';
import * as Proptypes from 'prop-types';
import Meta from 'react-document-meta';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Stores } from '../../reducers/type';
import { HomeActions , loadUserData } from '../../actions/home';
import { getUserdata } from '../../reducers/home';
import { Userdata } from '../../types/user';

interface Props {
    children    : JSX.Element;
    getUserdata ?: Userdata;
    loadUserData?: (userId: string) => void;
}

interface State {
    title: string;
}

interface CheckAuthReturnObject {
    success ?: boolean;
    type    ?: string;
    message ?: string;
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

    public doCheckAuth = (): CheckAuthReturnObject => {
        const { getUserdata } = this.props;

        try {
            if (!getUserdata) {
                throw new Error('用户数据错误');
            } else if (!getUserdata._id) {
                throw new Error('用户数据错误');
            } else {
                return {
                    success: true
                };
            }
        } catch (err) {
            console.log('未登录');
            return {
                type: 'FAIL_LOGIN',
                message: '未登录'
            };
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
    getUserdata: getUserdata(state),
});

const mapDispatchToProps = (dispatch: Dispatch<HomeActions>) => ({
    loadUserData: bindActionCreators(loadUserData, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hoc);