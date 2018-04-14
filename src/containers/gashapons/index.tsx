import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import Footer from '../../components/footer';
import GashaItem from '../../components/gashapon_item';
import { arriveFooter } from '../../config/util';

import { Stores } from '../../reducers/type';

import { 
    Gashapons
} from '../../types/componentTypes';

import { 
    loadGashapons,
    loadGashaponsByGenre,
    LoadGashaponsParam,
} from '../../actions/main';

import { 
    getGashapons
} from '../../reducers/main';

interface Props {
    match: {
        params: {
            genre: string;
        }
    };
    getGashapons        : Gashapons;
    loadGashapons       : () => void;
    loadGashaponsByGenre: ({}: LoadGashaponsParam) => void;
}

interface State {
    page: number;
}

/**
 * @returns 
 * @memberof Gashapon
 * 首页
 * render:
 */
class Gashapon extends React.Component<Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            page: 0
        };
    }

    componentDidMount(): void {
        const { page } = this.state;
        const { 
            match,
            loadGashapons,
            loadGashaponsByGenre,
        } = this.props;

        if (!match.params.genre) {
            loadGashapons();
        } else {
            loadGashaponsByGenre({genre: match.params.genre});
        }
        
        arriveFooter.add('gashapons', () => {
            if (!!match.params.genre) {
                loadGashaponsByGenre({genre: match.params.genre, page: page + 1, callback: this.loadGashaponCallback});
            }
        });
    }

    componentWillUnmount(): void {
        arriveFooter.remove('gashapons');
    }

    public loadGashaponCallback = (page: number): void => {
        this.setState({page: page}, () => { console.log(this.state.page) ; } );
    }

    render(): JSX.Element {
        const { getGashapons } = this.props;
        return (
            <div styleName="container">
                {getGashapons.map((item, i) => (
                    <div 
                        key={i}
                        styleName="item"
                    >
                        <GashaItem item={item}/>
                    </div>
                ))}
                <div style={{width: '400px', height: '400px'}}>1</div>
                <div style={{width: '400px', height: '400px'}}>1</div>
                <div style={{width: '400px', height: '400px'}}>1</div>
                <Footer/>
            </div>
        );
    }
}

const GashaponHoc = CSSModules(Gashapon, styles);

export const mapStateToProps = (state: Stores) => ({
    getGashapons: getGashapons(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>, state: Stores) => ({
    loadGashapons       : bindActionCreators(loadGashapons, dispatch),
    loadGashaponsByGenre: bindActionCreators(loadGashaponsByGenre, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GashaponHoc);