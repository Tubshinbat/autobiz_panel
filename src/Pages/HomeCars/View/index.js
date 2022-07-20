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

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [formData, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: true,
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
      setTimeout(() => props.history.replace("/beproduct"), 2000);
    }
  }, [props.success]);

  // DROP Files CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, image: props.image }));
  }, [props.image]);

  useEffect(() => {
    if (props.beProduct) {
      setForm(() => ({ ...props.beProduct }));
      if (props.beProduct.mark_txt)
        props.groupFilterBeProduct(
          `group=model&filed=mark_txt&filter=${props.beProduct.mark_txt}`,
          "model"
        );

      if (props.beProduct.model) {
        props.groupFilterBeProduct(
          `group=type_txt&filed=model&filter=${props.beProduct.model}`,
          "type_txt"
        );
      }

      if (props.beProduct.gallery_images) {
        setImage(props.beProduct.gallery_images);
      }
    }
  }, [props.beProduct]);

  // -- INIT FUNCTION
  const init = () => {
    props.clear();
    props.removePhotos();
    props.groupProduct("mark_txt");
    props.groupProduct("type_txt");
    props.groupProduct("model");
    setForm(() => ({}));
    props.getBeProducts(props.match.params.id);
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
      if (index === "image") {
        if (formData[index])
          for (let i = 0; i < formData[index].length; i++) {
            sendData.append([index], formData[index][i]);
          }
      } else sendData.append(index, formData[index]);
    });
    sendData.append("oldImage", image);
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
      ? props.updateBeProducts(props.match.params.id, sendData)
      : toastControl("error", "Уучлаарай алдаа гарлаа дахин оролдоно уу!");
  };

  const deleteOldImage = (type) => {
    setForm((bf) => {
      delete bf[type];
      return { ...bf };
    });

    type === "image" && setImage(() => "");
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
        <title> Beforward машин | WEBR Control Panel</title>
        <meta
          name="description"
          content="Beforward машин  | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Beforward машин  | web control panel"
        />
      </MetaTags>

      <PageTitle name={`Beforward машин  `} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>Гарчиг : {formData.title}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>
                    Үйлдвэрлэгч : {formData.mark_txt}{" "}
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Загвар : {formData.model}</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>Төрөл : {formData.type_txt}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>Үнэ ($): {formData.price}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>
                    Model ref : {formData.model_ref}
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>
                    Fob байрших улс : {formData.country}
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>
                    Fob байршил : {formData.location_fob}
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>Гүйлт : {formData.mileage}</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>
                    {" "}
                    Үйлдвэрлэгдсэн он : {formData.car_year}
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Сар : {formData.mount} </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>Мотор сс : {formData.engine}</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>
                    Transmission: {formData.trans}
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}>Түлш : {formData.fuel}</p>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group ">
                  <p className={`${css.Title}`}>Машинд </p>
                  <p>{formData.features && formData.features.toString()}</p>
                </div>
              </div>

              <div className="col-md-12">
                <div className={`btns`}>
                  <button
                    name="dont"
                    className=" btn-default btn-sm my-btn"
                    onClick={backGo}
                  >
                    Буцах
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
                    checked={formData.status}
                    name="status"
                    onChange={handleRadio}
                  />
                  <label className="custom-control-label" htmlFor="newsActive">
                    Нийтэд харагдах
                  </label>
                </div>
              </div>

              <a
                href={props.beProduct.href}
                className={css.Link}
                target="_blank"
              >
                {" "}
                Beforward линк{" "}
              </a>
            </div>
          </div>

          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Beforward машинийн зураг
              </h3>
            </div>

            <div className="card-body box-profile">
              <span>
                {is_showType === "picture" &&
                  "Зургууд маань харагдахдаа энгийн мэдээнээс өөрөөр харагдана"}
              </span>
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <p> Одоо байгаа зураг </p>
                  <div className={css.Thumb}>
                    {props.beProduct.gallery_images &&
                      props.beProduct.gallery_images.map((image) => (
                        <img
                          src={`${base.cdnUrl}uploads/product/${props.beProduct.id}/product/${image}`}
                          className={`${css.OldImage} `}
                          key={`img-${image}`}
                        />
                      ))}
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
    beProduct: state.beProductsReducer.beProduct,
    image: state.imageReducer.banner,
    error: state.beProductsReducer.error,
    loading: state.beProductsReducer.loading,
    success: state.beProductsReducer.success,
    groupData: state.beProductsReducer.groupData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBeProducts: (id) => dispatch(actions.getBeProducts(id)),
    groupProduct: (groupFiled) => dispatch(actions.groupBeProduct(groupFiled)),
    groupFilterBeProduct: (slug, groupName) =>
      dispatch(actions.groupFilterBeProduct(slug, groupName)),
    updateBeProducts: (id, data) =>
      dispatch(actions.updateBeProducts(id, data)),
    clear: () => dispatch(actions.clear()),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    removePhotos: () => dispatch(allRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
