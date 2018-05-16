import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect, Dispatch } from 'react-redux';
import { Stores } from '../../reducers/type';
import { bindActionCreators } from 'redux';
import { 
    BusinessActions,
    loadPackageLocation,
} from '../../actions/business';
import { getLocation } from '../../reducers/business';
import Header from '../../components/haeder_set';
import { LocationType } from '../../types/componentTypes';
import * as moment from 'moment';

export interface Props {
    match: {
        params: {
            id: string;
        }
    };
    loadPackageLocation : (id: string) => void;
    getLocation         : LocationType;
}

export interface State {

}

class Location extends React.Component <Props, State> {

    componentDidMount (): void {

        const { match, loadPackageLocation } = this.props;

        if (match.params && match.params.id) {
            loadPackageLocation(match.params.id);
        }
    }
    
    render (): JSX.Element {

        const { getLocation } = this.props;
        console.log('getLocation', getLocation);
        return (
            <div 
                container-with-header="true"
            >
                <Header title="物流信息"/>
                <div styleName="header">
                    <span styleName="title">{getLocation.com}</span>
                    <span styleName="desc">运单号：{getLocation.number}</span>
                </div>
                
                {this.renderItems()}
            </div>
        );
    }

    private renderItems = (): JSX.Element | string => {

        const { getLocation } = this.props;
        if (getLocation && getLocation.traces) {
            return (
                <div>
                    {getLocation.traces.map((item, i) => {
                        return (
                            <div 
                                key={i}
                                styleName="item"
                                flex-center="all-center"
                            >
                                <div 
                                    styleName="time"
                                    flex-center="all-center"
                                >
                                    <i 
                                        styleName="icon"
                                        style={{
                                            backgroundColor: i === getLocation.traces.length - 1
                                                            ? '#fea270'
                                                            : '#dddddd'
                                        }}
                                    />
                                    <span>
                                        {item.time
                                        ? moment(item.time).format('MM-DD')
                                        : ''}
                                    </span>
                                    <span>
                                        {item.time
                                        ? moment(item.time).format('hh:mm')
                                        : ''}
                                    </span>
                                </div>
                                <div styleName="content">
                                    <span>{item.desc}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        } else {
            return '';
        }
    }
}

const LocationHoc = CSSModules(Location, styles);

export const mapStateToProps = (state: Stores) => ({
    getLocation: getLocation(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<BusinessActions>, state: Stores) => ({
    loadPackageLocation: bindActionCreators(loadPackageLocation, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LocationHoc);