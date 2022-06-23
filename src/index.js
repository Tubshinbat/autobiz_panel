import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./Pages/App/";
import reportWebVitals from "./reportWebVitals";

// Reducers a
import imageReducer from "./redux/reducer/imageReducer";
import newsCategoryReducer from "./redux/reducer/newsCategoryReducer";
import newsReducer from "./redux/reducer/newsReducer";
import bannerReducer from "./redux/reducer/bannerReducer";
import faqReducer from "./redux/reducer/faqReducer";
import loginReducer from "./redux/reducer/loginReducer";
import tokenReducer from "./redux/reducer/tokenReducer";
import webinfoReducer from "./redux/reducer/webinfoReducer";
import userReducer from "./redux/reducer/userReducer";
import pageReducer from "./redux/reducer/pageReducer";
import menuReducer from "./redux/reducer/menuReducer";
import socialLinkReducer from "./redux/reducer/socialLinkReducer";
import productReducer from "./redux/reducer/productReducer";
import partnerReducer from "./redux/reducer/parentReducer";
import footerMenuReducer from "./redux/reducer/FooterMenuReducer";
import newsUploadReducer from "./redux/reducer/newsUploadReducer";
import beProductsReducer from "./redux/reducer/beProductReducer";
import carTypeReducer from "./redux/reducer/cartypeReducer";
import carIndustryReducer from "./redux/reducer/carindustryReducer";
import carZagvarReducer from "./redux/reducer/carzagvarReducer";
import carColorReducer from "./redux/reducer/carColorReducer";
import contactReducer from "./redux/reducer/contactReducer";
import hybridReducer from "./redux/reducer/hybridReducer";
import orderReducer from "./redux/reducer/orderReducer";
import orderTypeReducer from "./redux/reducer/orderTypeReducer";
import beorderReducer from "./redux/reducer/beorderReducer";

import "./index.css";

const loggerMiddlaware = (store) => {
  return (next) => {
    return (action) => {
      // console.log("MyLoggerMiddleware: Dispatching ==> ", action);
      // console.log("MyLoggerMiddleware: State BEFORE : ", store.getState());
      const result = next(action);
      // console.log("MyLoggerMiddleware: State AFTER : ", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  imageReducer,
  newsCategoryReducer,
  newsReducer,
  bannerReducer,
  faqReducer,
  loginReducer,
  tokenReducer,
  webinfoReducer,
  partnerReducer,
  menuReducer,
  footerMenuReducer,
  userReducer,
  pageReducer,
  productReducer,
  contactReducer,
  newsUploadReducer,
  beProductsReducer,
  carTypeReducer,
  carColorReducer,
  carZagvarReducer,
  carIndustryReducer,
  hybridReducer,
  socialLinkReducer,
  orderReducer,
  beorderReducer,
  orderTypeReducer,
});

const middlewares = [loggerMiddlaware, thunk];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
