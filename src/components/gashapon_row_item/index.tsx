import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import Text from '../text';
import { Gashapon } from '../../types/componentTypes';
import * as moment from 'moment';
import history from '../../history';

interface Props {
    gashapon: Gashapon;
}

interface State {}

/**
 * 扭蛋行组件
 * 
 * @class Product
 * @extends {React.Component<Props, State>}
 */
class GashaponRow extends React.Component<Props, State> {

    public goGashaponHandle = (_id: string): void => {
        history.push(`/gashapon/${_id}`);
    }

    render() {
        const { gashapon } = this.props;
        return (
            <div styleName="container">
                <div 
                    bgimg-center="bgimg-center"
                    styleName="cover"
                    style={{
                        backgroundImage: gashapon.pics && gashapon.pics[0]
                                        ? `url(//${config.host.pic}/${gashapon.pics[0]})`
                                        : `url(${config.empty_pic.url})`
                    }}
                />
                <div styleName="detail">
                    <Text value={gashapon.name}/>
                    {this.renderTime()}
                    <Text value={`￥${gashapon.price}`}/>
                </div>

                <div styleName="footer">
                    <div styleName="button" onClick={() => this.goGashaponHandle(gashapon._id)}>扭蛋</div>
                    <div styleName="button">...</div>
                </div>
            </div>
        );
    }

    private renderTime = (): JSX.Element => {
        const { gashapon } = this.props;
        return (
            <span 
                styleName="time"
                text-font-weight="normal"
            >
                开售时间：{moment(gashapon.start_time).format('YYYY-MM-DD')}
            </span>
        );
    }
}

const GashaponRowHoc = CSSModules(GashaponRow, styles);

export default GashaponRowHoc;