import history from '../history';

export interface NormalReturnObject {
    success ?: boolean;
    type    ?: string;
    message ?: string;
}

class Base {

    public onNavHandle = (type: number, param: string): void => {
        switch (type) {
            case 1:
                history.push(`/gashapon/${param}`);
                return;

            case 2:
                history.push(`/gashapons/${param}`);
                return;

            case 3:
                history.push(`/gashapons/topic/${param}`);
                return;

            default:
                return;
        }
    }
}

export default new Base();