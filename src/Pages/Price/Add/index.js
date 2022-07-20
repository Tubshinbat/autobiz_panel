import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";

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
import * as actions from "../../../redux/actions/priceActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [formData, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: false,
    price: false,
    priceVal: false,
  });

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
      setTimeout(() => props.history.replace("/price"), 2000);
    }
  }, [props.success]);

  // DROP Files CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, image: props.image }));
  }, [props.image]);

  // -- INIT FUNCTION
  const init = () => {
    props.clear();
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
    console.log(formData);
    allCheck() === true
      ? props.createPrice(sendData)
      : toastControl("error", "Уучлаарай алдаа гарлаа дахин оролдоно уу!");
  };

  return (
    <Section>
      <MetaTags>
        <title> Үнийн нөхцөл нэмэх | WEBR Control Panel</title>
        <meta
          name="description"
          content="Үнийн нөхцөл нэмэх | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Үнийн нөхцөл нэмэх | web control panel"
        />
      </MetaTags>

      <PageTitle name={`Үнийн нөхцөл нэмэх `} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-12">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Тооцоолуур </p>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Тооцоолуур оруулна уу"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>

              <div className="col-md-9">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Бодох үнэ </p>
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    placeholder="Үнэ оруулна уу"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && (
                    <span className={`litleError`}>{errors.price}</span>
                  )}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Вальют эсвэл хувиар </p>
                  <select
                    className="form-select"
                    name="priceVal"
                    onChange={handleChange}
                  >
                    <option value="">
                      Хувиар эсвэл Валютын аль нэгийг сонгоно уу
                    </option>
                    <option value="₮">₮</option>
                    <option value="$">$</option>
                    <option value="¥">¥</option>
                    <option value="%">%</option>
                  </select>
                  {errors.priceVal && (
                    <span className={`litleError`}>{errors.priceVal}</span>
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
    error: state.priceReducer.error,
    loading: state.priceReducer.loading,
    success: state.priceReducer.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPrice: (data) => dispatch(actions.createPrice(data)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
