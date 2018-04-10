import { combineReducers } from 'redux';
import main from './main/index';
import gashapon from './gashapon/index';
import inventory from './inventory/index';

export default combineReducers({
    main        : main,
    gashapon    : gashapon,
    inventory   : inventory,
});