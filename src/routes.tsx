import * as React from 'react';
import {
    Route,
    Switch,
    
} from 'react-router-dom';

import Main from './containers/main';
import Gashapons from './containers/gashapons';
import Inventory from './containers/inventory';
import NoMatch from './containers/nomatch';
import My from './containers/my';
import Setting from './containers/set';
import Account from './containers/set/account';
import About from './containers/about';
import Help from './containers/about/help';
import Pay from './containers/pay';
import Gashapon from './containers/gashapon';
import Order from './containers/order';
import Success from './containers/success';
import Collect from './containers/collect';
import Achievements from './containers/achievements';
import Coupons from './containers/coupons';
import UserPhone from './containers/set/phone';
import Check from './containers/check';
import ChangeUserName from './containers/set/name';
import MakeOriders from './containers/inventory/makeorders';
// import Login from './containers/sign/login';
// import Registe from './containers/sign/registe';
import Discount from './containers/discount';

const routes = (
    <Switch>
        <Route path="/" exact={true}            component={Main}/>
        <Route path="/gashapon/:id"             component={Gashapon}/>
        <Route path="/gashapons/word/:word"     component={Gashapons}/>
        <Route path="/gashapons/topic/:topic"   component={Gashapons}/>
        <Route path="/gashapons/:genre/:price"  component={Gashapons}/>
        <Route path="/gashapons/:genre"         component={Gashapons}/>
        <Route path="/gashapons"                component={Gashapons}/>
        <Route path="/inventory/word/:word"     component={Inventory}/>
        <Route path="/inventory"                component={Inventory}/>
        <Route path="/my"                       component={My}/>
        <Route path="/set"                      component={Setting}/>
        <Route path="/account"                  component={Account}/>
        <Route path="/about"                    component={About}/>
        <Route path="/about"                    component={About}/>
        <Route path="/help"                     component={Help}/>
        <Route path="/pay"                      component={Pay}/>
        <Route path="/order/:type"              component={Order}/>
        <Route path="/order"                    component={Order}/>
        <Route path="/success"                  component={Success}/>
        <Route path="/collect"                  component={Collect}/>
        <Route path="/achievements"             component={Achievements}/>
        <Route path="/coupons"                  component={Coupons}/>
        <Route path="/userphone"                component={UserPhone}/>
        <Route path="/check"                    component={Check}/>
        <Route path="/changeusername"           component={ChangeUserName}/>
        <Route path="/makeorders"               component={MakeOriders}/>
        {/*
        <Route path="/login"                    component={Login}/>
        <Route path="/registe/:refereeid"       component={Registe}/>
        <Route path="/registe"                  component={Registe}/>
        */}
        <Route path="/discount/:id"             component={Discount}/>

        <Route component={NoMatch}/>
    </Switch>
);

export default routes;