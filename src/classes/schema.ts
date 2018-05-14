import { browser } from '../config/util';

const ua = window.navigator.userAgent;

// 是否为Android下的chrome浏览器，排除mobileQQ；
// Android下的chrome，需要通过特殊的intent 来唤醒
// refer link：https://developer.chrome.com/multidevice/android/intents
const isAndroidChrome = (ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/))
                        && browser.isAndroid() && !browser.isMobileQQ();

const defaultConfig = {

    // 协议头
    PROTOCAL: 'xxxx',

    // 主页
    SCHEMA: 'xxxx',

    // 唤起失败时的跳转链接
    FAILBACK: {
        ANDROID : 'http://www.huanmusic.com/download.html' + window.location.search,
        IOS     : 'http://www.huanmusic.com/download.html' + window.location.search
    },

    // Android apk 相关信息
    APK_INFO: {
        PKG     : 'cn.xx.xx',
        CATEGORY: 'android.intent.category.DEFAULT',
        ACTION  : 'android.intent.action.VIEW'
    },

    // 唤起超时时间，超时则跳转到下载页面
    LOAD_WAITING: 3000
};

export interface SchemaConfig {
    protocal    ?: string;
    schema      ?: string;
    loadWaiting ?: number;
    failUrl     ?: {
        android : string;
        ios     : string;
    };
    apkInfo     ?: {
        PKG     : string;
        CATEGORY: string;
        ACTION  : string;
    };
}

class Schema {

    private schema: SchemaConfig;

    constructor (config: SchemaConfig) {

        this.init(config);
    }

    /**
     * [loadSchema 唤醒native App，如果无法唤醒，则跳转到下载页]
     * @return {[type]} [description]
     */
    public loadSchema = (): void => {

        let schemaUrl = this.generateSchema();

        let iframe    = document.createElement('iframe'),
            aLink     = document.createElement('a'),
            body      = document.body,
            loadTimer: any = null;

        // 隐藏iframe及a
        aLink.style.cssText = iframe.style.cssText = 'display:none;width:0px;height:0px;';

        // Android 微信不支持schema唤醒，必须提前加入腾讯的白名单
        if (browser.isWx() && browser.isAndroid()) {

            // window.location.href = AppConfig.FAILBACK.ANDROID;

            // ios 9 safari 不支持iframe的方式跳转
        } else if (browser.isIOS()) {

            if (browser.isWx()) {
                // window.location.href = AppConfig.FAILBACK.IOS;
            } else {
                aLink.href = schemaUrl;
                body.appendChild(aLink);
                aLink.click();
            }

            // Android chrome 不支持iframe 方式唤醒
            // 适用：chrome,leibao,mibrowser,opera,360
        } else if (isAndroidChrome) {

            aLink.href = schemaUrl;
            body.appendChild(aLink);
            aLink.click();

            // 其他浏览器
            // 适用：UC,sogou,firefox,mobileQQ
        } else {

            body.appendChild(iframe);
            iframe.src = schemaUrl;
        }
            
        loadTimer = null;

        // 当本地app被唤起，则页面会隐藏掉，就会触发pagehide与visibilitychange事件
        // 在部分浏览器中可行，网上提供方案，作hack处理
        var visibilitychange = function() {
            var tag = document.hidden;
            if (!!tag) {
                clearTimeout(loadTimer);
            }
        };
        document.addEventListener('visibilitychange', visibilitychange, false);
        document.addEventListener('webkitvisibilitychange', visibilitychange, false);
        // pagehide 必须绑定到window
        window.addEventListener('pagehide', function() { clearTimeout(loadTimer); }, false);
    }

    public generateSchema = (): string => {

        const   schemaStr = this.schema.protocal + '://' + this.schema.schema;

        return schemaStr;
    }

    private init = (config: SchemaConfig): void => {
        this.schema = {
            protocal    : config.protocal       ? config.protocal : defaultConfig.PROTOCAL,
            schema      : config.schema         ? config.schema : defaultConfig.SCHEMA,
            loadWaiting : config.loadWaiting    ? config.loadWaiting : defaultConfig.LOAD_WAITING,
            failUrl     : {
                ios: browser.isIOS() === true 
                    ? config.failUrl ? config.failUrl.ios : defaultConfig.FAILBACK.IOS
                    : '',
                android: browser.isAndroid() === true
                    ? config.failUrl ? config.failUrl.android : defaultConfig.FAILBACK.ANDROID
                    : ''
            },
            apkInfo     : config.apkInfo ? config.apkInfo : defaultConfig.APK_INFO
        };
    }
    
}

export default Schema;