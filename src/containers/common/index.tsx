import * as React from 'react';
import Phone from '../../components/phonemodal';

/**
 * can not work
 */
class Common extends React.Component <{}, {}> {
    render () {
        console.log('ok');
        return (
            <div>
                <Phone/>
            </div>
        );
    }
}

export default Common;