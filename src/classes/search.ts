import history from '../history';

interface Param {
    word?: string;
}

export interface DoSearchMethodParam {
    page    ?: number;
    count   ?: number;
}

export interface DoSearchMethodReturn {
    success ?: boolean;
    type    ?: string;
    message ?: string;
    data    ?: object[];
}

class Search {

    private word: string;

    constructor ({ word }: Param) {
       this.word = word ? word : '';
    }

    public doSearchMethod = (): DoSearchMethodReturn | void => {
        try {
            if (!this.word) {
                throw new Error('word错误');
            }
        } catch (err) {
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message
            };
        }

        try {
            history.push(`/gashapons/word/${this.word}`);
        } catch (err) {
            return {
                type: 'GET_WRONG_PARAM',
                message: err.message
            };
        }
    }

    // public doSearchMethod = async ({ page = 0, count = 20 }: DoSearchMethodParam): Promise<DoSearchMethodReturn> => {
    // try {
    //     if (!this.word) {
    //         throw new Error('word错误');
    //     }
    // } catch (err) {
    //     return {
    //         type: 'GET_WRONG_PARAM',
    //         message: err.message
    //     };
    // }

    //     try {
    //         const result = await fetch(`/search/machines/${this.word}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 page: page,
    //                 count: count
    //             })
    //         })
    //         .then(res => res.json());

    //         console.log('result', result);

    //         if (result.success === true) {
    //             return {
    //                 success : true,
    //                 data    : result
    //             };
    //         } else {
    //             return {
    //                 type: 'ERROR_SEARCH',
    //                 message: result.message
    //             };
    //         }
    //     } catch (err) {
    //         return {
    //             type: 'ERROR_SEARCH',
    //             message: err.message
    //         };
    //     }
    // }
}

export default Search;