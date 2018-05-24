import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import Header from '../../../components/haeder_set';
// import Line from '../../../components/lineItem';

const Faq = ({}): JSX.Element => (
    <div 
        container-with-header="true"
        bg-white="true"
    >
        <Header 
            title="Faq"
        />
        <div styleName="content">
            <span styleName="title" font-s="30">一、关于扭蛋</span>
            <span styleName="desc" font-s="24">Q：商品实物与照片相差较大？</span>
            <span styleName="desc" font-s="24">A：您好，嘀哩扭蛋销售的所有扭蛋商品都是供货商自己拍摄和制作的哦，受灯光以及不同品牌手机分辨率等因素影响与实物之间是可能会存在一些差异哒~，(〃ω〃)希望您遇到这个问题时能理解和支持一下。</span>
            <span styleName="desc" font-s="24">Q：都是正品吗？</span>
            <span styleName="desc" font-s="24">A：您好，嘀哩扭蛋平台销售的所有扭蛋均来自正规商品货源，均为原装正品，请您放八百个心购买(o´ω`o)！</span>

            <span styleName="title" font-s="30">二、关于订单</span>
            <span styleName="desc" font-s="24">Q：怎么下单呢？</span>
            <span styleName="desc" font-s="24">{`A：您好，您可以在推荐页和扭蛋页面里选购自己喜欢的商品，完成扭蛋后可以在您的蛋柜中选择需要下单的商品进行下单，这样就可以完成下单啦~祝您扭蛋愉快(>▽<)！`}</span>
            <span styleName="desc" font-s="24">Q：怎么查看已经下单的订单？</span>
            <span styleName="desc" font-s="24">A：您好，您可以在嘀哩扭蛋个人中心里点击“我的订单”，查看个人订单详情哟。</span>

            <span styleName="desc" font-s="24">Q：下单后长时间没有物流信息怎么办？</span>
            <span styleName="desc" font-s="24">A：您好，下单后长时间未更新物流信息，您可以在个人中心进入“待发货”点击“催单”向商家催单，或联系客服（QQ1763781972）进行催单哦。</span>

            <span styleName="title" font-s="30">三、关于发货和运费</span>
            <span styleName="desc" font-s="24">Q：下单后多久发货？</span>
            <span styleName="desc" font-s="24">A：您好，如下单时间为当日15点前，则当日可发货；如下单时间为当日15点后，则只能安排至次日发货啦。为了获得更好的扭蛋体验，(′▽`〃)建议您于当日15点前购买哟~</span>

            <span styleName="desc" font-s="24">Q：默认使用什么快递？</span><span styleName="desc" font-s="24">Q：商品实物与照片相差较大？</span>
            <span styleName="desc" font-s="24">A：您好，嘀哩扭蛋默认使用中通快递，ᕦ(･ㅂ･)ᕤ欢迎您来下单选购~</span>

            <span styleName="desc" font-s="24">Q：一般下单后多久可以到？</span>
            <span styleName="desc" font-s="24">A：您好，嘀哩扭蛋默认使用中通快递速运，一般下单后3-5日可送达，如遇特殊情况则需以当地实际派送时间为准啦。</span>

            <span styleName="desc" font-s="24">Q：商品包邮吗？</span>
            <span styleName="desc" font-s="24">{`A：您好，一次性下单满9件商品，本单可以免邮哒，不足9件商品，将会从您的个人账户余额中扣除10元邮费哦，祝您扭蛋愉快(>▽<)！`}</span>

            <span styleName="desc" font-s="24">Q：可以实时看到物流信息吗？</span>
            <span styleName="desc" font-s="24">{`A：您好，您可以在嘀哩扭蛋个人中心查看我的订单，点击查看物流，即可获得实时快递物流信息，祝您扭蛋愉快(>▽<)!`}</span>

            <span styleName="title" font-s="30">四、关于退换货</span>

            <span styleName="desc" font-s="24">Q：下单收货后发现商品不喜欢，可以退货吗？</span>
            <span styleName="desc" font-s="24">{`A：您好，感谢您使用嘀哩扭蛋，因扭蛋商品特殊，蛋壳破坏后是无法进行二次销售哒，故暂不支持此类情况退货呢，请您谨慎下单哦。祝您扭蛋愉快(>▽<)！`}</span>

            <span styleName="desc" font-s="24">Q：下单收货后发现商品与实际下单中的商品不符，可以退货吗？</span>
            <span styleName="desc" font-s="24">A：您好，如因发货商失误错发商品，请您及时与客服（QQ1763781972）取得联系并提供照片、视频和订单截图等佐证，确认无误后请将商品寄回，平台将尽快给您重新发货，此类情况所有产生的费用由平台承担。</span>

            <span styleName="desc" font-s="24">Q：下单收货后发现商品损坏，可以退货吗？</span>
            <span styleName="desc" font-s="24">A：您好，因扭蛋商品特殊，蛋壳一经破坏是无法进行二次销售哒，请您务必在拆开时留下视频，如确为商品本身存在损坏，与客服（QQ1763781972）
            联系确认无误后请将商品寄回，平台将尽快给您重新发货，此类情况所有产生的费用由平台承担。</span>

            <span styleName="desc" font-s="24">Q：什么情况可以退换货呢？</span>
            <span styleName="desc" font-s="24">A：您好，因扭蛋商品特殊，蛋壳一经破坏是无法进行再次销售哒，原则上是不支持退换货的，但特殊情况如：发货商错发商品、商品开壳前已经损坏等，在保留充分佐证情况下，与客服（QQ1763781972）
            确认无误后，是可退换货处理哒，其他情况就概不受理了哦，请您谨慎下单啦 Ծ‸Ծ！</span>

            <span styleName="title" font-s="30">五、关于支付和账户余额</span>

            <span styleName="desc" font-s="24">Q：平台支持那种支付方式？</span>
            <span styleName="desc" font-s="24">{`A：您好，嘀哩扭蛋支持多种支付方式，如：支付宝、微信、QQ钱包等，您可以选择适合自己的方式来进行支付~，祝您扭蛋愉快(>▽<)！`}</span>

            <span styleName="desc" font-s="24">Q：账户余额长期不使用会清零吗？</span>
            <span styleName="desc" font-s="24">A：您好，个人账户余额属于用户个人资产，平台方是不会以任何形式、任何方式、任何理由扣除您的个人账户余额哒，请您放心使用~。</span>

            <span styleName="desc" font-s="24">Q：因错发商品或商品损坏造成的损失，如何补偿？</span>
            <span styleName="desc" font-s="24">{`A：您好，如因错发商品或商品损坏造成退货，经审核无误后，将于三个工作日将款项及运费转至您的个人账户余额哦，并赠送满减券，祝您扭蛋愉快(>▽<)！`}</span>

            <span styleName="title" font-s="30">六、关于收藏</span>

            <span styleName="desc" font-s="24">Q：商品可以收藏吗？哪里查看？</span>
            <span styleName="desc" font-s="24">{`A：您好，嘀哩扭蛋每一个上架的商品，您均可以按个人喜好进行收藏~，所收藏的商品您可以进入个人中心点击“收藏”查看。如您收藏的商品已下架，可以在“收藏”已下架中查看哦。~，祝您扭蛋愉快(>▽<)！`}</span>

            <span styleName="title" font-s="30">七、关于砍价</span>

            <span styleName="desc" font-s="24">Q：什么是砍价？如何发起砍价？</span>
            <span styleName="desc" font-s="24">A：您好，嘀哩扭蛋平台每天都会有部分商品加入砍价活动哟，您可以选择砍价商品，
            进入扭一扭页面后，点击砍价并通过微信等方式邀请您的好友进行砍价（好友每次帮砍的价格是随机的），砍价成功后，您就可以对该商品进行优惠购买啦 ( ˊ ˅ ˋ )。</span>

            <span styleName="desc" font-s="24">Q：可以发起多少次砍价？</span>
            <span styleName="desc" font-s="24">A：您好，单个商品一个用户当天只能发起一次砍价行为哒，且砍价减免金额当日内使用有效，超期作废，(..›ᴗ‹..)所以请您尽快使用哦~。</span>

            <span styleName="title" font-s="30">八、关于优惠券</span>

            <span styleName="desc" font-s="24">Q：优惠券如何获得？</span>
            <span styleName="desc" font-s="24">A：您好，您可以点击签到，完成连续签到后就可获得优惠券啦~，此外，o(｀ω´ )o每提升一个VIP等级均可以获得价值、数量不等的优惠券。后期嘀哩扭蛋平台将陆续开放活动优惠券抢购等活动，敬请期待(′▽`〃)！</span>

            <span styleName="desc" font-s="24">Q：优惠券如何使用？</span>
            <span styleName="desc" font-s="24">A：您好，您所有获得优惠券可以在个人中心的“优惠券”中查看哒，在您单次扭蛋时金额达到，系统将会自动提示您是否要使用优惠券进行抵扣~。</span>

        </div>
    </div>
);

const FaqHoc = CSSModules(Faq, styles);

export default FaqHoc;