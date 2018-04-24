
export interface DoCheckHandleParam {
    _id: string;
}

export interface DoCheckHandleReturn {
    success ?: boolean;
    type    ?: string;
    message ?: string;
}

class Check {

    constructor () {
        //
    }
    
    public readonly doCheckHandle = async ({_id}: DoCheckHandleParam): Promise<DoCheckHandleReturn> => {

        if (!_id) {
            throw new Error('ID错误');
        }

        try {

            const result = await fetch(`/user/checkin/${_id}`).then(res => res.json());

            if (result.success === true) {
                return {
                    success: true
                };
            } else {
                throw new Error(result.message ? result.message : '打卡出错了');
            }
        } catch (err) {
            console.log('doCheckHandle', err);
            return {
                type: 'ERRPR_CHECK',
                message: err.message ? err.message : '打卡错误'
            };
        }
    }
}

export default Check;