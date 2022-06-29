import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import { Editor } from "@tinymce/tinymce-react";
import base from "../../../base";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import Dropzone from "../../../Components/General/Dropzone";
import { ToastContainer } from "react-toastify";

// LIB
import { toastControl } from "../../../lib/toasControl";
import { requiredCheck, minLength, maxLength } from "../../../lib/inputRegex";

// ACTIONS
import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";

import * as actions from "../../../redux/actions/productActions";
import { loadCarindustrys } from "../../../redux/actions/carIndustryActions";
import { loadCarzagvars } from "../../../redux/actions/carzagvarActions";
import { loadCartypes } from "../../../redux/actions/cartypeActions";
import { loadCarcolors } from "../../../redux/actions/carColorActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [checked, setChecked] = useState([]);
  const [formData, setForm] = useState({});
  const [name, setName] = useState({
    industry: "",
    zagvar: "",
  });
  const [errors, setErrors] = useState({
    title: false,
    car_industry: false,
    car_type: false,
    price: false,
    make_date: false,
    import_date: false,
    pictures: false,
  });
  const [is_showType, SetIsShowType] = useState(null);

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
      setTimeout(() => props.history.replace("/product"), 2000);
    }
  }, [props.success]);

  // DROP Files CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, pictures: props.images }));
    checkFrom("pictures", props.images);
  }, [props.images]);

  // -- INIT FUNCTION
  const init = () => {
    props.clear();
    props.removePhotos();
    props.loadCarcolors(`limit=100`);
    props.loadCarzagvars(`limit=100`);
    props.loadCarindustrys(`limit=100`);
    props.loadCartypes(`limit=100`);
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
      if (index === "pictures") {
        if (formData[index])
          for (let i = 0; i < formData[index].length; i++) {
            sendData.append([index], formData[index][i]);
          }
      } else sendData.append(index, formData[index]);
    });
    return sendData;
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
    console.log(event.target.value);
    if (event.target.name === "car_industry" && event.target.value)
      props.loadCarzagvars(`limit=100&industry=${event.target.value}`);
    else if (event.target.name === "car_industry" && event.target.value === "")
      props.loadCarzagvars(`limit=100`);
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
    console.log(formData);
    allCheck() === true
      ? props.createProduct(sendData)
      : toastControl("error", "Уучлаарай алдаа гарлаа дахин оролдоно уу!");
  };

  ///Functions

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

  return (
    <Section>
      <MetaTags>
        <title> Бэлэн машин нэмэх | WEBR Control Panel</title>
        <meta
          name="description"
          content="Бэлэн машин нэмэх | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Бэлэн машин нэмэх | web control panel"
        />
      </MetaTags>

      <PageTitle name={`Бэлэн машин нэмэх `} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Машины үйлдвэрлэгч</p>
                  <select
                    className="form-select"
                    name="car_industry"
                    onChange={handleChange}
                  >
                    <option selected value="">
                      Машины үйлдвэрлэгчидээс сонгох
                    </option>
                    {props.carIndustries &&
                      props.carIndustries.map((industry) => (
                        <option value={industry._id}>{industry.name}</option>
                      ))}
                  </select>
                  {errors.car_industry && (
                    <span className={`litleError`}>{errors.car_industry}</span>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Машины загвар</p>
                  <select
                    className="form-select"
                    name="car_zagvar"
                    onChange={handleChange}
                  >
                    <option selected value="">
                      Машины загвараас сонгох
                    </option>
                    {props.carZagvars &&
                      props.carZagvars.map((zagvar) => (
                        <option value={zagvar._id}>{zagvar.name}</option>
                      ))}
                  </select>
                  {errors.car_zagvar && (
                    <span className={`litleError`}>{errors.car_zagvar}</span>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Машины төрөл</p>
                  <select
                    className="form-select"
                    name="car_type"
                    onChange={handleChange}
                  >
                    <option selected>Машины төрлөөс сонгох</option>
                    {props.carTypes &&
                      props.carTypes.map((type) => (
                        <option value={type._id}>{type.name}</option>
                      ))}
                  </select>
                  {errors.car_type && (
                    <span className={`litleError`}>{errors.car_type}</span>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Машины өнгө</p>
                  <select
                    className="form-select"
                    name="color"
                    onChange={handleChange}
                  >
                    <option selected>Машины өнгө сонгох</option>
                    {props.carColors &&
                      props.carColors.map((color) => (
                        <option value={color._id}>{color.name}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Гарчиг </p>
                  <span> </span>
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    placeholder="Зарын гарчиг оруулна уу"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {errors.title && (
                    <span className={`litleError`}>{errors.title}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Үнэ </p>
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    placeholder="Зарах үнээ оруулна уу"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && (
                    <span className={`litleError`}>{errors.price}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Орж ирсэн он</p>
                  <select
                    className="form-select"
                    name="import_date"
                    onChange={handleChange}
                  >
                    <option selected>Орж ирсэн огноо сонгох</option>
                    {arrayYears.reverse().map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Үйлдвэрлэгдсэн он</p>
                  <select
                    className="form-select"
                    name="make_date"
                    onChange={handleChange}
                  >
                    <option selected> Үйлдвэрлэгдсэн огноо сонгох</option>
                    {arrayYears.map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Мотор /cc/</p>
                  <input
                    className="form-control"
                    type="number"
                    name="car_motor"
                    placeholder="Моторын мэдээлэл оруулна уу"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Гүйлт /km/</p>
                  <input
                    className="form-control"
                    type="number"
                    name="car_km"
                    placeholder="Гүйлтыг оруулна уу"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Машины хүрд</p>
                  <select
                    className="form-select"
                    name="car_hurd"
                    onChange={handleChange}
                  >
                    <option value="Баруун" selected>
                      Баруун
                    </option>
                    <option value="Зүүн"> Зүүн </option>
                    <option value="Бусад"> Бусад </option>
                  </select>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Шатахуун</p>
                  <select
                    className="form-select"
                    name="car_shatakhuun"
                    onChange={handleChange}
                  >
                    <option selected value="">
                      Шатахуун сонгох
                    </option>
                    <option value="Бензин">Бензин</option>
                    <option value="Газ"> Газ </option>
                    <option value="Түлш"> Түлш </option>
                    <option value="Хайбрид (Hybrid)"> Хайбрид (Hybrid)</option>
                    <option value="Цахилгаа">Цахилгаа</option>
                    <option value="Бусад">Бусад</option>
                  </select>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Хурдны хайрцаг </p>
                  <select
                    className="form-select"
                    name="car_speed_box"
                    onChange={handleChange}
                  >
                    <option selected value="">
                      Хурдны хайрцаг сонгох
                    </option>
                    <option value="Автомат">Автомат</option>
                    <option value="Автомат-CVT"> Автомат-CVT </option>
                    <option value="Механик"> Механик </option>
                    <option value="Бусад">Бусад</option>
                  </select>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group-my input-group-sm">
                  <p className={`${css.Title}`}> Лизинг, хямдралтай эсэх </p>
                  <select
                    className="form-select"
                    name="lizing"
                    onChange={handleChange}
                  >
                    <option selected value="">
                      Лизинг, хямдралтай эсэх сонгох
                    </option>
                    <option value="Лизингээр авах боломжгүй">
                      Лизингээр авах боломжгүй
                    </option>
                    <option value="Банкны лизинг болон Банк бусаар">
                      Банкны лизинг болон Банк бусаар
                    </option>
                    <option value="Банкны лизингээр авах боломжтой">
                      Банкны лизингээр авах боломжтой
                    </option>
                    <option value="Хувь лизинг">Хувь лизинг</option>
                    <option value="Хямдруулах боломжтой">
                      Хямдруулах боломжтой
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}> Машины дэлгэрэнгүй </p>
                  <Editor
                    apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                    name="description"
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount image media  code  table  ",
                      ],
                      toolbar:
                        "undo redo | fontselect fontsizeselect formatselect blockquote  | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link image | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                      file_picker_types: "image",
                      automatic_uploads: false,
                      file_picker_callback: function (cb, value, meta) {
                        var input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.onchange = async function () {
                          var file = this.files[0];
                          const fData = new FormData();
                          fData.append("file", file);
                          await props.tinymceAddPhoto(fData);
                          const url =
                            `${base.cdnUrl}uploads/photo_img_` + file.name;
                          cb(url);
                        };
                        input.click();
                      },
                    }}
                    onEditorChange={textAreaChange}
                  />
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
                    Зарагдсан эсэх
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">Холбоо барих мэдээлэл</h3>
            </div>
            <div className="card-body box-profile">
              <div className="form-group input-group-sm">
                <p className={css.ContactInfo}>
                  Та хэрэв холбоо барих мэдээлэл оруулахгүй бол ерөнхий сайтын
                  мэдээлэлд оруулсан утасны дугаар имэйл хаягыг харуулах болно
                </p>
                <p className={`${css.Title}`}> Утасны дугаар </p>
                <input
                  className="form-control"
                  type="number"
                  name="phone"
                  value={parseInt(formData.phone)}
                  placeholder="Утасны дугаараа оруулна уу"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group input-group-sm">
                <p className={`${css.Title}`}> Имэйл хаяг </p>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Имэйл хаягаа оруулна уу"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Машины зургууд
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
                    <Dropzone />
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
    images: state.imageReducer.files,
    error: state.productReducer.error,
    loading: state.productReducer.loading,
    success: state.productReducer.success,

    // REF REDUCERS
    carTypes: state.carTypeReducer.carTypes,
    carColors: state.carColorReducer.carColors,
    carIndustries: state.carIndustryReducer.carIndustrys,
    carZagvars: state.carZagvarReducer.carZagvars,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (data) => dispatch(actions.createProduct(data)),
    loadCarcolors: (query) => dispatch(loadCarcolors(query)),
    loadCarindustrys: (query) => dispatch(loadCarindustrys(query)),
    loadCarzagvars: (query) => dispatch(loadCarzagvars(query)),
    loadCartypes: (query) => dispatch(loadCartypes(query)),
    clear: () => dispatch(actions.clear()),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    removePhotos: () => dispatch(allRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
