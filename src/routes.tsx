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
import OrderDetail from './containers/order/detail';
import Success from './containers/success';
import Collect from './containers/collect';
import Achievements from './containers/achievements';
import Coupons from './containers/coupons';
import UserPhone from './containers/set/phone';
import Check from './containers/check';
import ChangeUserName from './containers/set/name';
import MakeOriders from './containers/inventory/makeorders';
import Sale from './containers/inventory/sale';
import Forget from './containers/sign/forget';
import Discount from './containers/discount';
import Record from './containers/pay/record';
import DiscountHome from './containers/discount_home';
import Address from './containers/address';
import AddAddress from './containers/address/add';
import Show from './containers/show';
import Profit from './containers/profit';
import Vip from './containers/vip';
import Payment from './containers/payment';
import Location from './containers/location';
import Faq from './containers/about/faq';
import Download from './containers/download';

const routes = (
    <Switch>
        <Route path="/" exact={true}            component={Main}/>
        <Route path="/iframe"                   component={Main}/>
        <Route path="/gashapon/:id"             component={Gashapon}/>
        <Route path="/gashapons/word/:word"     component={Gashapons}/>
        <Route path="/gashapons/topic/:topic"   component={Gashapons}/>
        <Route path="/gashapons/:genre/:price"  component={Gashapons}/>
        <Route path="/gashapons/:genre"         component={Gashapons}/>
        <Route path="/gashapons"                component={Gashapons}/>
        <Route path="/inventory/genre/:genre"   component={Inventory}/>
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
        <Route path="/orderdetail"              component={OrderDetail}/>
        <Route path="/success"                  component={Success}/>
        <Route path="/collect"                  component={Collect}/>
        <Route path="/achievements"             component={Achievements}/>
        <Route path="/coupons/:type"            component={Coupons}/>
        <Route path="/coupons"                  component={Coupons}/>
        <Route path="/userphone"                component={UserPhone}/>
        <Route path="/check"                    component={Check}/>
        <Route path="/changeusername"           component={ChangeUserName}/>
        <Route path="/makeorders"               component={MakeOriders}/>
        <Route path="/sale"                     component={Sale}/>
        <Route path="/discount/:id"             component={Discount}/>
        <Route path="/forget"                   component={Forget}/>
        <Route path="/record"                   component={Record}/>
        <Route path="/discounthome"             component={DiscountHome}/>
        <Route path="/address"                  component={Address}/>
        <Route path="/addaddress"               component={AddAddress}/>
        <Route path="/show/:id"                 component={Show}/>
        <Route path="/profit"                   component={Profit}/>
        <Route path="/vip"                      component={Vip}/>
        <Route path="/payment"                  component={Payment}/>
        <Route path="/location/:id/:comid"      component={Location}/>
        <Route path="/faq"                      component={Faq}/>
        <Route path="/download"                 component={Download}/>

        <Route component={NoMatch}/>
    </Switch>
);

export default routes;