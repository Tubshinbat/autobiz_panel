import React from "react";
import { Link, NavLink } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

import css from "./__.module.css";

const newsById = { "6060a3b1e124f281bc371676": "aa" };

const DynamicNewsBreadcrumb = ({ match }) => (
  <span> {newsById[match.params.id]} </span>
);

const routes = [
  {
    path: "/",
    breadcrumb: "Эхлэл",
  },
  {
    path: "/news-category",
    breadcrumb: "Нийтлэлийн төрөл",
  },
  {
    path: "/news",
    breadcrumb: "Нийтлэл",
  },
  {
    path: "/news/add",
    breadcrumb: "Нийтлэл нэмэх",
  },
  {
    path: "/news/view/",
    breadcrumb: "Нийтлэл харах",
  },

  {
    path: "/news/view/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/news/edit",
    breadcrumb: "Нийтлэл шинэчлэх",
  },
  {
    path: "/news/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/banners",
    breadcrumb: "Баннер",
  },
  {
    path: "/banners/add",
    breadcrumb: "Баннер шинээр нэмэх",
  },
  {
    path: "/banners/edit",
    breadcrum: "Баннер засварлах",
  },
  {
    path: "/banners/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/product",
    breadcrumb: "Бэлэн машинууд",
  },
  {
    path: "/product/add",
    breadcrumb: "Машин нэмэх",
  },
  {
    path: "/product/edit",
    breadcrum: "Машин шинэчлэх",
  },
  {
    path: "/product/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/car_type",
    breadcrumb: "Машины төрөл",
  },
  {
    path: "/car_type/add",
    breadcrumb: "Машины төрөл нэмэх",
  },
  {
    path: "/car_type/edit",
    breadcrum: "Машины төрөл шинэчлэх",
  },
  {
    path: "/car_type/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/industry",
    breadcrumb: "Машины үйлдвэр",
  },
  {
    path: "/industry/add",
    breadcrumb: "Машины үйлдвэр нэмэх",
  },
  {
    path: "/industry/edit",
    breadcrum: "Машины үйлдвэр шинэчлэх",
  },
  {
    path: "/industry/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/car_zagvar",
    breadcrumb: "Машины загвар",
  },
  {
    path: "/car_zagvar/add",
    breadcrumb: "Машины загвар нэмэх",
  },
  {
    path: "/car_zagvar/edit",
    breadcrum: "Машины загвар шинэчлэх",
  },
  {
    path: "/car_zagvar/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/car_color",
    breadcrumb: "Машины өнгө",
  },
  {
    path: "/car_color/add",
    breadcrumb: "Машины өнгө нэмэх",
  },
  {
    path: "/car_color/edit",
    breadcrum: "Машины өнгө шинэчлэх",
  },
  {
    path: "/car_color/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/beproduct",
    breadcrumb: "Beforward машинууд",
  },
  {
    path: "/beproduct/view",
    breadcrumb: "харах",
  },
  {
    path: "/beproduct/edit",
    breadcrum: " шинэчлэх",
  },
  {
    path: "/beproduct/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/beproduct/view/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },

  {
    path: "/menu",
    breadcrumb: "Сайтын цэс",
  },
  {
    path: "/menu",
    breadcrumb: "Сайтын цэс",
  },
  {
    path: "/employees",
    breadcrumb: "Ажилчид",
  },
  {
    path: "/position",
    breadcrumb: "Алба нэгж",
  },
  {
    path: "/page/add",
    breadcrumb: "Сайтын хуудас нэмэх",
  },

  {
    path: "/about-us",
    breadcrumb: "Бидний тухай",
  },
  {
    path: "/question",
    breadcrumb: "Түгээмэл асуулт хариулт",
  },
  {
    path: "/users",
    breadcrumb: "Хэрэглэгчид",
  },
  {
    path: "/users/edit",
    breadcrumb: "Засварлах",
  },
  {
    path: "/users/view",
    breadcrumb: "Дэлгэрэнгүй мэдээлэл",
  },
  {
    path: "/users/view/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/users/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
  {
    path: "/webinfo",
    breadcrumb: "Ёрөнхий тохиргоо",
  },
  {
    path: "/partners",
    breadcrumb: "Хамтрагч компани",
  },
  {
    path: "/partners/add",
    breadcrumb: "Хамтрагч нэмэх",
  },
  {
    path: "/partners/edit",
    breadcrumb: "Хамтрагч шинэчлэх",
  },
  {
    path: "/partners/edit/:id",
    breadcrumb: DynamicNewsBreadcrumb,
  },
];
let lastBread = "";

// map & render your breadcrumb components however you want.
const Breadcrumbs = withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <>
    {breadcrumbs.map(({ match, breadcrumb }) => (
      // other props are available during render, such as `location`
      // and any props found in your route objects will be passed through too
      <li className={`breadcrumb-item ${css.Bitem}`} key={match.url}>
        <Link to={match.url}>{breadcrumb} </Link>
      </li>
    ))}
  </>
));

const PageTitle = (props) => {
  return (
    <div className={`container-fluid ${css.Header}`}>
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>{props.name}</h1>
        </div>
        <div className="col-sm-6">
          <ol className={`breadcrumb ${css.Breadcrumb}  float-sm-right`}>
            <Breadcrumbs />
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
