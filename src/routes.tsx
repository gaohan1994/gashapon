import * as React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';

import Main from './containers/main';

const routes = (
    <Switch>
        <Route path="/"     exact={true} component={Main}/>
    </Switch>
);

export default routes;