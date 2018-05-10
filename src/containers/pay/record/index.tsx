import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { Stores } from '../../../reducers/type';
import { bindActionCreators, Dispatch } from 'redux';
import Header from '../../../components/haeder_set';
import User from '../../../classes/user';
import SignModal from '../../sign';
import { loadPayinfo, BusinessActions, LoadPayinfoParams } from '../../../actions/business';
import { getPayinfo } from '../../../reducers/business';
import { showSignModal } from '../../../actions/status';
import { arriveFooter } from '../../../config/util';

interface Props {
    loadPayinfo     : ({}: LoadPayinfoParams) => void;
    getPayinfo      : object[];
    showSignModal   : () => void;
}

interface State {
    page: number;
}

class Record extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            page: 0,
        };
    }

    componentDidMount () {
        const { loadPayinfo, showSignModal } = this.props;
        const user = User.getUser();

        if (!user.uid) {
            /* do sign handle */
            showSignModal();
        } else {
            loadPayinfo({uid: user.uid});
        }
        
        arriveFooter.add('payinfo', (): void => {
            
            loadPayinfo({
                uid     : user.uid, 
                page    : this.state.page + 1, 
                callback: this.loadPayinfoCallback
            });
        });
    }

    public loadPayinfoCallback = (page: number): void => {
        this.setState({page: page + 1});
    }

    render () {

        const { } = this.props;
        
        return (
            <div 
                styleName="container"
                container-with-header="true"
            >
                <Header title="收支明细"/> 
                {this.renderItem()}
            </div>
        );
    }

    private renderItem = (): JSX.Element => {
        return (
            <div 
                styleName="item"
                flex-center="all-center"
            >
                <SignModal/>
                <div styleName="border">
                    <div styleName="box">
                        <span styleName="normal">收支明细收支</span>
                        <span styleName="small">收支明细收支</span>
                        <span styleName="small">收支明细收支</span>
                    </div>
                    <div styleName="box">
                        <span>收支明细收支</span>
                        <span>收支明细收支</span>
                    </div>
                </div>
            </div>
        );
    }
}

const RecordHoc = CSSModules(Record, styles);

const mapStateToProps = (state: Stores) => ({
    getPayinfo: getPayinfo(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>) => ({
    loadPayinfo: bindActionCreators(loadPayinfo, dispatch),
    showSignModal: bindActionCreators(showSignModal, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RecordHoc);