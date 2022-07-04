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
import * as actions from "../../../redux/actions/hybridActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [formData, setForm] = useState({});
  const [errors, setErrors] = useState({
    model: false,
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
      setTimeout(() => props.history.replace("/hybrid"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    setForm(() => ({ model: props.hybrid.model }));
  }, [props.hybrid]);

  // -- INIT FUNCTION
  const init = () => {
    props.clear();
    props.getHybrid(props.match.params.id);
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
      if (name === "model" && result === true) {
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
      ? props.updateHybrids(props.match.params.id, sendData)
      : toastControl("error", "Уучлаарай алдаа гарлаа дахин оролдоно уу!");
  };

  return (
    <Section>
      <MetaTags>
        <title> Машины арал нэмэх | WEBR Control Panel</title>
        <meta
          name="description"
          content="Машины арал нэмэх | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Машины арал нэмэх | web control panel"
        />
      </MetaTags>

      <PageTitle name={`Машины арал нэмэх `} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-12">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Машины арал </p>
                  <input
                    className="form-control"
                    type="text"
                    name="model"
                    placeholder="Машины арал  оруулна уу"
                    value={formData.model}
                    onChange={handleChange}
                  />
                  {errors.model && (
                    <span className={`litleError`}>{errors.model}</span>
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
    image: state.imageReducer.banner,
    error: state.hybridReducer.error,
    loading: state.hybridReducer.loading,
    success: state.hybridReducer.success,
    hybrid: state.hybridReducer.hybrid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateHybrids: (id, data) => dispatch(actions.updateHybrids(id, data)),
    getHybrid: (id) => dispatch(actions.getHybrids(id)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
