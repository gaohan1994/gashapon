import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect, Dispatch } from 'react-redux';
import { Stores } from '../../../reducers/type';
import Header from '../../../components/haeder_set';

interface Props {

}

class Record extends React.Component<Props, {}> {

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

});

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RecordHoc);