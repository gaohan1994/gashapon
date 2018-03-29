import * as React from 'react';
import {
    Route,
    Switch,
    
} from 'react-router-dom';

import Main from './containers/main';
import Gashapon from './containers/gashapon';
import Inventory from './containers/inventory';
import NoMatch from './containers/nomatch';
import My from './containers/my';

const routes = (
    <Switch>
        <Route path="/"             exact={true} component={Main}/>
        <Route path="/gashapon"     component={Gashapon}/>
        <Route path="/inventory"    component={Inventory}/>
        <Route path="/my"           component={My}/>
        
        <Route component={NoMatch}/>
    </Switch>
);

export default routes;