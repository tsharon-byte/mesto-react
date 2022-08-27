import {memo} from "react";
import Logo from "../images/logo.svg";

const Header = memo(() => (
    <header className="header">
        <img className="header__logo" src={Logo} alt="Логотип"/>
    </header>));
export default Header;