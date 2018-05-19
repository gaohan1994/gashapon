
export interface configParam {
    debug: boolean;
    appkey: string;

    params?: {
        url         : string;
        title       : string
        description : string
        pic         : string
    }
}

export interface MobShareClass {
    send: () => void;
}

declare global {

    namespace mobShare {
        function config({}: configParam): void;
    }

    function mobShare (type?: string): MobShareClass;
} 
