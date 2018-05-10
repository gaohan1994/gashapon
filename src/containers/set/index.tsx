import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
// import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Header from '../../components/haeder_set';
import Line from '../../components/lineItem';
import { Stores } from '../../reducers/type';
import { WrapImagesType } from '../../types/componentTypes';

export interface Props {
    getWrapImages   : WrapImagesType;
    loadMainImages  : () => void;
    children        : any;
}

export interface State {
    
}

/**
 * @returns 
 * @memberof NoMatch
 * 首页
 * render:
 */
class Setting extends React.Component<Props, State> {

    componentDidMount() {
        const { 

        } = this.props;
    }

    render() {
        const { } = this.props;
        return (
            <div styleName="container">
                <Header 
                    title="设置"
                />
                <Line 
                    value="账号"
                    param="account"
                />
                <Line 
                    value="关于完蛋趣"
                    param="about"
                />
            </div>
        );
    }

}

const SettingHoc = CSSModules(Setting, styles);

export const mapStateToProps = (state: Stores) => ({

});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SettingHoc);