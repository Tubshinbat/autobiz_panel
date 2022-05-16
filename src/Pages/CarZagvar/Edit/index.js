import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import { useCookies } from "react-cookie";
import base from "../../../base";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import DropImage from "../../../Components/SingleDrop";
import { ToastContainer } from "react-toastify";

// LIB
import { toastControl } from "../../../lib/toasControl";
import { requiredCheck, minLength, maxLength } from "../../../lib/inputRegex";

// ACTIONS
import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";

import { loadCarindustrys } from "../../../redux/actions/carIndustryActions";
import * as actions from "../../../redux/actions/carzagvarActions";

// STYLE CSS
import css from "./__.module.css";

const Edit = (props) => {
  // USESTATE
  const [checked, setChecked] = useState([]);
  const [formData, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: true,
    industry: true,
  });
  const [is_showType, SetIsShowType] = useState(null);
  const [image, setImage] = useState("");

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
      props.clear();
      setTimeout(() => props.history.replace("/car_zagvar"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    if (props.carZagvar) {
      console.log(props.carZagvar);
      setForm(() => ({ ...props.carZagvar }));
      if (props.carZagvar.image) setImage(props.carZagvar.image);

      let c = [];
      props.carZagvar.industry &&
        props.carZagvar.industry.map((el) => c.push(el._id));
      setForm((bf) => ({ ...bf, industry: c }));
      setChecked(c);
    }
  }, [props.carZagvar]);

  // DROP Files CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, image: props.image }));
  }, [props.image]);

  // -- INIT FUNCTION
  const init = () => {
    props.clear();
    props.loadCarindustrys();
    props.removePhotos();
    props.getCarZagvar(props.match.params.id);
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
      if (index === "image" || index === "industry") {
        if (formData[index])
          for (let i = 0; i < formData[index].length; i++) {
            sendData.append([index], formData[index][i]);
          }
      } else sendData.append(index, formData[index]);
    });
    return sendData;
  };

  const is_check = (id) => {
    let result = false;
    checked.map((el) => {
      if (el === id) return (result = true);
    });
    return result;
  };

  //RENDER CATEGORIES
  const renderCarIndustry = (categories) => {
    let myCategories = [];
    categories.map((el) => {
      myCategories.push(
        <li key={el._id}>
          <div>
            <input
              className={`categoryId`}
              value={el._id}
              type="checkbox"
              name="industry"
              checked={is_check(el._id)}
              onChange={() => categoryCheck(el._id)}
            />
            <span>{el.name}</span>
          </div>
        </li>
      );
    });
    return myCategories;
  };

  const categoryCheck = (c) => {
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];
    clickedCategory === -1 ? all.push(c) : all.splice(clickedCategory, 1);

    setChecked(all);

    all.length > 0
      ? setErrors((error) => ({ ...error, industry: true }))
      : setErrors((error) => ({
          ...error,
          industry: "Загварлэгч сонгоно уу",
        }));

    setForm((beforeForm) => ({
      ...beforeForm,
      industry: all,
    }));
  };

  const deleteOldImage = (type) => {
    setForm((bf) => {
      delete bf[type];
      return { ...bf };
    });

    type === "image" && setImage(() => "");
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };

  // -- END HANDLE CHANGE INPUT

  /* -- CLICK EVENTS */
  const backGo = () => {
    props.history.goBack();
  };

  const updateClick = () => {
    const sendData = convertFromdata();
    console.log(formData);
    allCheck() === true
      ? props.updateCarzagvar(props.match.params.id, sendData)
      : toastControl("error", "Уучлаарай алдаа гарлаа дахин оролдоно уу!");
  };

  return (
    <Section>
      <MetaTags>
        <title> Машины загвар шинэчлэх | WEBR Control Panel</title>
        <meta
          name="description"
          content="Машины загвар шинэчлэх | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Машины загвар шинэчлэх | web control panel"
        />
      </MetaTags>

      <PageTitle name={`Машины загвар шинэчлэх `} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Машины загвар {useCookies}</p>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Машины загварийн  оруулна уу"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className={`btns`}>
                  <button
                    name="save"
                    onClick={updateClick}
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
        <div className="col-md-4">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">ТОХИРГОО</h3>
            </div>
            <div className="card-body box-profile">
              <div className="form-group">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="newsActive"
                    name="status"
                    checked={formData.status}
                    onChange={handleRadio}
                  />
                  <label className="custom-control-label" htmlFor="newsActive">
                    Нийтэд харагдах
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-list"></i> Машины үйлдвэр
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={`categoryBox`}>
                <ul style={{ marginTop: "10px" }}>
                  {renderCarIndustry(props.carIndustrys)}
                </ul>
                {errors.industry && (
                  <span className={`litleError`}>{errors.industry}</span>
                )}
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Машины загварийн зураг
              </h3>
            </div>

            <div className="card-body box-profile">
              <span>
                {is_showType === "picture" &&
                  "Зургууд маань харагдахдаа энгийн мэдээнээс өөрөөр харагдана"}
              </span>
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <DropImage />
                  </div>
                  <p> Одоо байгаа зураг </p>
                  <div className={css.Thumb}>
                    {image && (
                      <>
                        <img
                          src={`${base.cdnUrl}uploads/${image}`}
                          className={`${css.OldImage} `}
                        />
                        <button
                          className={`btn mybutton ${css.DeleteImgBtn}`}
                          onClick={() => deleteOldImage("image")}
                        >
                          Одоо байгааг нь устгах
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    carZagvar: state.carZagvarReducer.carZagvar,
    image: state.imageReducer.banner,
    error: state.carZagvarReducer.error,
    loading: state.carZagvarReducer.loading,
    success: state.carZagvarReducer.success,
    carIndustrys: state.carIndustryReducer.carIndustrys,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCarzagvar: (id, data) => dispatch(actions.updateCarzagvar(id, data)),
    getCarZagvar: (id) => dispatch(actions.getCarzagvar(id)),
    loadCarindustrys: () => dispatch(loadCarindustrys()),
    clear: () => dispatch(actions.clear()),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    removePhotos: () => dispatch(allRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
