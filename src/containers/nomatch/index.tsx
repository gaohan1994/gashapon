import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

import { 

} from '../../types/componentTypes';

import { 

} from '../../actions/main';

import { 

} from '../../reducers/main';

const NoMatch = ({}): JSX.Element => (
    <div styleName="container">
        404
    </div>
);

const NoMatchHoc = CSSModules(NoMatch, styles);

export default NoMatchHoc;