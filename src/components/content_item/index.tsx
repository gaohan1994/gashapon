import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import history from '../../history';

/*
    1 扭蛋机
    2 分类
    3 专题
*/
interface Props {
    content: {
        type    : number;
        pic     : string;
        name    : string;
        param   : string; 
    };
    propsClickHandle?: () => void;
}

interface State {

}

class Item extends React.Component<Props, State> {

    public onClickHandle = () => {
        const { content } = this.props;

        switch (content.type) {
            case 1:
                history.push(`/gashapon/${content.param}`);
                return;

            case 2:
                history.push(`/gashapons/${content.param}`);
                return;

            case 3:
                history.push(`/gashapons/topic/${content.param}`);
                return;

            default: return;
        }
    }

    render() {
        const { content, propsClickHandle } = this.props;
        
        return (
            <div 
                onClick={propsClickHandle ? propsClickHandle : () => this.onClickHandle()}
                styleName="hotItem"
                style={{backgroundImage: content.pic 
                    ? `url(//${config.host.pic}/${content.pic})`
                    : `url(${config.empty_pic})`}}
            >
                <span styleName="name">{content.name}</span>
            </div>
        );
    }
}

const ItemHoc = CSSModules(Item, styles);

export default ItemHoc;