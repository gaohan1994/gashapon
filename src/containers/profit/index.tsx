import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import * as Numeral from 'numeral';
import history from '../../history';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    BusinessActions,
    loadIncomeRecord,
} from '../../actions/business';
import { getIncome } from '../../reducers/business';
import User from '../../classes/user';

interface Props {
    loadIncomeRecord: (uid: string) => void;
    getIncome       : {result?: number};
}

class Profit extends React.Component <Props, {}> {

    componentDidMount() {
        const { loadIncomeRecord } = this.props;
        const user = User.getUser();
        if (!user.uid) {
            history.push('/my');
        } else {
            loadIncomeRecord(user.uid);
        }
    }

    public onBackHandle = (): void => {
        history.goBack();
    }

    public onNavHandle = (param: string): void => {
        history.push(`/${param}`);
    }

    render (): JSX.Element {
        const { getIncome } = this.props;
        return (
            <div styleName="container">
                <div 
                    styleName="back"
                    onClick={() => this.onBackHandle()}
                >
                    <i 
                        styleName="backicon" 
                        bgimg-center="100"
                    />
                    <span styleName="backtext">我的收益</span>
                </div>

                <div 
                    styleName="money"
                    flex-center="all-center"
                    bgimg-center="100"
                >   
                    <span font-s="24" styleName="moneytext">收益金额</span>
                    {typeof getIncome.result === 'number'
                    ? <span styleName="value">￥{Numeral(getIncome.result / 100).format('0.00')}</span>
                    : <span styleName="value">暂无收益</span>}
                </div>

                <div styleName="set">
                    <div 
                        styleName="setItem"
                        onClick={() => this.onNavHandle('record')}
                    >
                        <i
                            styleName="setIcon"
                            bgimg-center="100"
                            style={{backgroundImage: 'url(http://net.huanmusic.com/gasha/%E4%BD%99%E9%A2%9D.png)'}}
                        />
                        <span styleName="setText">收支明细</span>
                    </div>
                </div>
            </div>
        );
    }
}

const ProfitHoc = CSSModules(Profit, styles);

const mapStateToProps = (state: Stores) => ({
    getIncome: getIncome(state),
});

const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>) => ({
    loadIncomeRecord: bindActionCreators(loadIncomeRecord, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProfitHoc);