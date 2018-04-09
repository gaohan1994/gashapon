import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
// import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Footer from '../../components/footer';

import { Stores } from '../../reducers/type';

import { 
    
} from '../../types/componentTypes';

import { 

} from '../../actions/main';

import { 

} from '../../reducers/main';

export interface Props {
    
}

export interface State {
    
}

/**
 * @returns 
 * @memberof Inventory
 * 蛋柜
 * render:
 */
class Inventory extends React.Component<Props, State> {

    componentDidMount() {
        const { 

        } = this.props;
    }

    render() {
        const { } = this.props;
        return (
            <div styleName="container">
                <Footer/>
            </div>
        );
    }

}

const InventoryHoc = CSSModules(Inventory, styles);

export const mapStateToProps = (state: Stores) => ({

});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({

});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(InventoryHoc);