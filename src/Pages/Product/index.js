import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import myBase from "../../base";

// ACTIONS
import * as actions from "../../redux/actions/productActions";

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

const CarColor = (props) => {
  // -- USESTATE
  //-- PAGINATION
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  // SEARCH STATE
  const [menu, setMenu] = useState(null);
  const [status, setStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [markText, setMarkText] = useState("");
  const [zagvarText, setZagvarText] = useState("");
  const [select, setSelect] = useState(
    "status title  car_industry car_zagvar car_type import_date make_date price pictures createAt"
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

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
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
    props.loadProducts(
      `select=${select}&status=${status}&name=${searchText}&menu=${menu}&mark_name=${markText}&zagvar_name=${zagvarText}&page=${activePage}`
    );
  }, [activePage]);

  //-- FUNCTIONS
  // INIT
  const init = () => {
    setMenu(() => null);
    setStatus(() => null);
    setSearchText(() => "");
    setMarkText(() => "");
    setZagvarText(() => "");
    setChkBox(() => []);
    props.clear();
    props.loadProducts(`select=${select}`);
  };

  const addClick = () => {
    props.history.push("/product/add");
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
    props.loadProducts(
      `select=${select}&status=${e.value}&name=${searchText}&mark_name=${markText}&zagvar_name=${zagvarText}&page=${activePage}`
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
    if (e.target.name === "searchText") {
      setSearchText(e.target.value);
      props.loadProducts(
        `select=${select}&status=${status}&name=${e.target.value}&mark_name=${markText}&zagvar_name=${zagvarText}&page=${activePage}`
      );
    }
    if (e.target.name === "mark_name") {
      props.loadProducts(
        `select=${select}&status=${status}&name=${searchText}&mark_name=${e.target.value}&zagvar_name=${zagvarText}&page=${activePage}`
      );
      setMarkText(e.target.value);
    }

    if (e.target.name === "zagvar_name") {
      props.loadProducts(
        `select=${select}&status=${status}&name=${searchText}&mark_name=${markText}&zagvar_name=${e.target.value}&page=${activePage}`
      );
      setZagvarText(e.target.value);
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
    props.deleteMultProduct(ids);
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
      { name: "Бүгд", value: null },
      { name: "Идэвхтэй", value: true },
      { name: "Ноорог", value: false },
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
        <title> Машин | WEBR Control Panel</title>
        <meta name="description" content="Машин  | WeBR control panel" />
        <meta property="og:title" content="Машин  | web control panel" />
      </MetaTags>
      <PageTitle name="Машин " />
      <div className="row">
        <div className={css.PanelControl}>
          <div className="col-md-4">
            <div className={css.PanelTabelHeader}>
              <button
                name="addBtn"
                onClick={addClick}
                className="myButton addBtn"
              >
                <i className="fas fa-plus-circle"></i> Машин
              </button>
              <button
                name="refresh"
                onClick={() => init()}
                className="myButton refreshBtn"
              >
                <i className="fas fa-redo-alt"></i> Сэргээх
              </button>
              {chkBox.length > 0 && (
                <button
                  name="sitePage"
                  onClick={handleShowModel}
                  className="myButton refreshBtn deleteBtn"
                >
                  <i className="fas fa-trash-alt"></i> Устгах
                </button>
              )}
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-8">
                <div className={`searchPanel`}>
                  <div className="form-group">
                    <Dropdown
                      key={"status"}
                      name={!selectStatus ? "Төлөв" : selectStatus}
                      data={renderStatus()}
                      handleClick={handleShow}
                      show={dropShow.status}
                      who="status"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    name="searchText"
                    className="form-control my-input searchInput"
                    placeholder="Нэрээр хайлт хийх..."
                    onChange={handleChange}
                    value={searchText && searchText}
                  />
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
                  Сонгогдсон : {chkBox.length}
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
                    <th className="statusTh">Төлөв </th>
                    <th> Зураг </th>
                    <th>Зарын гарчиг</th>
                    <th>Зарах үнэ</th>
                    <th>Үйлдвэр</th>
                    <th>Загвар </th>
                    <th>Үйлдвэрлэгдсэн огноо</th>
                    <th>Орж ирсэн огноо</th>
                    <th>Нэмсэн огноо</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="form-group">
                      <input
                        type="text"
                        name="mark_name"
                        className={`form-control ${css.TableSearch} `}
                        placeholder="Үйлдвэрлэгчээс хайлт хийх..."
                        onChange={handleChange}
                        value={markText && markText}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <input
                        type="text"
                        name="zagvar_name"
                        className={`form-control ${css.TableSearch} `}
                        placeholder="Загвараас хайлт хийх..."
                        onChange={handleChange}
                        value={zagvarText && zagvarText}
                      />
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                {props.products &&
                  props.products.map((el) => (
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
                        {el.pictures ? (
                          <div className="tableImgBox">
                            <img
                              src={`${myBase.cdnUrl}uploads/${el.pictures[0]}`}
                              className="tableImg"
                            />
                          </div>
                        ) : (
                          "Зураг олдсонгүй "
                        )}
                      </td>
                      <td>{el.title}</td>
                      <td>{new Intl.NumberFormat().format(el.price)} ₮</td>
                      <td> {el.car_industry.name}</td>
                      <td> {el.car_zagvar.name}</td>
                      <td> {el.make_date}</td>
                      <td> {el.import_date}</td>
                      <td>{el.createAt}</td>
                      <td>
                        <div className={css.AllActions}>
                          <Link
                            className={`${css.Actions} ${css.Edit}`}
                            to={`/product/edit/${el._id}`}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
              {props.loading === false &&
                props.products &&
                props.products.length < 1 && (
                  <div className={css.Notfound}>
                    <p> "Илэрц олдсонгүй" </p>
                    <img src={notfound} />
                  </div>
                )}
              <div className={css.DashboardFooter}>
                <p>
                  Нийт дата: <strong> {total} </strong>
                </p>
              </div>
            </div>
          </CardBoby>
        </div>
      </div>
      <Model
        modelName="Сошиал хаяг устгах"
        show={deleteModel}
        handleToggle={handleClose}
      >
        <div>
          <p>
            Сонгогдсон нийт: <strong> {chkBox.length} </strong> хуудсыг
            устгахдаа итгэлтэй байна уу ?
          </p>
        </div>
        <div className={css.BtnGroup}>
          <button className="btn btn-success btn-sm" onClick={deleteClick}>
            Устгах
          </button>
          <button className="btn btn-light btn-sm" onClick={handleClose}>
            Болих
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
    products: state.productReducer.products,
    pageLast: state.productReducer.paginationLast,
    loading: state.productReducer.loading,
    success: state.productReducer.success,
    error: state.productReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(actions.clear()),
    loadProducts: (query) => dispatch(actions.loadProducts(query)),
    loadPagination: (pageLast) => dispatch(actions.loadPagination(pageLast)),
    deleteMultProduct: (ids) => dispatch(actions.deleteMultProduct(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarColor);
