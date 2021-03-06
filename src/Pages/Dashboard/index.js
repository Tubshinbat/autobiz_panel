import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";

import PageTitle from "../../Components/PageTitle";
import { getCountNews } from "../../redux/actions/newsActions";
import base from "../../base";
// actions
import { loadWebinfo } from "../../redux/actions/webinfoActions";
import { getCountUser } from "../../redux/actions/userActions";
import { getCountPage } from "../../redux/actions/pageActions";
import { getCountMenu } from "../../redux/actions/menuActions";
import { getCountProduct } from "../../redux/actions/productActions";
import { getCountOrder } from "../../redux/actions/orderActions";
import { getCountBeorder } from "../../redux/actions/beorderActions";
import { getCountBeProducts } from "../../redux/actions/beProductActions";

//Style
import css from "./__.module.css";

const Dashboard = (props) => {
  // UseState's
  const [webInfo, setWebInfo] = useState("");

  // INIT PAGE
  useEffect(() => {
    const reloadCount = sessionStorage.getItem("reloadCount");
    if (reloadCount < 2) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
    props.newsCountLoad();
    props.loadWebinfo();
    props.getCountUser();
    props.getCountPage();
    props.getCountMenu();
    props.getCountBeorder();
    props.getCountOrder();
    props.getCountProduct();
    props.getCountBeProducts();
  }, []);

  // USEEFFECT's

  useEffect(() => {
    setWebInfo(props.webInfo);
  }, [props.webInfo]);

  return (
    <>
      <div className="content-wrapper p-4">
        <section className="content-header">
          <MetaTags>
            <title>WEBR Control Panel</title>
            <meta name="description" content="WeBR control panel" />
            <meta property="og:title" content="web control panel" />
          </MetaTags>
          <PageTitle name="Хянах самбар" />
          <div className="row">
            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-info">
                  <i className="fas fa-users" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Хэрэглэгч</span>
                  <span className="info-box-number">
                    {props.userTotal && props.userTotal}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-success">
                  <i className="far fa-file"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Сайтын хуудас</span>
                  <span className="info-box-number">
                    {props.pageTotal && props.pageTotal}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-warning">
                  <i className="far fa-copy" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Нийтлэл</span>
                  <span className="info-box-number">
                    {props.newsTotal && props.newsTotal}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-secondary">
                  <i className="fas fa-sitemap" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Ангилал</span>
                  <span className="info-box-number">
                    {props.menuTotal && props.menuTotal}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-secondary">
                  <i className="fa fa-car" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Stock beforward</span>
                  <span className="info-box-number">
                    {props.beProductsTotal && props.beProductsTotal}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-success">
                  <i className="fa fa-car" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Бэлэн байгаа</span>
                  <span className="info-box-number">
                    {props.productTotal && props.productTotal}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-success">
                  <i className="fa fa-car" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text"> Худалдан авах хүсэлт</span>
                  <span className="info-box-number">
                    {props.orderTotal && props.orderTotal}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12">
              <div className="info-box">
                <span className="info-box-icon bg-success">
                  <i className="fa fa-car" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Захиалга</span>
                  <span className="info-box-number">
                    {props.beOrderTotal && props.beOrderTotal}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 d-flex align-items-stretch flex-column">
              <div className={`card bg-light d-flex flex-fill ${css.Lead}`}>
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col-7">
                      <h2 className={`lead `}>
                        <b>{webInfo && webInfo.name}</b>
                      </h2>
                      <p className="text-muted text-sm">
                        <b>Тухай: </b> {webInfo && webInfo.siteInfo}
                      </p>
                      <ul className="ml-4 mb-0 fa-ul text-muted">
                        <li className={`small ${css.DetialItem}`}>
                          <span className="fa-li">
                            <i className="fas  fa-building" />
                          </span>
                          Хаяг:
                          {webInfo && webInfo.address}
                        </li>
                        <li className={`small ${css.DetialItem}`}>
                          <span className="fa-li">
                            <i className="fas  fa-phone" />
                          </span>
                          Утас #:{webInfo && webInfo.phone}
                        </li>
                        <li className={`small ${css.DetialItem}`}>
                          <span className="fa-li">
                            <i className="fas  fa-envelope"></i>
                          </span>
                          Имэйл хаяг:{webInfo && webInfo.email}
                        </li>
                      </ul>
                    </div>
                    <div className={`col-5 text-center ${css.Center}`}>
                      <div className={css.Logo}>
                        <img
                          src={`${base.cdnUrl}uploads/${
                            webInfo && webInfo.logo
                          }`}
                          className="img-circle img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="text-right">
                    <Link
                      to="/webinfo"
                      className={`btn btn-sm btn-primary ${css.BtnEdit}`}
                    >
                      <i className="fas fa-edit" /> Засах
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    newsTotalLoading: state.newsReducer.coutLoading,
    newsTotal: state.newsReducer.totalCount,
    userTotal: state.userReducer.totalCount,
    pageTotal: state.pageReducer.totalCount,
    menuTotal: state.menuReducer.totalCount,
    orderTotal: state.orderReducer.totalCount,
    beOrderTotal: state.beorderReducer.totalCount,
    productTotal: state.productReducer.totalCount,
    beProductsTotal: state.beProductsReducer.totalCount,
    webInfo: state.webinfoReducer.webInfo,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    newsCountLoad: () => dispatch(getCountNews()),
    getCountUser: () => dispatch(getCountUser()),
    loadWebinfo: () => dispatch(loadWebinfo()),
    getCountPage: () => dispatch(getCountPage()),
    getCountMenu: () => dispatch(getCountMenu()),
    getCountBeProducts: () => dispatch(getCountBeProducts()),
    getCountBeorder: () => dispatch(getCountBeorder()),
    getCountOrder: () => dispatch(getCountOrder()),
    getCountProduct: () => dispatch(getCountProduct()),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Dashboard);
