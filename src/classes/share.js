
const _default = {
    url         : 'http://gacha-dev.hy233.tv',
    title       : '嘀哩扭蛋',
    description : '嘀哩扭蛋',
    pic         : ''
};

class Share {

    constructor (data, type, accessToken) {
        this.url         = data.url             || _default.url;
        this.title       = data.title           || _default.title;
        this.description = data.description     || _default.description;
        this.pic         = data.pic             || _default.pic;
        this.type        = type;
        this.accessToken = accessToken;

        this.doShare     = this.doShare.bind(this);
    }

    doShare () {

        if (!this.accessToken) {
            return false;
        }

        mobShare.config({
            debug: true, // 开启调试，将在浏览器的控制台输出调试信息
            appkey: '227cacf4a7474', // appkey
            
            /**
            * @param {String} plat 平台名称
            * @param {Object} params 实际分享的参数 { url: 链接, title: 标题, description: 内容, pic: 图片连接 }
            */

            params: {
                url         : this.url, // 分享链接
                title       : this.title, // 分享标题
                description : this.description, // 分享内容
                pic         : this.pic, // 分享图片，使用逗号,隔开
            }
        });

        const share = mobShare(`${this.type}`);
        share.send();
    }
}

export default Share;