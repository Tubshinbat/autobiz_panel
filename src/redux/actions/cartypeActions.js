import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_CARTYPE",
  };
};

// CREATE CARTYPE

export const createCartype = (data) => {
  return function (dispatch) {
    dispatch(createCartypeStart());
    axios
      .post("cartypes", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createCartypeSuccess(data));
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
        dispatch(createCartypeError(resError));
      });
  };
};

const createCartypeStart = () => {
  return {
    type: "CREATE_CARTYPE_START",
  };
};

const createCartypeSuccess = () => {
  return {
    type: "CREATE_CARTYPE_SUCCESS",
  };
};

const createCartypeError = (error) => {
  return {
    type: "CREATE_CARTYPE_ERROR",
    error,
  };
};

// LOAD CARTYPES

export const loadCartypes = (query = "") => {
  return function (dispatch) {
    dispatch(loadCartypesStart());
    axios
      .get("cartypes?" + query)
      .then((response) => {
        const loadCartypes = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadCartypesSuccess(loadCartypes));
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

        dispatch(loadCartypesError(resError));
      });
  };
};

export const loadCartypesStart = () => {
  return {
    type: "LOAD_CARTYPES_START",
  };
};

export const loadCartypesSuccess = (carTypes, pagination) => {
  return {
    type: "LOAD_CARTYPES_SUCCESS",
    carTypes,
    pagination,
  };
};

export const loadCartypesError = (error) => {
  return {
    type: "LOAD_CARTYPES_ERROR",
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

export const deleteMultCartype = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("cartypes/delete", { params: { id: ids } })
      .then((response) => {
        const deleteCartype = response.data.data;
        dispatch(deleteCartypeSuccess(deleteCartype));
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

        dispatch(deleteCartypeError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_CARTYPE_START",
  };
};

export const deleteCartypeSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_CARTYPE_SUCCESS",
    deleteCartype: deleteData,
  };
};

export const deleteCartypeError = (error) => {
  return {
    type: "DELETE_MULT_CARTYPE_ERROR",
    error,
  };
};

// GET CARTYPE

export const getInit = () => {
  return {
    type: "GET_CARTYPE_INIT",
  };
};

export const getCartype = (id) => {
  return function (dispatch) {
    dispatch(getCartypeStart());
    axios
      .get("cartypes/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCartypeSuccess(result));
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
        dispatch(getCartypeError(resError));
      });
  };
};

export const getCartypeStart = () => {
  return {
    type: "GET_CARTYPE_START",
  };
};

export const getCartypeSuccess = (result) => {
  return {
    type: "GET_CARTYPE_SUCCESS",
    carType: result,
  };
};

export const getCartypeError = (error) => {
  return {
    type: "GET_CARTYPE_ERROR",
    error,
  };
};

//UPDATE CARTYPE

export const updateCartype = (id, data) => {
  return function (dispatch) {
    dispatch(updateCartypeStart());
    axios
      .put(`cartypes/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateCartypeSuccess(result));
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
        dispatch(updateCartypeError(resError));
      });
  };
};

export const updateCartypeStart = () => {
  return {
    type: "UPDATE_CARTYPE_START",
  };
};

export const updateCartypeSuccess = (result) => {
  return {
    type: "UPDATE_CARTYPE_SUCCESS",
    updateCartype: result,
  };
};

export const updateCartypeError = (error) => {
  return {
    type: "UPDATE_CARTYPE_ERROR",
    error,
  };
};

export const getCountCartype = () => {
  return function (dispatch) {
    dispatch(getCountCartypeStart());
    axios
      .get(`cartypes/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountCartypeSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountCartypeError(error));
      });
  };
};

export const getCountCartypeStart = () => {
  return {
    type: "GET_COUNT_CARTYPE_START",
  };
};

export const getCountCartypeSuccess = (result) => {
  return {
    type: "GET_COUNT_CARTYPE_SUCCESS",
    orderCount: result,
  };
};

export const getCountCartypeError = (error) => {
  return {
    type: "GET_COUNT_CARTYPE_ERROR",
    error,
  };
};
