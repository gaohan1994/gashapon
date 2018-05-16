import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../reducers/type';
import { 
    StatusActions,
    showShareModal,
} from '../../actions/status';
import { discount as discountType } from '../../types/componentTypes';
import * as numeral from 'numeral';
import config from '../../config/index';
import Share from '../../classes/share';
import ShareModal, { ShareType } from '../share';
import history from '../../history';

interface Props {
    discount        : discountType;
    showShareModal  ?: () => void;
}

class Discount extends React.Component <Props, {}> {

    public doShareHandle = (type: ShareType): void => {

        const { discount } = this.props;
        const data = {
            url     : `${config.url}/discount/${discount._id}`,
            title   : discount.title,
            pic     : `http://${config.host.pic}/${discount.image}`,
        };
    
        const share = new Share(data, type);
    
        share.doShare();
    }

    public gotoDiscountHandle = (): void => {
        const { discount } = this.props;
        history.push(`/discount/${discount._id}`);
    }

    render () {
        const { discount, showShareModal } = this.props;
        return (
            <div styleName="container">
                <div 
                    styleName="detail"
                    flex-center="all-center"
                >
                    <ShareModal propsClickHandle={this.doShareHandle}/>
                    <i 
                        styleName="cover"
                        bgimg-center="bgimg-center"
                        onClick={() => this.gotoDiscountHandle()}
                        style={{
                            backgroundImage: discount.image 
                                            ? `url(http://${config.host.pic}/${discount.image})`
                                            : `url(${config.empty_pic.url})`
                        }}
                    />
                    <div styleName="box">
                        <span styleName="name">{discount.title}</span>
                        <div 
                            styleName="progress"
                            style={{backgroundImage: this.renderBgimage(discount)}}
                        >
                            {discount.sum ? discount.sum / 100 : 0}
                            /
                            {discount.max_discount ? discount.max_discount / 100 : 0}
                        </div>
                    </div>
                </div>

                <div styleName="footer">
                    {/* <span 
                        styleName="button" 
                        bgimg-center="100"
                        style={{backgroundImage: `url(http://net.huanmusic.com/gasha/%E5%8F%96%E6%B6%88%E7%A0%8D%E4%BB%B7.png)`}}
                    /> */}
                    <span 
                        styleName="button" 
                        bgimg-center="100"
                        style={{backgroundImage: 'url(http://net.huanmusic.com/gasha/%E5%88%86%E4%BA%AB.png)'}}
                        onClick={showShareModal}
                    />
                </div>
            </div>
        );
    }

    private renderBgimage = (discount: discountType): string => {
        
        const now   = discount && discount.sum ? discount.sum : 0;	
        const total = discount && discount.max_discount ? discount.max_discount : 1;	
            
        const current = (numeral(now / total).value()) * 100;	
        return `linear-gradient(to right, rgb(254, 162, 112) ${current}%, rgba(255, 255, 255) 0%)`;
    }
}

const DiscountHoc = CSSModules(Discount, styles);

const mapStateToProps = (state: Stores) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<StatusActions>) => ({
    showShareModal: bindActionCreators(showShareModal, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DiscountHoc);