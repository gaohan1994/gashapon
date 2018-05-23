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
import { Payinfos, Payinfo } from '../../../types/componentTypes';
import * as Moment from 'moment';
import * as numeral from 'numeral';

interface Props {
    loadPayinfo     : ({}: LoadPayinfoParams) => void;
    getPayinfo      : Payinfos;
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

    componentWillUnmount (): void {
        arriveFooter.remove('payinfo');
    }

    public loadPayinfoCallback = (page: number): void => {
        this.setState({page: page + 1});
    }

    render () {

        const { getPayinfo } = this.props;
        
        return (
            <div 
                styleName="container"
                container-with-header="true"
                bg-white="true"
            >
                <Header title="收支明细"/> 
                
                {getPayinfo.length > 0
                ? getPayinfo.map((item: Payinfo, i: number) => {
                    return this.renderItem(item, i);
                })
                : '暂无收支明细'}
            </div>
        );
    }

    private readonly renderItem = (data: Payinfo, i: number): JSX.Element => {

        let desc: string = '';
        let value: JSX.Element = <span/>;

        if (data.type) {
            switch (data.type) {
                case 1:
                    desc = '扭蛋';
                    break;
                case 2:
                    desc = '邮费';
                    break;
                case 3:
                    desc = '充值';
                    break;
                case 4:
                    desc = '变卖';
                    break;
                case 5:
                    desc = '系统回收';
                    break;
                case 6:
                    desc = '线下收益';
                    break;

                default:
                    break;
            }
        }

        if (data.type && data.value) {
            if (data.type === 1 || data.type === 2) {
                value = (<span styleName="money" style={{color: '#7dc3fe'}}>-￥{data.value ? numeral(data.value / 100).format('0') : '0'}</span>);
            } else {
                value = (<span styleName="money" style={{color: '#fba175'}}>+￥{data.value ? numeral(data.value / 100).format('0') : '0'}</span>);
            }
        }

        return (
            <div 
                styleName="item"
                flex-center="all-center"
                key={i}
            >
                <SignModal/>
                <div styleName="border">
                    <div styleName="box">
                        <span styleName="normal">
                            {data.name}
                        </span>
                        <span styleName="small">
                            {desc}
                        </span>
                        <span styleName="small">
                            {data.create_date ? Moment(data.create_date).format('MM月DD日 hh:mm') : ''}
                        </span>
                    </div>
                    <div styleName="boxRight">
                        {value}
                        <span styleName="small">{data._id}</span>
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