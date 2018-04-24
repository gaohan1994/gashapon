import * as React from 'react';
import Phone from '../../components/phonemodal';

/**
 * 公共组件
 * 
 * @class Common
 * @extends {React.Component<{}, {}>}
 */
class Common extends React.Component <{}, {}> {
    render () {
        return (
            <div>
                <Phone/>
            </div>
        );
    }
}

export default Common;