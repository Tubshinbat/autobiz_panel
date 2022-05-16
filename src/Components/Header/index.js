import React, { useEffect } from "react";
import css from "./__.module.css";
import { useCookies } from "react-cookie";

import myBase from "../../base";

const Header = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/" className="nav-link">
            Удирдах самбар
          </a>
        </li>
      </ul>
      <ul className={`navbar-nav ml-auto ${css.Header_nav}`}>
        <li className="nav-item">
          <a
            className={`nav-link ${css.Link}`}
            href={myBase.siteUrl}
            role="button"
          >
            <i className="fas fa-link"></i> Сайтруу орох
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Header;
