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

import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";

import * as actions from "../../../redux/actions/beorderActions";

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
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
    }
  }, [props.success]);

  useEffect(() => {
    if (props.order) {
      setMessage(() => props.order.message);
    }
  }, [props.order]);

  useEffect(() => {
    if (message) {
      const sendData = convertFromdata();
      props.update(props.match.params.id, sendData);
    }
  }, [message]);

  // DROP Files CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, image: props.image }));
  }, [props.image]);

  // -- INIT FUNCTION
  const init = () => {
    props.clear();
    props.removePhotos();
    setNewMessage(() => "");
    setMessage(() => null);
    setForm(() => ({}));
    props.getOrder(props.match.params.id);
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
    message.map((message) => {
      sendData.append(["message"], message);
    });

    return sendData;
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setNewMessage(event.target.value);
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

  const sendMessage = () => {
    if (requiredCheck(newMessage) === true) {
      setMessage((bm) => [...bm, newMessage]);
      setNewMessage(() => "");
    } else toastControl("error", "Хоосон мессеж илгээх боломжгүй");
  };

  const deleteOldImage = (type) => {
    setForm((bf) => {
      delete bf[type];
      return { ...bf };
    });

    type === "image" && setImage(() => "");
  };

  return (
    <Section>
      <MetaTags>
        <title> Машин захиалга | WEBR Control Panel</title>
        <meta
          name="description"
          content=" Машин захиалга | WeBR control panel"
        />
        <meta
          property="og:title"
          content=" Машин захиалга | web control panel"
        />
      </MetaTags>

      <PageTitle name={` Машин захиалга `} />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="productShow">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="productImage">
                        {props.order.product_id &&
                          props.order.product_id.gallery_images && (
                            <img
                              src={`${base.cdnUrl}uploads/product/${props.order.product_id.id}/product/${props.order.product_id.gallery_images[0]}`}
                            />
                          )}
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="productDetails">
                        <div className="productField">
                          <span> Машины нэр: </span>{" "}
                          <b>
                            {props.order.product_id &&
                              props.order.product_id.title}
                          </b>
                        </div>
                        <div className="productField">
                          <span> Машины үнэ: </span>{" "}
                          <b>
                            ¥{" "}
                            {props.order.product_id &&
                              new Intl.NumberFormat().format(
                                props.order.product_id.price
                              )}
                          </b>
                        </div>
                        <div className="productField">
                          <span> Бодогдсон үнэ: </span>{" "}
                          <b>
                            {props.order &&
                              new Intl.NumberFormat().format(
                                props.order.price
                              )}{" "}
                            ₮
                          </b>
                        </div>
                        <div className="productField">
                          {props.order.product_id && (
                            <a
                              href={`${base.siteUrl}beproduct/${props.order.product_id._id}`}
                              target="_blank"
                            >
                              Машины дэлгэрэнгүй
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className={`btns btns-order`}>
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
              <h3 className="card-title">Захиалга өгсөн</h3>
            </div>
            <div className="card-body box-profile">
              <div className="orderUser">
                <div className="userField">
                  {" "}
                  <h5> Захиалагчийн нэр: </h5>{" "}
                  {props.order.userId && props.order.userId.lastname}{" "}
                  {props.order.userId && props.order.userId.firstname}
                </div>
                <div className="userField">
                  <h5> Утасны дугаар: </h5>{" "}
                  {props.order.userId && props.order.userId.phone}{" "}
                </div>
                <div className="userField">
                  {props.order.userId && (
                    <a
                      href={`${base.baseUrl}users/view/${props.order.userId._id}`}
                    >
                      Дэлгэрэнгүй мэдээлэл
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">Мессеж</h3>
            </div>

            <div className="card-body box-profile">
              <ul className="messages">
                {message && message.length > 0 ? (
                  message.map((message) => <li key={message}> {message} </li>)
                ) : (
                  <p> Мессеж илгээгүй байна </p>
                )}
              </ul>
              <div className="messageBox">
                <textarea value={newMessage} onChange={handleChange}>
                  {" "}
                </textarea>
                <button onClick={sendMessage}> илгээх </button>
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
    order: state.beorderReducer.beorder,
    image: state.imageReducer.banner,
    error: state.beorderReducer.error,
    loading: state.beorderReducer.loading,
    success: state.beorderReducer.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (id) => dispatch(actions.getBeorder(id)),
    update: (id, data) => dispatch(actions.updateBeorder(id, data)),
    clear: () => dispatch(actions.clear()),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    removePhotos: () => dispatch(allRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
