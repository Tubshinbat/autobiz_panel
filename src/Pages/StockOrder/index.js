import React, { useEffect, Text, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import myBase from "../../base";

// ACTIONS

import * as actions from "../../redux/actions/beorderActions";
import { loadOrderTypes } from "../../redux/actions/orderTypeActions";

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

const News = (props) => {
  // -- USESTATE
  //-- PAGINATION
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  // SEARCH STATE
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState({
    orderType: null,
    name: null,
    user: null,
    orderNumber: null,
  });
  const [select, setSelect] = useState(
    "status name slug categories pictures type createAt"
  );

  // DELETE CHECKBOX
  const [chkBox, setChkBox] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false);

  // DROPDOWN
  const [dropShow, setDropShow] = useState({
    category: false,
    status: false,
  });

  const [selectCat, setSelectCat] = useState();
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
    if (props.pageLast) {
      setTotal(props.pageLast.total);
      setLimit(props.pageLast.limit);
    }
  }, [props.pageLast]);

  useEffect(() => {
    props.loadOrders(
      `select=${select}&sort=${sort}&status=${status}&name=${filter.name}&ordertype=${filter.orderType}&user=${filter.user}&ordernumber=${filter.orderNumber}&page=${activePage}`
    );
  }, [filter, activePage]);

  //-- FUNCTIONS
  // INIT
  const init = () => {
    props.clear();
    setCategory(() => null);
    setStatus(() => null);
    setSelectCat();
    setChkBox(() => []);
    props.loadOrderTypes();
    props.loadOrders(`select=${select}`);
  };

  const addClick = () => {
    props.history.push("/local_orders/add");
  };

  const handleShow = (data) => {
    setDropShow((beforeDrop) => ({
      ...beforeDrop,
      [data]: dropShow[data] ? false : true,
    }));
  };

  const handleShowModel = () => {
    deleteModel === true ? setDeleteModel(false) : setDeleteModel(true);
  };

  const handleClose = () => {
    setDeleteModel(false);
  };

  // FILTER HANDLE
  const handleChange = (event) => {
    setFilter((bf) => ({
      ...bf,
      [event.target.name]: event.target.value,
    }));

    // props.loadPagination(props.pageLast);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const deleteClick = () => {
    let ids = [];
    chkBox.map((el) => {
      ids.push(el.id);
    });

    props.deleteMultOrder(ids);
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

  return (
    <Section>
      <MetaTags>
        <title> Stock машины захиалга | WEBR Control Panel</title>
        <meta
          name="description"
          content="Stock машины захиалга | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Stock машины захиалга | web control panel"
        />
      </MetaTags>
      <PageTitle name={`Stock машины захиалга`} />

      <div className="row">
        <div className={css.PanelControl}>
          <div className="col-md-4">
            <div className={css.PanelTabelHeader}>
              <button
                name="refresh"
                onClick={() => init()}
                className="myButton refreshBtn"
              >
                <i className="fas fa-redo-alt"></i> Сэргээх
              </button>
              {chkBox.length > 0 && (
                <button
                  name="news"
                  onClick={handleShowModel}
                  className="myButton refreshBtn deleteBtn"
                >
                  <i className="fas fa-trash-alt"></i> Устгах
                </button>
              )}
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
                    <th></th> <th> Захиалгын дугаар</th>
                    <th className="statusTh">Төлөв </th>
                    <th> Машины нэр </th>
                    <th> Бодогдсон үнэ </th>
                    <th> Хэрэглэгч </th>
                    <th> Мессеж </th>
                    <th>Нэмсэн огноо</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                <tr>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      name="orderNumber"
                      className="form-control searchInput"
                      placeholder="Захиалгын дугаараар хайх..."
                      onChange={handleChange}
                    />{" "}
                  </td>
                  <td>
                    <select
                      className="form-select"
                      name="orderType"
                      onChange={handleChange}
                    >
                      <option value=""> Төлөв сонгох </option>
                      {props.orderTypes &&
                        props.orderTypes.map((orderType) => (
                          <option value={orderType._id}>
                            {orderType.name}
                          </option>
                        ))}
                    </select>{" "}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="form-control searchInput"
                      placeholder="Машин нэрээр хайх..."
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      name="user"
                      className="form-control searchInput"
                      placeholder="Хэрэглэгчийн нэрээр хайх..."
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {props.orders &&
                  props.orders.map((el) => (
                    <tr key={el._id}>
                      <td className="checkTd">
                        <input
                          type="checkbox"
                          value={el._id}
                          className="chk"
                          onChange={handleChk}
                        />
                      </td>
                      <td> {el.orderNumber} </td>
                      <td>
                        {" "}
                        {el.orderType ? el.orderType.name : "Шинэ захиалга"}
                      </td>
                      <td>
                        {el.product_id && (
                          <a
                            href={`${myBase.siteUrl}beproduct/${el.product_id._id}`}
                            target="_blank"
                          >
                            {el.product_id.title}
                          </a>
                        )}
                      </td>
                      <td>{new Intl.NumberFormat().format(el.price)}₮</td>
                      <td> {el.userId && el.userId.firstname}</td>
                      <td>{el.message && el.message[el.message.length - 1]}</td>
                      <td>{el.createAt}</td>
                      <td>
                        <div className={css.AllActions}>
                          <Link
                            className={`${css.Actions} ${css.Edit}`}
                            to={`/stock_orders/edit/${el._id}`}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
              {props.loading === false &&
                props.orders &&
                props.orders.length < 1 && (
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
      <Model
        modelName="Сошиал хаяг устгах"
        show={deleteModel}
        handleToggle={handleClose}
      >
        <div>
          <p>
            Сонгогдсон нийт: <strong> {chkBox.length} </strong> нийтлэлийг
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
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.beorderReducer.beorders,
    orderTypes: state.orderTypeReducer.orderTypes,
    pageLast: state.beorderReducer.paginationLast,
    loading: state.beorderReducer.loading,
    success: state.beorderReducer.success,
    error: state.beorderReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(actions.clear()),
    loadOrders: (query) => dispatch(actions.loadBeorders(query)),
    loadPagination: (pageLast) => dispatch(actions.loadPagination(pageLast)),
    loadOrderTypes: (query) => dispatch(loadOrderTypes(query)),
    deleteMultOrder: (ids) => dispatch(actions.deleteMultBeorder(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
