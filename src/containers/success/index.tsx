import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';

interface Props {

}

interface State {
    time: number;
}

class Success extends React.Component<Props, State> {

    private timer: any;

    constructor (props: Props) {
        super(props);
        this.state = {
            time: 3
        };
    }

    componentDidMount() {
        
        setInterval(() => {
            this.setState({ time: this.state.time - 1 }); 
        }, 1000);

        this.timer = setTimeout(() => { 
            history.push('/'); 
        }, 3000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render () {
        const { time } = this.state;
        return (
            <div 
                styleName="container"
                onClick={this.onClickHandle}
            >
                {`下单成功${time}秒之后返回主页~`}
            </div>
        );
    }

    private onClickHandle = (): void => {
        history.push('/');
    }
}

const SuccessHoc = CSSModules(Success, styles);

export default SuccessHoc;