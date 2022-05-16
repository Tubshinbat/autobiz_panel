import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_CARZAGVAR",
  };
};

// CREATE CARZAGVAR

export const createCarzagvar = (data) => {
  return function (dispatch) {
    dispatch(createCarzagvarStart());
    axios
      .post("carzagvars", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createCarzagvarSuccess(data));
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
        dispatch(createCarzagvarError(resError));
      });
  };
};

const createCarzagvarStart = () => {
  return {
    type: "CREATE_CARZAGVAR_START",
  };
};

const createCarzagvarSuccess = () => {
  return {
    type: "CREATE_CARZAGVAR_SUCCESS",
  };
};

const createCarzagvarError = (error) => {
  return {
    type: "CREATE_CARZAGVAR_ERROR",
    error,
  };
};

// LOAD CARZAGVARS

export const loadCarzagvars = (query = "") => {
  return function (dispatch) {
    dispatch(loadCarzagvarsStart());
    axios
      .get("carzagvars?" + query)
      .then((response) => {
        const loadCarzagvars = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadCarzagvarsSuccess(loadCarzagvars));
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

        dispatch(loadCarzagvarsError(resError));
      });
  };
};

export const loadCarzagvarsStart = () => {
  return {
    type: "LOAD_CARZAGVARS_START",
  };
};

export const loadCarzagvarsSuccess = (carZagvars, pagination) => {
  return {
    type: "LOAD_CARZAGVARS_SUCCESS",
    carZagvars,
    pagination,
  };
};

export const loadCarzagvarsError = (error) => {
  return {
    type: "LOAD_CARZAGVARS_ERROR",
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

export const deleteMultCarzagvar = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("carzagvars/delete", { params: { id: ids } })
      .then((response) => {
        const deleteCarzagvar = response.data.data;
        dispatch(deleteCarzagvarSuccess(deleteCarzagvar));
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

        dispatch(deleteCarzagvarError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_CARZAGVAR_START",
  };
};

export const deleteCarzagvarSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_CARZAGVAR_SUCCESS",
    deleteCarzagvar: deleteData,
  };
};

export const deleteCarzagvarError = (error) => {
  return {
    type: "DELETE_MULT_CARZAGVAR_ERROR",
    error,
  };
};

// GET CARZAGVAR

export const getInit = () => {
  return {
    type: "GET_CARZAGVAR_INIT",
  };
};

export const getCarzagvar = (id) => {
  return function (dispatch) {
    dispatch(getCarzagvarStart());
    axios
      .get("carzagvars/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCarzagvarSuccess(result));
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
        dispatch(getCarzagvarError(resError));
      });
  };
};

export const getCarzagvarStart = () => {
  return {
    type: "GET_CARZAGVAR_START",
  };
};

export const getCarzagvarSuccess = (result) => {
  return {
    type: "GET_CARZAGVAR_SUCCESS",
    carZagvar: result,
  };
};

export const getCarzagvarError = (error) => {
  return {
    type: "GET_CARZAGVAR_ERROR",
    error,
  };
};

//UPDATE CARZAGVAR

export const updateCarzagvar = (id, data) => {
  return function (dispatch) {
    dispatch(updateCarzagvarStart());
    axios
      .put(`carzagvars/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateCarzagvarSuccess(result));
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
        dispatch(updateCarzagvarError(resError));
      });
  };
};

export const updateCarzagvarStart = () => {
  return {
    type: "UPDATE_CARZAGVAR_START",
  };
};

export const updateCarzagvarSuccess = (result) => {
  return {
    type: "UPDATE_CARZAGVAR_SUCCESS",
    updateCarzagvar: result,
  };
};

export const updateCarzagvarError = (error) => {
  return {
    type: "UPDATE_CARZAGVAR_ERROR",
    error,
  };
};

export const getCountCarzagvar = () => {
  return function (dispatch) {
    dispatch(getCountCarzagvarStart());
    axios
      .get(`carzagvars/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountCarzagvarSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountCarzagvarError(error));
      });
  };
};

export const getCountCarzagvarStart = () => {
  return {
    type: "GET_COUNT_CARZAGVAR_START",
  };
};

export const getCountCarzagvarSuccess = (result) => {
  return {
    type: "GET_COUNT_CARZAGVAR_SUCCESS",
    orderCount: result,
  };
};

export const getCountCarzagvarError = (error) => {
  return {
    type: "GET_COUNT_CARZAGVAR_ERROR",
    error,
  };
};
