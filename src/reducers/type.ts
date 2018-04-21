import { Main } from './main/type';
import { Gashapon } from './gashapon/type';
import { Inventory } from './inventory/type';
import { Business } from './business/type';
import { Home } from './home/type';
import { Status } from './status/type';
import { Coupons } from './coupons/type';

export interface Stores {
    main        : Main;
    gashapon    : Gashapon;
    inventory   : Inventory;
    business    : Business;
    home        : Home;
    status      : Status;
    coupons     : Coupons;
}
