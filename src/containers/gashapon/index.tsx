import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
// import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Header from '../../components/header_gashapon';
import Modal from './modal';

import { Stores } from '../../types/reducerTypes';

import { 
    
} from '../../types/componentTypes';

import { 

} from '../../actions/main';

import { 

} from '../../reducers/main';

interface Props {
    match: {
        params: {
            id: string;
        }
    };
}

interface State {
    showModal: boolean;
}

/**
 * @returns 
 * @memberof Gashapon
 */
class Gashapon extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            showModal: true
        };
    }

    componentDidMount() {
        const { 
            match
        } = this.props;
        console.log('this.props', match.params.id);
    }

    render() {
        const { } = this.props;
        return (
            <div styleName="container">
                <Header/>
                {this.renderModal()}
                <div styleName="content">
                    <div styleName="name">阿西吧把阿爸爸爸爸阿西吧把阿爸爸</div>
                    <i styleName="collect"/>
                    <i styleName="music"/>
                    <div styleName="store">阿西吧把阿爸爸爸爸阿西吧把阿爸爸</div>
                    <i styleName="show"/>
                    <i styleName="barrage"/>
                    <i styleName="chat"/>

                    <div styleName="main">
                        <div 
                            styleName="gashaponImg"
                            onClick={this.onShowModalHandle}
                        >
                            gashaponImg
                        </div>
                        <i styleName="button1" button-attr="button-attr"/>
                        <i styleName="button2" button-attr="button-attr"/>
                        <i styleName="button3" button-attr="button-attr"/>
                        <i styleName="button4" button-attr="button-attr"/>
                    </div>
                </div>
            </div>
        );
    }

    private onShowModalHandle = (): void => {
        this.setState({
            showModal: true
        });
    }

    private onHideModalHandle = (): void => {
        this.setState({
            showModal: false
        });
    }

    private renderModal = (): JSX.Element => {
        const { showModal } = this.state;
        console.log('showModal', showModal);
        return (
            <Modal 
                display={showModal}
                onHide={this.onHideModalHandle}
            />
        );
    }
}

const GashaponHoc = CSSModules(Gashapon, styles);

const mapStateToProps = (state: Stores) => ({
    
});

const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({

});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GashaponHoc);