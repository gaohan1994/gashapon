let config = {
    isDev: process.env.NODE_ENV === 'production' ? 0 : 1,

    dev: {
        debug: true,
        host: {
            pic: 'qntest.huanmusic.com',
            av: 'qntest.huanmusic.com',
        },
        sms: 'https://sms-dev.huanmusic.com/',
        sns: {
            domain: 'http://sns-dev.huanmusic.com',
            https: 'https://sns-dev.huanmusic.com'
        },
        end: new Date(2017, 7, 13, 10, 0, 0).getTime(),
        keywords: '幻音音乐,源音塘,95后社区,幻音二次元,幻音娘,翻唱,音乐,音乐人,二次元音乐,加入音乐人,源音塘',

        /*从ACT搬运config*/
        web_url: 'https://www-dev.huanmusic.com',
        web_url_http: 'http://www-dev.huanmusic.com',
        empty_pic: {
            // url: 'http://o2xzfohec.qnssl.com/www/img/index/empty-pic.png'
            url: 'http://qntest.huanmusic.com/www/empty.png'
        },
        qnssl_old: 'nzhye65lt.qnssl.com/dt_v1_',
        music_limit: 3,
        list_limit: 3,
        qntoken: 'www-dev.huanmusic.com',
    },

    pro: {
        debug: false,
        host: {
            pic: 'net.huanmusic.com',
            av: 'av.huanmusic.com',
        },
        sms: 'https://sms.huanmusic.com/',
        sns: {
            domain: 'http://sns.huanmusic.com',
            https: 'https://sns.huanmusic.com'
        },
        end: new Date(2017, 7, 13, 10, 0, 0).getTime(),
        keywords: '幻音音乐,源音塘,95后社区,幻音二次元,幻音娘,翻唱,音乐,音乐人,二次元音乐,加入音乐人,源音塘',

        /*从ACT搬运config*/
        web_url: 'https://www.huanmusic.com',
        web_url_http: 'http://www.huanmusic.com',
        
        empty_pic: {
            // url: 'http://o2xzfohec.qnssl.com/www/img/index/empty-pic.png'
            url: 'https://net.huanmusic.com/www/empty.png'
        },
        qnssl_old: 'net.huanmusic.com/t_v1_',
        music_limit: 6,
        list_limit: 8,
        qntoken: 'www.huanmusic.com',
    },
};

export default config.isDev ? config.dev : config.pro;