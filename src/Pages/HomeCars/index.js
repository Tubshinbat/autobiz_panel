import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import base from "../../base";

// ACTIONS
import * as actions from "../../redux/actions/beProductActions";

//STYLES
import css from "./__.module.css";

// -- HTML
import Section from "../../Components/General/Section";
import PageTitle from "../../Components/PageTitle";
import Dropdown from "../../Components/General/Dropdown";
import CardBoby from "../../Components/General/CardBody";
import Spinner from "../../Components/General/Spinner";
import Spinner2 from "../../Components/General/Spinner2";
import Model from "../../Components/General/Model";

//-- filter Image
import notfound from "../../notfound.svg";

const HomeCars = (props) => {
  // -- USESTATE
  //-- PAGINATION
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  // SEARCH STATE
  const [menu, setMenu] = useState(null);
  const [status, setStatus] = useState(null);
  const [titleText, setTitleText] = useState(null);
  const [markText, setMarkText] = useState(null);
  const [typeText, setTypeText] = useState(null);
  const [modelText, setModelText] = useState(null);
  const [priceText, setPriceText] = useState(null);
  const [countryText, setCountryText] = useState(null);
  const [fobText, setFobText] = useState(null);

  const [select, setSelect] = useState(
    "status title mark_txt type_txt price country model location_fob gallery_images href createAt"
  );

  // DELETE CHECKBOX
  const [chkBox, setChkBox] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false);

  // DROPDOWN
  const [dropShow, setDropShow] = useState({
    status: false,
  });

  const [selectStatus, setSelectStatus] = useState();

  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  // ???????? ?????????? ?????????? ?????????? ?????????????????? ???????????? ???????????????? ?????? useEffect ?????????? ?????????? TOAST ????????????????
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      init();
    }
  }, [props.success]);

  useEffect(() => {
    setTotal(props.pageLast.total);
    setLimit(props.pageLast.limit);
  }, [props.pageLast]);

  useEffect(() => {
    props.loadBeProducts(
      `select=${select}&status=${status}&title=${titleText}&menu=${menu}&make=${markText}&model=${modelText}&type=${typeText}&country=${countryText}&fob=${fobText}&pricetext=${priceText}&page=${activePage}`
    );
  }, [activePage]);

  //-- FUNCTIONS
  // INIT
  const init = () => {
    setMenu(() => null);
    setStatus(() => null);
    setTitleText(() => "");
    setMarkText(() => "");
    setTypeText(() => "");
    setModelText(() => "");
    setPriceText(() => "");
    setCountryText(() => "");
    setFobText(() => "");
    setChkBox(() => []);
    props.clear();
    props.loadBeProducts(`select=${select}`);
  };

  const addClick = () => {
    props.history.push("/home_cars/add");
  };

  const handleShow = (data) => {
    setDropShow((beforeDrop) => ({
      ...beforeDrop,
      [data]: dropShow[data] ? false : true,
    }));
  };

  const handleClickStatus = (e) => {
    setSelectStatus(e.name);
    handleShow("status");
    setStatus(e.value);
    props.loadBeProducts(
      `select=${select}&status=${e.value}&title=${titleText}&make=${markText}&model=${modelText}&type=${typeText}&country=${countryText}&fob=${fobText}&pricetext=${priceText}&page=${activePage}`
    );
  };

  const handleShowModel = () => {
    deleteModel === true ? setDeleteModel(false) : setDeleteModel(true);
  };

  const handleClose = () => {
    setDeleteModel(false);
  };

  // FILTER HANDLE
  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === "title") {
      props.loadBeProducts(
        `select=${select}&status=${status}&title=${value}&make=${markText}&model=${modelText}&type=${typeText}&country=${countryText}&fob=${fobText}&pricetext=${priceText}&page=${activePage}`
      );
      setTitleText(value);
    }
    if (name === "mark_txt") {
      props.loadBeProducts(
        `select=${select}&status=${status}&title=${titleText}&make=${value}&model=${modelText}&type=${typeText}&country=${countryText}&fob=${fobText}&pricetext=${priceText}&page=${activePage}`
      );
      setMarkText(value);
    }

    if (name === "type_txt") {
      props.loadBeProducts(
        `select=${select}&status=${status}&title=${titleText}&make=${markText}&model=${modelText}&type=${value}&country=${countryText}&fob=${fobText}&pricetext=${priceText}&page=${activePage}`
      );
      setTypeText(value);
    }

    if (name === "model") {
      props.loadBeProducts(
        `select=${select}&status=${status}&title=${titleText}&make=${markText}&model=${value}&type=${typeText}&country=${countryText}&fob=${fobText}&pricetext=${priceText}&page=${activePage}`
      );
      setModelText(value);
    }

    if (name === "price") {
      props.loadBeProducts(
        `select=${select}&status=${status}&title=${titleText}&make=${markText}&model=${modelText}&type=${typeText}&country=${countryText}&fob=${fobText}&pricetext=${value}&page=${activePage}`
      );
      setPriceText(value);
    }

    if (name === "country") {
      props.loadBeProducts(
        `select=${select}&status=${status}&title=${titleText}&make=${markText}&model=${modelText}&type=${typeText}&country=${value}&fob=${fobText}&pricetext=${priceText}&page=${activePage}`
      );
      setCountryText(value);
    }

    if (name === "fob") {
      props.loadBeProducts(
        `select=${select}&status=${status}&title=${titleText}&make=${markText}&model=${modelText}&type=${typeText}&country=${countryText}&fob=${value}&pricetext=${priceText}&page=${activePage}`
      );
      setFobText(value);
    }

    props.loadPagination(props.pageLast);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const deleteClick = () => {
    let ids = [];
    chkBox.map((el) => {
      ids.push(el.id);
    });
    props.deleteMultBeProducts(ids);
    setDeleteModel(false);
  };

  const handleChk = (e) => {
    let ch = chkBox;
    let checks = [];
    if (e.target.checked === false) {
      ch.map((el, index) => {
        if (el.id === e.target.value) {
          ch.splice(index, 1);
        }
      });
    } else {
      checks[e.target.value] = { check: e.target.checked, id: e.target.value };
      ch.push(checks[e.target.value]);
    }
    setChkBox((b) => [...b]);
  };

  // RENDERS

  const renderStatus = () => {
    const statusData = [
      { name: "????????", value: null },
      { name: "????????????????", value: true },
      { name: "????????????", value: false },
    ];
    let renderJSX = [];
    statusData.map((el) => {
      renderJSX.push(
        <li key={el.name}>
          <p className={`DropdownEl`} onClick={() => handleClickStatus(el)}>
            {el.name}
          </p>
        </li>
      );
    });
    return renderJSX;
  };

  return (
    <Section>
      <MetaTags>
        <title> Beforward ???????????????? | WEBR Control Panel</title>
        <meta
          name="description"
          content="Beforward ???????????????? | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Beforward ???????????????? | web control panel"
        />
      </MetaTags>
      <PageTitle name="Beforward ????????????????" />
      <div className="row">
        <div className={css.PanelControl}>
          <div className="col-md-4">
            <div className={css.PanelTabelHeader}>
              <button
                name="addBtn"
                onClick={addClick}
                className="myButton addBtn"
              >
                <i className="fas fa-plus-circle"></i> ???????????? ????????????
              </button>
              <button
                name="refresh"
                onClick={() => init()}
                className="myButton refreshBtn"
              >
                <i className="fas fa-redo-alt"></i> ??????????????
              </button>
              {chkBox.length > 0 && (
                <button
                  name="sitePage"
                  onClick={handleShowModel}
                  className="myButton refreshBtn deleteBtn"
                >
                  <i className="fas fa-trash-alt"></i> ????????????
                </button>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8">
                <div className={`searchPanel`}>
                  <div className="form-group">
                    <Dropdown
                      key={"status"}
                      name={!selectStatus ? "??????????" : selectStatus}
                      data={renderStatus()}
                      handleClick={handleShow}
                      show={dropShow.status}
                      who="status"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          {props.loading ? <Spinner /> : null}
          <CardBoby>
            <div className={`card-body`}>
              <div className="card-header">
                <h3 className="card-title" style={{ fontSize: 14 }}>
                  ???????????????????? : {chkBox.length}
                </h3>
                <div className={`card-tools ${css.Pagination}`}>
                  {!total ? (
                    <Spinner2 />
                  ) : (
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange.bind()}
                    />
                  )}
                </div>
              </div>
              <table className={`myTable table`}>
                <thead>
                  <tr>
                    <th></th>
                    <th className="statusTh">?????????? </th>
                    <th> ?????????? </th>
                    <th> ???????????? </th>
                    <th> ?????????????? </th>
                    <th> ?????????? </th>
                    <th> ???????????? </th>
                    <th> ?????? ($) </th>
                    <th> ?????? </th>
                    <th> FOB ?????????????? </th>
                    <th> Beforward ???????? </th>
                    <th> ?????????????????? </th>
                    <th> ???????????? </th>
                  </tr>
                </thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <input
                      type="text"
                      name="title"
                      className="form-control "
                      placeholder="?????????? ????????..."
                      onChange={handleChange}
                      value={titleText && titleText}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="mark_txt"
                      className="form-control "
                      placeholder="???????????????????????????? ?????????? ????????..."
                      onChange={handleChange}
                      value={markText && markText}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="type_txt"
                      className="form-control "
                      placeholder="?????????????? ?????????? ????????..."
                      onChange={handleChange}
                      value={typeText && typeText}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="model"
                      className="form-control "
                      placeholder="?????????????????? ?????????? ????????..."
                      onChange={handleChange}
                      value={modelText && modelText}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="price"
                      className="form-control "
                      placeholder="?????????? ?????????? ????????..."
                      onChange={handleChange}
                      value={priceText && priceText}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="country"
                      className="form-control "
                      placeholder="???????????? ?????????? ????????..."
                      onChange={handleChange}
                      value={countryText && countryText}
                    />
                  </th>
                  <th>
                    <input
                      type="text"
                      name="fob"
                      className="form-control "
                      placeholder="Fob -?????? ?????????? ????????..."
                      onChange={handleChange}
                      value={fobText && fobText}
                    />
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                {props.beProducts &&
                  props.beProducts.map((el) => (
                    <tr key={el._id}>
                      <td className="checkTd">
                        <input
                          type="checkbox"
                          value={el._id}
                          className="chk"
                          onChange={handleChk}
                        />
                      </td>
                      <td className="statusTd">
                        {el.status == true ? (
                          <div className="activeOn"></div>
                        ) : (
                          <div className="activeOff"></div>
                        )}
                      </td>

                      <td>
                        {el.gallery_images ? (
                          <div className="tableImgBox">
                            <img
                              src={`${base.cdnUrl}uploads/product/${el.id}/product/${el.gallery_images[0]}`}
                              className="tableImg"
                            />
                          </div>
                        ) : (
                          "?????????? ?????????????????? "
                        )}
                      </td>
                      <td>{el.title}</td>
                      <td>{el.mark_txt}</td>
                      <td>{el.type_txt}</td>
                      <td>{el.model}</td>
                      <td>{new Intl.NumberFormat().format(el.price)} $</td>
                      <td>{el.country}</td>
                      <td>{el.location_fob}</td>
                      <td>
                        <a href={el.href} target="_blank">
                          ??????????????
                        </a>
                      </td>
                      <td>{el.createAt}</td>
                      <td>
                        <div className={css.AllActions}>
                          <Link
                            className={`${css.Actions} ${css.View}`}
                            to={`/beproduct/view/${el._id}`}
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                          <Link
                            className={`${css.Actions} ${css.Edit}`}
                            to={`/beproduct/edit/${el._id}`}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
              {props.loading === false &&
                props.beProducts &&
                props.beProducts.length < 1 && (
                  <div className={css.Notfound}>
                    <p> "?????????? ??????????????????" </p>
                    <img src={notfound} />
                  </div>
                )}
              <div className={css.DashboardFooter}>
                <p>
                  ???????? ????????: <strong> {total} </strong>
                </p>
              </div>
            </div>
          </CardBoby>
        </div>
      </div>
      <Model
        modelName="???????????? ???????? ????????????"
        show={deleteModel}
        handleToggle={handleClose}
      >
        <div>
          <p>
            ???????????????????? ????????: <strong> {chkBox.length} </strong> ??????????????
            ?????????????????? ???????????????? ?????????? ???? ?
          </p>
        </div>
        <div className={css.BtnGroup}>
          <button className="btn btn-success btn-sm" onClick={deleteClick}>
            ????????????
          </button>
          <button className="btn btn-light btn-sm" onClick={handleClose}>
            ??????????
          </button>
        </div>
      </Model>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    beProducts: state.beProductsReducer.beProducts,
    pageLast: state.beProductsReducer.paginationLast,
    loading: state.beProductsReducer.loading,
    success: state.beProductsReducer.success,
    error: state.beProductsReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(actions.clear()),
    loadBeProducts: (query) => dispatch(actions.loadBeProducts(query)),
    loadPagination: (pageLast) => dispatch(actions.loadPagination(pageLast)),
    deleteMultBeProducts: (ids) => dispatch(actions.deleteMultBeProducts(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCars);
