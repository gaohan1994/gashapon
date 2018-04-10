import { Main } from './main/type';
import { Gashapon } from './gashapon/type';
import { Inventory } from './inventory/type';

export interface Stores {
    main        : Main;
    gashapon    : Gashapon;
    inventory   : Inventory;
}
