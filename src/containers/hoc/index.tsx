import * as React from 'react';
import * as Proptypes from 'prop-types';
import Meta from 'react-document-meta';

interface Props {

}

interface State {
    title: string;
}

/**
 * @returns 
 * @memberof Hoc
 */
class Hoc extends React.Component<Props, State> {

    static childContextTypes = {
        setMeta: Proptypes.func
    };

    getChildContext() {
        return {
            setMeta: this.setMeta
        };
    }

    constructor (props: Props) {
        super(props);
        this.state = {
            title: '幻音音乐'
        };
    }

    render() {
        const { title } = this.state;
        const meta = {
            title: title
        };
        return (
            <Meta {...meta}>
                {this.props.children}
            </Meta>
        );
    }

    private setMeta = (title: string): void => {
        this.setState({
            title: title
        });
    }
}

export default Hoc;