import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { toastControl } from "../../lib/toasControl";
import { useCookies } from "react-cookie";
import { regEmail } from "../../lib/inputRegex";
// Style
import css from "./__.module.css";
// ACtions
import * as actions from "../../redux/actions/loginActions";

const Login = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["autobiztoken"]);

  // init
  useEffect(() => {
    if (cookies.autobiztoken) {
      document.location.href = "/";
    }
  }, []);

  const [form, setForm] = useState({});

  //handle inputs
  const handleChange = (event) => {
    let val = event.target.value;

    setForm((bf) => ({
      ...bf,
      [event.target.name]: val,
    }));
  };

  // Login
  const sendEmail = () => {
    if (regEmail(form.email)) {
      props.forgetPassword(form);
    } else {
      toastControl("error", "Утасны дугаараа оруулна уу");
    }
  };

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна

  useEffect(() => {
    if (props.error) {
      toastControl("error", props.error);
    }
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
    }
  }, [props.success]);

  return (
    <body className="hold-transition login-page">
      {/* {document.cookie && <Redirect to="/" />} */}
      <div className="login-box">
        <div className={`login-logo ${css.LoginLogo}`}>
          <b>Нууц үг сэргээх</b>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <div className={`input-group mb-3 ${css.LoginInput}`}>
              <input
                type="text"
                className="form-control"
                placeholder="Бүртгэлтэй имэйл хаягаа оруулна уу"
                name="email"
                onChange={handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envate" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  type="button"
                  onClick={sendEmail}
                  className={`btn btn-primary btn-block ${css.LoginBtn}`}
                >
                  Нэвтрэх
                </button>
              </div>
            </div>
            <p className={`mb-1 ${css.ForgetText}`}>
              <Link to="/login">Надад бүртгэл байгаа?</Link>
            </p>
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
    </body>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.loginReducer.error,
    token: state.loginReducer.token,
    success: state.loginReducer.success,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    forgetPassword: (data) => dispatch(actions.forgetPassword(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Login);
