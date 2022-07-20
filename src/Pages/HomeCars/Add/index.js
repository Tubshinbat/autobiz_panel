import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import base from "../../../base";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import Dropzone from "../../../Components/General/Dropzone";
import TagInput from "@pymatech/react-tag-input";

import { ToastContainer } from "react-toastify";

// LIB
import { toastControl } from "../../../lib/toasControl";
import { requiredCheck, minLength, maxLength } from "../../../lib/inputRegex";

// ACTIONS
import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";

import * as actions from "../../../redux/actions/beProductActions";
import * as homeActions from "../../../redux/actions/homeCarsActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [formData, setForm] = useState({});
  const [errors, setErrors] = useState({
    mark_txt: false,
    model: false,
    minPrice: false,
    maxPrice: false,
    minDate: false,
    maxDate: false,
    qty: false,
  });
  const [is_showType, SetIsShowType] = useState(null);
  const [image, setImage] = useState("");
  const [markTxt, setMarkTxt] = useState([]);
  const [typeTxt, setTypeTxt] = useState([]);
  const [model, setModel] = useState([]);

  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (props.groupData) {
      const keys = Object.keys(props.groupData);
      console.log(props.groupData);
      keys.map((key) => {
        if (key == "mark_txt") setMarkTxt(props.groupData[key]);
        if (key == "type_txt") setTypeTxt(props.groupData[key]);
        if (key == "model") setModel(props.groupData[key]);
      });
    }
  }, [props.groupData]);

  useEffect(() => {
    props.groupFilterBeProduct(
      `group=model&filed=mark_txt&filter=${formData.mark_txt}`,
      "model"
    );
  }, [formData.mark_txt]);

  useEffect(() => {
    props.groupFilterBeProduct(
      `group=type_txt&filed=model&filter=${formData.model}`,
      "type_txt"
    );
  }, [formData.model]);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      props.clear();
      setTimeout(() => props.history.replace("/home_cars"), 2000);
    }
  }, [props.success]);

  // -- INIT FUNCTION
  const init = () => {
    props.clear();
    props.removePhotos();
    props.groupProduct("mark_txt");
    props.groupProduct("type_txt");
    props.groupProduct("model");
    setForm(() => ({}));
  };

  //CHECK FORM FUNCTION
  const checkName = (el, name) => {
    return name === el;
  };

  const checkFrom = (name, val) => {
    // Шалгах формуудаа энд тодорхойлоно
    const valueErrors = Object.keys(errors);
    if (valueErrors.find((el) => checkName(el, name))) {
      let result = requiredCheck(val);
      if (name === "name" && result === true) {
        result = minLength(val, 2);
        result === true && (result = maxLength(val, 300));
      }
      setErrors((bfError) => ({ ...bfError, [name]: result }));
    }
  };

  const checkTrue = () => {
    let errorCount = 0;
    let errorsValues = Object.values(errors);
    errorsValues.map((el) => {
      el === true && errorCount++;
    });
    return errorsValues.length === errorCount;
  };

  const allCheck = () => {
    Object.keys(errors).map((el) => {
      checkFrom(el, formData[el] === undefined ? "" : formData[el]);
    });
    return checkTrue();
  };

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(formData).map((index) => {
      sendData.append(index, formData[index]);
    });
    return sendData;
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  const textAreaChange = (event) => {
    setForm((bf) => ({ ...bf, details: event }));
    checkFrom("details", event);
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };

  // -- END HANDLE CHANGE INPUT

  /* -- CLICK EVENTS */
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    const sendData = convertFromdata();

    allCheck() === true
      ? props.createCars(sendData)
      : toastControl("error", "Уучлаарай алдаа гарлаа дахин оролдоно уу!");
  };

  const years = () => {
    const currentYear = new Date().getFullYear();
    let years = [];
    let startYear = 1920;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  };

  const arrayYears = years();

  const mount = [];

  for (let i = 1; i <= 12; i++) {
    mount.push(i);
  }

  return (
    <Section>
      <MetaTags>
        <title> Нүүрэнд харагдах машин нэмэх | WEBR Control Panel</title>
        <meta
          name="description"
          content="Нүүрэнд харагдах машин нэмэх | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Нүүрэнд харагдах машин нэмэх | web control panel"
        />
      </MetaTags>

      <PageTitle name={`Нүүрэнд харагдах машин нэмэх `} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-12">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Үйлдвэрлэгч </p>
                  <select
                    className="form-select"
                    name="mark_txt"
                    onChange={handleChange}
                    value={formData.mark_txt}
                  >
                    <option selected value="">
                      Машины үйлдвэрлэгчидээс сонгох
                    </option>
                    {markTxt &&
                      markTxt.map((industry) => (
                        <option value={industry._id}>{industry._id}</option>
                      ))}
                  </select>
                  {errors.mark_txt && (
                    <span className={`litleError`}>{errors.mark_txt}</span>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Загвар </p>
                  <select
                    className="form-select"
                    name="model"
                    onChange={handleChange}
                    value={formData.model}
                  >
                    <option selected value="">
                      Машины загвараас сонгох
                    </option>
                    {model &&
                      model.map((mod) => (
                        <option value={mod._id}>{mod._id}</option>
                      ))}
                  </select>
                  {errors.model && (
                    <span className={`litleError`}>{errors.model}</span>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Төрөл </p>
                  <select
                    className="form-select"
                    name="type_txt"
                    onChange={handleChange}
                    value={formData.type_txt}
                  >
                    <option selected value="">
                      Машины загвараас сонгох
                    </option>
                    {typeTxt &&
                      typeTxt.map((type) => (
                        <option value={type._id}>{type._id}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>Доод үнэ (¥)</p>
                  <input
                    className="form-control"
                    type="number"
                    name="minPrice"
                    placeholder="Үнэ (¥)"
                    value={formData.minPrice}
                    onChange={handleChange}
                  />
                  {errors.minPrice && (
                    <span className={`litleError`}>{errors.minPrice}</span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>Дээд үнэ (¥)</p>
                  <input
                    className="form-control"
                    type="number"
                    name="maxPrice"
                    placeholder="Үнэ (¥)"
                    value={formData.maxPrice}
                    onChange={handleChange}
                  />
                  {errors.maxPrice && (
                    <span className={`litleError`}>{errors.maxPrice}</span>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Доод үйлдвэрлэгдсэн он</p>
                  <select
                    className="form-select"
                    name="minDate"
                    onChange={handleChange}
                    value={formData.minDate}
                  >
                    <option>Үйлдвэрлэгдсэн огноо сонгох</option>
                    {arrayYears.map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.minDate && (
                    <span className={`litleError`}>{errors.minDate}</span>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Дээд үйлдвэрлэгдсэн он</p>
                  <select
                    className="form-select"
                    name="maxDate"
                    onChange={handleChange}
                    value={formData.maxDate}
                  >
                    <option>Үйлдвэрлэгдсэн огноо сонгох</option>
                    {arrayYears.reverse().map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.maxDate && (
                    <span className={`litleError`}>{errors.maxDate}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>Харуулах тоо</p>
                  <input
                    className="form-control"
                    type="text"
                    name="qty"
                    placeholder="Харуулах тоо "
                    value={formData.qty}
                    onChange={handleChange}
                  />
                  {errors.qty && (
                    <span className={`litleError`}>{errors.qty}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className={`btns`}>
                  <button
                    name="save"
                    onClick={addClick}
                    className={` btn-success btn-sm my-btn add-btn`}
                  >
                    <i className="fas fa-share"></i> Хадгалах
                  </button>

                  <button
                    name="dont"
                    className=" btn-default btn-sm my-btn"
                    onClick={backGo}
                  >
                    Болих
                  </button>
                </div>
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
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.homeCarsReducer.error,
    loading: state.homeCarsReducer.loading,
    success: state.homeCarsReducer.success,
    groupData: state.beProductsReducer.groupData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBeProducts: (id) => dispatch(actions.getBeProducts(id)),
    groupProduct: (groupFiled) => dispatch(actions.groupBeProduct(groupFiled)),
    groupFilterBeProduct: (slug, groupName) =>
      dispatch(actions.groupFilterBeProduct(slug, groupName)),
    createCars: (data) => dispatch(homeActions.saveHomeCars(data)),
    clear: () => dispatch(actions.clear()),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    removePhotos: () => dispatch(allRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
