import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import history from '../../history';

interface Props {
    title: string;
    nav: string;
}

// class Header extends React.Component<Props, State> {

//     render() {
//         return (
            // <header styleName="container">
            //     <i styleName="gift"/>
            //     <div styleName="money">money</div>
            // </header>
//         );
//     }
// }

const onNavHandle = (param: string): void => {
    // history.push(`/${param}`);
    history.goBack();
};  

const Header = ({title, nav}: Props) => (
    <header styleName="container">
        <i/>
        <span onClick={() => onNavHandle(nav)}>{title}</span>
    </header>
);

const HeaderHoc = CSSModules(Header, styles);

export default HeaderHoc;