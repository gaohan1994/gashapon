import { combineReducers } from 'redux';
import main from './main/index';
import gashapon from './gashapon/index';
import inventory from './inventory/index';
import business from './business/index';
import home from './home/index';
import status from './status/index';
import coupons from './coupons/index';
import check from './check/index';
import discount from './discount/index';

export default combineReducers({
    main        : main,
    gashapon    : gashapon,
    inventory   : inventory,
    business    : business,
    home        : home,
    status      : status,
    coupons     : coupons,
    check       : check,
    discount    : discount,
});