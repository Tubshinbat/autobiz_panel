import React from "react";
import Brand from "./Components/Brand";
import MultipleList from "./Components/MultipleList";
import Nav from "./Components/Nav";
import NavItem from "./Components/NavItem";
import PackList from "./Components/PackList";
import SideBar from "./Components/SideBar";
import UserInfo from "./Components/UserInfo";

import css from "./__.module.css";
import "./style.css";

const Side = () => {
  return (
    <>
      <aside
        className={`main-sidebar sidebar-dark-primary elevation-4 ${css.SideBar}`}
      >
        <Brand />
        <SideBar>
          <UserInfo />
          <Nav>
            <PackList>
              <NavItem exact link="/">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Хянах самар</p>
              </NavItem>
            </PackList>
            <PackList name="Үндсэн удирдлагууд">
              <NavItem exact link="/product">
                <i className="nav-icon fa fa-car"></i>
                <p>Бэлэн машинууд</p>
              </NavItem>
              <MultipleList name="Машины төрөл" icon="nav-icon fa fa-car">
                <NavItem exact link="/car_type">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Төрөл</p>
                </NavItem>
                <NavItem exact link="/industry">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Үйлдвэрлэсэн</p>
                </NavItem>
                <NavItem exact link="/car_zagvar">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Загвар</p>
                </NavItem>
                <NavItem exact link="/car_color">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Өнгө</p>
                </NavItem>
              </MultipleList>
              <NavItem exact link="/hybrid">
                <i className="nav-icon fa fa-car"></i>
                <p>Hybrid арал</p>
              </NavItem>
              <NavItem exact link="/freemod">
                <i className="nav-icon fa fa-car"></i>
                <p>Чөлөөлөгдөх арал</p>
              </NavItem>
              <NavItem exact link="/beproduct">
                <i className="nav-icon fa fa-car"></i>
                <p>beforward машинууд</p>
              </NavItem>

              <MultipleList name="Нийтлэл" icon="nav-icon fas fa-newspaper">
                <NavItem exact link="/news">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Нийтлэл</p>
                </NavItem>
                <NavItem exact link="/news-category">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Нийтлэлийн төрөл</p>
                </NavItem>
              </MultipleList>

              <NavItem exact link="/users">
                <i className="nav-icon fas fa-user-friends"></i>
                <p>Хэрэглэгчид</p>
              </NavItem>

              <NavItem exact link="/partners">
                <i className="nav-icon fas fa-suitcase"></i>
                <p>Хамтрагчид</p>
              </NavItem>
            </PackList>
            <PackList name="Форм">
              <NavItem exact link="/ordertype">
                <i className="nav-icon fas fa-inbox"></i>
                <p>Захиалгын төрөл</p>
              </NavItem>
              <MultipleList name="Захиалгууд" icon="nav-icon fas fa-newspaper">
                <NavItem exact link="/orders">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Auction Захиалгууд</p>
                </NavItem>
                <NavItem exact link="/stock_orders">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Stock захиалга</p>
                </NavItem>
                <NavItem exact link="/local_orders">
                  <p>Бэлэн машин захиалга</p>
                </NavItem>
              </MultipleList>

              <NavItem exact link="/contact">
                <i className="nav-icon fas fa-inbox"></i>
                <p>Санал хүсэлт</p>
              </NavItem>
              <NavItem exact link="/question">
                <i className="nav-icon far fa-question-circle"></i>
                <p>Нийтлэг асуулт</p>
              </NavItem>
            </PackList>
            <PackList name="Вэб сайт">
              <NavItem exact link="/page">
                <i className="nav-icon fas fa-file-alt"></i>
                <p>Сайтын хуудас</p>
              </NavItem>
              <MultipleList name="Сайтын цэс" icon="nav-icon fas fa-compass">
                <NavItem exact link="/menu">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Сайтын цэс</p>
                </NavItem>
                <NavItem exact link="/footer-menu">
                  <i className="nav-icon far fa-circle nav-icon"></i>
                  <p>Хөлөнд байрлах цэс</p>
                </NavItem>
              </MultipleList>
              <NavItem exact link="/banners">
                <i className="nav-icon fas fa-images"></i>
                <p>Баннер</p>
              </NavItem>
            </PackList>
          </Nav>
        </SideBar>
      </aside>
    </>
  );
};

export default Side;
