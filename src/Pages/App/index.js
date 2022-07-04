import react, { useEffect, Component } from "react";
import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../../pageStyle.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useCookies, CookiesProvider } from "react-cookie";
import { connect } from "react-redux";

// Import components
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Side from "../../Components/Side";

// Import page
import Dashboard from "../Dashboard";
import News from "../News";
import User from "../Users";
import Contact from "../Contact";
import Banner from "../Banner";
import { default as BannerAdd } from "../Banner/Add";
import { default as BannerEdit } from "../Banner/Edit";
import { default as NewsAdd } from "../News/Add";
import { default as NewsView } from "../News/View";
import { default as NewsEdit } from "../News/Edit";
import NewsCategory from "../NewsCategory";
import Question from "../Question";
import { default as LoginPage } from "../Login";
import Notfound from "../Notfound";
import Logout from "../Logout";
import { default as UserAdd } from "../Users/Add";
import { default as UserEdit } from "../Users/Edit";
import { default as UserView } from "../Users/View";
import Page from "../Page";
import { default as pageAdd } from "../Page/Add";
import { default as pageEdit } from "../Page/Edit";
import Product from "../Product";
import { default as productAdd } from "../Product/add";
import { default as productEdit } from "../Product/edit";
import Partners from "../Partners";
import { default as partnersAdd } from "../Partners/add";
import { default as partnersEdit } from "../Partners/edit";
import UserProfile from "../UserProfile";
import EditUser from "../UserProfile/edit";
import FooterMenu from "../FooterMenu";
import { default as Forget } from "../Forget";

import Cartype from "../Cartype";
import { default as CartypeAdd } from "../Cartype/Add";
import { default as CartypeEdit } from "../Cartype/Edit";

import Carindustry from "../CarIndustry";
import { default as CarindustryAdd } from "../CarIndustry/Add";
import { default as CarindustryEdit } from "../CarIndustry/Edit";

import CarZagvar from "../CarZagvar";
import { default as CarZagvarAdd } from "../CarZagvar/Add";
import { default as CarZagvarEdit } from "../CarZagvar/Edit";

import CarColor from "../CarColor";
import { default as CarColorAdd } from "../CarColor/Add";
import { default as CarColorEdit } from "../CarColor/Edit";

import Hybrid from "../Hybrid";
import { default as HybridAdd } from "../Hybrid/Add";
import { default as HybridEdit } from "../Hybrid/Edit";

import Freemod from "../Freemod";
import { default as FreemodAdd } from "../Freemod/Add";
import { default as FreemodEdit } from "../Freemod/Edit";

import Beproduct from "../BeProduct";
import { default as BeproductView } from "../BeProduct/View";
import { default as BeproductEdit } from "../BeProduct/Edit";

import OrderType from "../OrderType";
import { default as OrderTypeAdd } from "../OrderType/Add";
import { default as OrderTypeEdit } from "../OrderType/Edit";

import LocalOrder from "../LocalOrder";
import { default as LocalOrderAdd } from "../LocalOrder/Add";
import { default as LocalOrderEdit } from "../LocalOrder/Edit";

import StockOrder from "../StockOrder";
import { default as StockOrderEdit } from "../StockOrder/Edit";

import Menu from "../Menu";
// Actions
import { tokenCheck } from "../../redux/actions/tokenActions";
import WebInfo from "../WebInfo";

function App(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["autobiztoken"]);

  useEffect(() => {
    if (cookies.autobiztoken) {
      const token = cookies.autobiztoken;
      props.checkToken(token);
    }
  }, []);

  useEffect(() => {
    if (props.tokenError) {
      removeCookie("autobiztoken");
      document.location.href = "/login";
    }
  }, [props.tokenError]);

  return (
    <>
      {cookies.autobiztoken ? (
        <>
          <CookiesProvider>
            <Header />
            <Side />
            <Switch>
              <Route path="/news" component={News} exact />
              <Route path="/news/add" component={NewsAdd} exact />
              <Route path="/news/view/:id" component={NewsView} />
              <Route path="/news/edit/:id" component={NewsEdit} />
              <Route path="/news-category" component={NewsCategory} />

              <Route path="/webinfo" component={WebInfo} />
              <Route path="/users/add" component={UserAdd} />
              <Route path="/users/edit/:id" component={UserEdit} />
              <Route path="/users/view/:id" component={UserView} />
              <Route path="/users" component={User} />

              <Route path="/banners/add" component={BannerAdd} />
              <Route path="/banners/edit/:id" component={BannerEdit} />
              <Route path="/banners" component={Banner} />

              <Route path="/question" component={Question} />

              <Route path="/page/add" component={pageAdd} />
              <Route path="/page/edit/:id" component={pageEdit} />
              <Route path="/page" component={Page} />

              <Route path="/product/add" component={productAdd} />
              <Route path="/product/edit/:id" component={productEdit} />
              <Route path="/product" component={Product} />

              <Route path="/partners/edit/:id" component={partnersEdit} />
              <Route path="/partners/add" component={partnersAdd} />
              <Route path="/partners" component={Partners} />

              <Route path="/menu" component={Menu} />
              <Route path="/contact" component={Contact} />
              <Route path="/userprofile" component={UserProfile} />
              <Route path="/settings" component={EditUser} />

              <Route path="/car_type/add" component={CartypeAdd} />
              <Route path="/car_type/edit/:id" component={CartypeEdit} />
              <Route path="/car_type" component={Cartype} />

              <Route path="/car_zagvar/add" component={CarZagvarAdd} />
              <Route path="/car_zagvar/edit/:id" component={CarZagvarEdit} />
              <Route path="/car_zagvar" component={CarZagvar} />

              <Route path="/industry/add" component={CarindustryAdd} />
              <Route path="/industry/edit/:id" component={CarindustryEdit} />
              <Route path="/industry" component={Carindustry} />

              <Route path="/car_color/add" component={CarColorAdd} />
              <Route path="/car_color/edit/:id" component={CarColorEdit} />
              <Route path="/car_color" component={CarColor} />

              <Route path="/hybrid/add" component={HybridAdd} />
              <Route path="/hybrid/edit/:id" component={HybridEdit} />
              <Route path="/hybrid" component={Hybrid} />

              <Route path="/beproduct/view/:id" component={BeproductView} />
              <Route path="/beproduct/edit/:id" component={BeproductEdit} />
              <Route path="/beproduct" component={Beproduct} />

              <Route path="/ordertype/add" component={OrderTypeAdd} />
              <Route path="/ordertype/edit/:id" component={OrderTypeEdit} />
              <Route path="/ordertype" component={OrderType} />

              <Route path="/freemod/add" component={FreemodAdd} />
              <Route path="/freemod/edit/:id" component={FreemodEdit} />
              <Route path="/freemod" component={Freemod} />

              <Route path="/local_orders/edit/:id" component={LocalOrderEdit} />
              <Route path="/local_orders" component={LocalOrder} />

              <Route path="/stock_orders/edit/:id" component={StockOrderEdit} />
              <Route path="/stock_orders" component={StockOrder} />

              <Route path="/" exact component={Dashboard} />
              <Route path="/logout" component={Logout} />
              <Route path="/footer-menu" component={FooterMenu} />
              <Redirect to="/" />
              <Route path="*" component={Notfound} />
            </Switch>
            <Footer />
          </CookiesProvider>
        </>
      ) : (
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route parh="/forget-password" exact component={Forget} />
          <Redirect to="/login" />
        </Switch>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tokenError: state.tokenReducer.error,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    checkToken: (token) => dispatch(tokenCheck(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
