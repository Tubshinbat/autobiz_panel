import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import myBase from "../../base";
import MultiSelect from "react-multiple-select-dropdown-lite";

// ACTIONS
import * as actions from "../../redux/actions/priceActions";

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

const Freemod = (props) => {
  // -- USESTATE
  //-- PAGINATION
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  // SEARCH STATE
  const [status, setStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [select, setSelect] = useState(" name createAt");
  const [sortVal, setSortVal] = useState("");

  const options = [
    { label: "Шинэ нь эхэндээ", value: `"createAt": -1` },
    { label: "Хуучин нь эхэндээ", value: `"createAt": 1` },
    { label: "Нөхцөл Я-А", value: `"name": -1` },
    { label: "Нөхцөл А-Я", value: `"name": 1` },
  ];

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
    props.loadPrices(
      `select=${select}&name=${searchText}&sort=${sortVal}&page=${activePage}`
    );
  }, [activePage, searchText, sortVal]);

  //-- FUNCTIONS
  // INIT
  const init = () => {
    setStatus(() => null);
    setSearchText(() => "");
    setChkBox(() => []);
    props.clear();
    props.loadPrices(`select=${select}`);
  };

  const addClick = () => {
    props.history.push("/price/add");
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
  };

  const handleSort = (val) => {
    setSortVal(val);
    console.log(val);
  };

  const handleShowModel = () => {
    deleteModel === true ? setDeleteModel(false) : setDeleteModel(true);
  };

  const handleClose = () => {
    setDeleteModel(false);
  };

  // FILTER HANDLE
  const handleChange = (e) => {
    setSearchText(e.target.value);
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
    props.deleteMultPrice(ids);
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
        <title> Үнэ тооцоолуур | WEBR Control Panel</title>
        <meta
          name="description"
          content="Үнэ тооцоолуур | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Үнэ тооцоолуур | web control panel"
        />
      </MetaTags>
      <PageTitle name="Үнэ тооцоолуур" />
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
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4 sortbox">
                <MultiSelect
                  onChange={handleSort}
                  placeholder="Эрэмбэлэх..."
                  options={options}
                  className="sortInput"
                />
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
                    <th>Нөхцөл</th>
                    <th> Тооцоолох </th>
                    <th>Нэмсэн огноо</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                <tr>
                  <td> </td>
                  <td>
                    <input
                      type="text"
                      name="searchText"
                      className="form-control my-input searchInput"
                      placeholder="Хайлт хийх..."
                      onChange={handleChange}
                      value={searchText && searchText}
                    />
                  </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>
                {props.prices &&
                  props.prices.map((el) => (
                    <tr key={el._id}>
                      <td className="checkTd">#</td>
                      <td>{el.name}</td>
                      <td>
                        {el.price}
                        {el.priceVal}
                      </td>

                      <td>{el.createAt}</td>
                      <td>
                        <div className={css.AllActions}>
                          <Link
                            className={`${css.Actions} ${css.Edit}`}
                            to={`/price/edit/${el._id}`}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
              {props.loading === false &&
                props.prices &&
                props.prices.length < 1 && (
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
    prices: state.priceReducer.prices,
    pageLast: state.priceReducer.paginationLast,
    loading: state.priceReducer.loading,
    success: state.priceReducer.success,
    error: state.priceReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(actions.clear()),
    loadPrices: (query) => dispatch(actions.loadPrices(query)),
    loadPagination: (pageLast) => dispatch(actions.loadPagination(pageLast)),
    deleteMultPrice: (ids) => dispatch(actions.deleteMultPrice(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Freemod);
