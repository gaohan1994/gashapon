import * as React from 'react';
import * as Proptypes from 'prop-types';
import Meta from 'react-document-meta';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Stores } from '../../reducers/type';
import { HomeActions , loadUserDataFromUuid } from '../../actions/home';
import { showSignModal } from '../../actions/status';
import { getUserdata } from '../../reducers/home';
import { Userdata } from '../../types/user';
import User from '../../classes/user';
import SignModal from '../../containers/sign';

interface Props {
    children            ?: JSX.Element | JSX.Element[];
    getUserdata         ?: Userdata;
    loadUserDataFromUuid?: () => void;
    showSignModal       ?: () => void;

    didmountSignStatus  ?: boolean;
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
            title: '嘀哩扭蛋'
        };
    }

    componentWillMount() {
        
        const { 
            loadUserDataFromUuid, 
            didmountSignStatus, 
            showSignModal, 
            getUserdata 
        } = this.props;

        // const userId = '5ac1f31087e83ef4915abc02';
        const user = User.getUser();
        if (!user.userId) {
            /* do no sign handle */
            if (didmountSignStatus === true) {
                if (showSignModal) {
                    showSignModal();
                }
            }
        } else {
            if (getUserdata && getUserdata._id) {
                return;
            } else {
                if (loadUserDataFromUuid) {
                    loadUserDataFromUuid();
                }
            }
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
                <SignModal/>
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
    // loadUserData: bindActionCreators(loadUserData, dispatch),
    loadUserDataFromUuid: bindActionCreators(loadUserDataFromUuid, dispatch),
    showSignModal       : bindActionCreators(showSignModal, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Hoc);