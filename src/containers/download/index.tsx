import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { 
    // isMobile
    // isIos
} from '../../config/util';
import config from '../../config/index';

class Download extends React.Component <{}, {}> {

    constructor (props: {}) {
        super(props);
        this.onAndroidClickHandle   = this.onAndroidClickHandle.bind(this);
        this.onIosClickHandle       = this.onIosClickHandle.bind(this);
    }

    public onAndroidClickHandle = () => {
        window.open(`//net.huanmusic.com/assets/js/dgacha_v1.2_hy.apk`, '_blank');
    }

    public onIosClickHandle = () => {
        window.location.href = `${config.downloadUrl}`;
    }
    
    render (): React.ReactNode {
        return (
            <div 
                styleName="container" 
                bgimg-center="100"
            >
                
                <div 
                    styleName="button"
                    bgimg-center="100"
                    onClick={() => this.onAndroidClickHandle()}
                />
                {/* <div onClick={() => this.onIosClickHandle()}>iod</div> */}
            </div>
        );
    }
}

const DownloadHoc = CSSModules(Download, styles);

export default DownloadHoc;