import { WrapImagesType } from './componentTypes';

export interface Stores {
    main: Main;
}

export type Main = {
    playlist: Array<Object>;
    tribe   : Array<Object>;
    images  : WrapImagesType;
    musics  : Object;
};
