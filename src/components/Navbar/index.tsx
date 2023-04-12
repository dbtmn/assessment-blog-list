import React from "react";
import { Routes } from "../../constants/Routes";
import { Link, useLocation } from "react-router-dom";

import "./index.scss";

interface NavbarProps {
    onLinkClick: (route: string) => void;
}

const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
    const location = useLocation();
    const { onLinkClick } = props;

    const getClassName = (route: Routes) => {
        const isActivePage = route === location.pathname;

        return `navbar__link${isActivePage ? "--active" : ""}`;
    }

    const handleClick = (route: string) => {
        onLinkClick(route);
    }

    return <nav className="navbar__wrapper">
        <ul>
            <li>
                <Link className={getClassName(Routes.HOME)} to={Routes.HOME} onClick={() => handleClick(Routes.HOME)}>Home</Link>
            </li>
            <li>
                <Link className={getClassName(Routes.BLOG)} to={Routes.BLOG} onClick={() => handleClick(Routes.BLOG)}>Blog</Link>
            </li>
        </ul>
    </nav>
};

export default Navbar;