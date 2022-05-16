import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_CARCOLOR",
  };
};

// CREATE CARCOLOR

export const createCarcolor = (data) => {
  return function (dispatch) {
    dispatch(createCarcolorStart());
    axios
      .post("carcolors", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createCarcolorSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(createCarcolorError(resError));
      });
  };
};

const createCarcolorStart = () => {
  return {
    type: "CREATE_CARCOLOR_START",
  };
};

const createCarcolorSuccess = () => {
  return {
    type: "CREATE_CARCOLOR_SUCCESS",
  };
};

const createCarcolorError = (error) => {
  return {
    type: "CREATE_CARCOLOR_ERROR",
    error,
  };
};

// LOAD CARCOLORS

export const loadCarcolors = (query = "") => {
  return function (dispatch) {
    dispatch(loadCarcolorsStart());
    axios
      .get("carcolors?" + query)
      .then((response) => {
        const loadCarcolors = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadCarcolorsSuccess(loadCarcolors));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }

        dispatch(loadCarcolorsError(resError));
      });
  };
};

export const loadCarcolorsStart = () => {
  return {
    type: "LOAD_CARCOLORS_START",
  };
};

export const loadCarcolorsSuccess = (carColors, pagination) => {
  return {
    type: "LOAD_CARCOLORS_SUCCESS",
    carColors,
    pagination,
  };
};

export const loadCarcolorsError = (error) => {
  return {
    type: "LOAD_CARCOLORS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

// DELETE MULT

export const deleteMultCarcolor = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("carcolors/delete", { params: { id: ids } })
      .then((response) => {
        const deleteCarcolor = response.data.data;
        dispatch(deleteCarcolorSuccess(deleteCarcolor));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }

        dispatch(deleteCarcolorError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_CARCOLOR_START",
  };
};

export const deleteCarcolorSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_CARCOLOR_SUCCESS",
    deleteCarcolor: deleteData,
  };
};

export const deleteCarcolorError = (error) => {
  return {
    type: "DELETE_MULT_CARCOLOR_ERROR",
    error,
  };
};

// GET CARCOLOR

export const getInit = () => {
  return {
    type: "GET_CARCOLOR_INIT",
  };
};

export const getCarcolor = (id) => {
  return function (dispatch) {
    dispatch(getCarcolorStart());
    axios
      .get("carcolors/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCarcolorSuccess(result));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(getCarcolorError(resError));
      });
  };
};

export const getCarcolorStart = () => {
  return {
    type: "GET_CARCOLOR_START",
  };
};

export const getCarcolorSuccess = (result) => {
  return {
    type: "GET_CARCOLOR_SUCCESS",
    carColor: result,
  };
};

export const getCarcolorError = (error) => {
  return {
    type: "GET_CARCOLOR_ERROR",
    error,
  };
};

//UPDATE CARCOLOR

export const updateCarcolor = (id, data) => {
  return function (dispatch) {
    dispatch(updateCarcolorStart());
    axios
      .put(`carcolors/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateCarcolorSuccess(result));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

        if (error.message) {
          resError = error.message;
        }

        if (
          error.response !== undefined &&
          error.response.status !== undefined
        ) {
          resError = error.response.status;
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.error !== undefined
        ) {
          resError = error.response.data.error.message;
        }
        dispatch(updateCarcolorError(resError));
      });
  };
};

export const updateCarcolorStart = () => {
  return {
    type: "UPDATE_CARCOLOR_START",
  };
};

export const updateCarcolorSuccess = (result) => {
  return {
    type: "UPDATE_CARCOLOR_SUCCESS",
    updateCarcolor: result,
  };
};

export const updateCarcolorError = (error) => {
  return {
    type: "UPDATE_CARCOLOR_ERROR",
    error,
  };
};

export const getCountCarcolor = () => {
  return function (dispatch) {
    dispatch(getCountCarcolorStart());
    axios
      .get(`carcolors/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountCarcolorSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountCarcolorError(error));
      });
  };
};

export const getCountCarcolorStart = () => {
  return {
    type: "GET_COUNT_CARCOLOR_START",
  };
};

export const getCountCarcolorSuccess = (result) => {
  return {
    type: "GET_COUNT_CARCOLOR_SUCCESS",
    orderCount: result,
  };
};

export const getCountCarcolorError = (error) => {
  return {
    type: "GET_COUNT_CARCOLOR_ERROR",
    error,
  };
};
