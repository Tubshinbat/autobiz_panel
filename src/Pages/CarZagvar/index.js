import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { ToastContainer } from "react-toastify";
import { toastControl } from "../../lib/toasControl";
import Pagination from "react-js-pagination";
import myBase from "../../base";

// ACTIONS
import * as actions from "../../redux/actions/carzagvarActions";
import { loadCarindustrys } from "../../redux/actions/carIndustryActions";
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

const CarZagvar = (props) => {
  // -- USESTATE
  //-- PAGINATION
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  // SEARCH STATE
  const [menu, setMenu] = useState(null);
  const [status, setStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [select, setSelect] = useState("status name image industry createAt");

  // DELETE CHECKBOX
  const [chkBox, setChkBox] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false);

  // DROPDOWN
  const [selectCat, setSelectCat] = useState();
  const [category, setCategory] = useState(null);
  const [dropShow, setDropShow] = useState({
    category: false,
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
    props.loadCarzagvars(
      `select=${select}&status=${status}&name=${searchText}&menu=${menu}&page=${activePage}`
    );
  }, [activePage]);

  //-- FUNCTIONS
  // INIT
  const init = () => {
    setMenu(() => null);
    setStatus(() => null);
    setSearchText(() => "");
    setChkBox(() => []);
    props.clear();
    props.loadCarindustrys(`limit=100`);
    props.loadCarzagvars(`select=${select}`);
  };

  const addClick = () => {
    props.history.push("/car_zagvar/add");
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
    props.loadCarzagvars(
      `select=${select}&status=${e.value}&industry=${category}&name=${searchText}&page=${activePage}`
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
    setSearchText(e.target.value);
    props.loadPagination(props.pageLast);
    props.loadCarzagvars(
      `select=${select}&status=${status}&industry=${category}&name=${e.target.value}&page=${activePage}`
    );
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const deleteClick = () => {
    let ids = [];
    chkBox.map((el) => {
      ids.push(el.id);
    });
    props.deleteMultCarzagvar(ids);
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

  const handleClickCategory = (e = null) => {
    setSelectCat(e.name || "Бүгд");
    setCategory(e._id || null);
    handleShow("category");
    const id = e ? e._id : null;
    props.loadCarzagvars(
      `select=${select}&status=${status}&name=${searchText}&industry=${id}&page=${activePage}`
    );
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

  // RENDERS
  const renderIndustry = (categories) => {
    let myCategories = [
      <li key={`myCat_0`}>
        <p className="DropdownEl" onClick={() => handleClickCategory("*")}>
          Бүгд
        </p>
      </li>,
    ];

    categories.map((el) => {
      myCategories.push(
        <li key={el._id}>
          <p className={`DropdownEl`} onClick={() => handleClickCategory(el)}>
            {el.name}
          </p>
        </li>
      );
    });
    return myCategories;
  };

  return (
    <Section>
      <MetaTags>
        <title> Машины загвар | WEBR Control Panel</title>
        <meta name="description" content="Машины загвар | WeBR control panel" />
        <meta property="og:title" content="Машины загвар | web control panel" />
      </MetaTags>
      <PageTitle name="Машины загвар" />
      <div className="row">
        <div className={css.PanelControl}>
          <div className="col-md-4">
            <div className={css.PanelTabelHeader}>
              <button
                name="addBtn"
                onClick={addClick}
                className="myButton addBtn"
              >
                <i className="fas fa-plus-circle"></i> Машины загвар
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
                  <div className="form-group">
                    <Dropdown
                      key={"category"}
                      name={!selectCat ? "Үйлдвэр" : selectCat}
                      data={renderIndustry(props.carIndustrys)}
                      handleClick={handleShow}
                      show={dropShow.category}
                      who="category"
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
                    placeholder="Хайлт хийх..."
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
                    <th>Гарчиг</th>
                    <th> Үйлдвэр </th>
                    <th>Нэмсэн огноо</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                {props.carZagvars &&
                  props.carZagvars.map((el) => (
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
                        {el.image ? (
                          <div className="tableImgBox">
                            <img
                              src={`${myBase.cdnUrl}uploads/${el.image}`}
                              className="tableImg"
                            />
                          </div>
                        ) : (
                          "Зураг олдсонгүй "
                        )}
                      </td>
                      <td>{el.name}</td>
                      <td className="categoryList">
                        {el.industry.map((el) => (
                          <Link to={`/industry`}>{el.name}</Link>
                        ))}
                      </td>
                      <td>{el.createAt}</td>
                      <td>
                        <div className={css.AllActions}>
                          <Link
                            className={`${css.Actions} ${css.Edit}`}
                            to={`/car_zagvar/edit/${el._id}`}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </table>
              {props.loading === false &&
                props.carZagvars &&
                props.carZagvars.length < 1 && (
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
    carIndustrys: state.carIndustryReducer.carIndustrys,
    carZagvars: state.carZagvarReducer.carZagvars,
    pageLast: state.carZagvarReducer.paginationLast,
    loading: state.carZagvarReducer.loading,
    success: state.carZagvarReducer.success,
    error: state.carZagvarReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(actions.clear()),
    loadCarzagvars: (query) => dispatch(actions.loadCarzagvars(query)),
    loadCarindustrys: (slug) => dispatch(loadCarindustrys(slug)),
    loadPagination: (pageLast) => dispatch(actions.loadPagination(pageLast)),
    deleteMultCarzagvar: (ids) => dispatch(actions.deleteMultCarzagvar(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarZagvar);
