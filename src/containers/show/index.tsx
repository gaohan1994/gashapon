import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
// import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import { Stores } from '../../reducers/type';
import history from '../../history';

export interface Props {
    match: {
        params: {
            id: string;
        }
    };
}

export interface State {

}

class Show extends React.Component<Props, State> {

    componentDidMount (): void {
        const { match } = this.props;

        if (!match.params.id) {
            history.push('/');
        } else {
            /* load data by id */
        }
    }

    public onBackHandle = (): void => {
        history.goBack();
    }

    render() {
        return (
            <section
                styleName="container"
                bgimg-center="100"
            >
                <i 
                    styleName="back"
                    bgimg-center="100"
                    onClick={() => this.onBackHandle()}
                />
                <i 
                    styleName="logo"
                    bgimg-center="100"
                />
                {this.renderContent()}
                {this.renderFooter()}
            </section>
        );
    }

    private renderContent = (): JSX.Element => {
        return (
            <div styleName="content">
                {this.renderItem()}
            </div>
        );
    }

    private renderItem = (): JSX.Element => {
        return (
            <div styleName="item">
                item
            </div>
        );
    }

    private renderFooter = (): JSX.Element => {
        return (
            <div 
                styleName="footer"
                bgimg-center="100"
                flex-center="all-center"
            >
                <span 
                    styleName="button"
                    bgimg-center="100"
                />
            </div>
        );
    }
}

const ShowHoc = CSSModules(Show, styles);

export const mapStateToProps = (state: Stores) => ({
    
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ShowHoc);