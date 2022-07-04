import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_FREEMOD",
  };
};

export const saveFreemods = (freemods) => {
  return function (dispatch, getState) {
    dispatch(saveFreemodsStart());
    axios
      .post(`freemods`, freemods)
      .then((response) => {
        const result = response.data;
        dispatch(saveFreemodsSuccess(result));
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
        dispatch(saveFreemodsError(resError));
      });
  };
};

export const saveFreemodsStart = () => {
  return {
    type: "CREATE_FREEMOD_START",
  };
};

export const saveFreemodsSuccess = (result) => {
  return {
    type: "CREATE_FREEMOD_SUCCESS",
    freemods: result,
  };
};

export const saveFreemodsError = (error) => {
  return {
    type: "CREATE_FREEMOD_ERROR",
    error,
  };
};

// LOAD FREEMOD

export const loadFreemods = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadFreemodsStart());
    axios
      .get("freemods?" + query)
      .then((response) => {
        const loadFreemods = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadFreemodsSuccess(loadFreemods));
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
        dispatch(loadFreemodsError(resError));
      });
  };
};

export const loadFreemodsStart = () => {
  return {
    type: "LOAD_FREEMODS_START",
  };
};

export const loadFreemodsSuccess = (result, pagination) => {
  return {
    type: "LOAD_FREEMODS_SUCCESS",
    freemods: result,
    pagination,
  };
};

export const loadFreemodsError = (error) => {
  return {
    type: "LOAD_FREEMODS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultFreemods = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("freemods/delete", { params: { id: ids } })
      .then((response) => {
        const deleteFreemods = response.data.data;
        dispatch(deleteFreemodsSuccess(deleteFreemods));
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
        dispatch(deleteFreemodsError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_FREEMOD_START",
  };
};

export const deleteFreemodsSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_FREEMOD_SUCCESS",
    deleteFreemods: deleteData,
  };
};

export const deleteFreemodsError = (error) => {
  return {
    type: "DELETE_MULT_FREEMOD_ERROR",
    error,
  };
};

// GET FREEMOD

export const getInit = () => {
  return {
    type: "GET_FREEMOD_INIT",
  };
};

export const getFreemods = (id) => {
  return function (dispatch, getState) {
    dispatch(getFreemodsStart());
    axios
      .get("freemods/" + id)
      .then((response) => {
        const freemods = response.data.data;
        dispatch(getFreemodsSuccess(freemods));
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
        dispatch(getFreemodsError(resError));
      });
  };
};

export const getFreemodsStart = () => {
  return {
    type: "GET_FREEMOD_START",
  };
};

export const getFreemodsSuccess = (freemods) => {
  return {
    type: "GET_FREEMOD_SUCCESS",
    singleFreemods: freemods,
  };
};

export const getFreemodsError = (error) => {
  return {
    type: "GET_FREEMOD_ERROR",
    error,
  };
};

//UPDATE FREEMOD

export const updateFreemods = (id, data) => {
  return function (dispatch) {
    dispatch(updateFreemodsStart());
    axios
      .put(`freemods/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateFreemodsSuccess(result));
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
        dispatch(updateFreemodsError(resError));
      });
  };
};

export const updateFreemodsStart = () => {
  return {
    type: "UPDATE_FREEMOD_START",
  };
};

export const updateFreemodsSuccess = (result) => {
  return {
    type: "UPDATE_FREEMOD_SUCCESS",
    updateFreemods: result,
  };
};

export const updateFreemodsError = (error) => {
  return {
    type: "UPDATE_FREEMOD_ERROR",
    error,
  };
};

export const getCountFreemods = () => {
  return function (dispatch) {
    dispatch(getCountFreemodsStart());

    axios
      .get(`freemods/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountFreemodsSuccess(result));
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
        dispatch(getCountFreemodsError(resError));
      });
  };
};

export const getCountFreemodsStart = () => {
  return {
    type: "GET_COUNT_FREEMOD_START",
  };
};

export const getCountFreemodsSuccess = (result) => {
  return {
    type: "GET_COUNT_FREEMOD_SUCCESS",
    count: result,
  };
};

export const getCountFreemodsError = (error) => {
  return {
    type: "GET_COUNT_FREEMOD_ERROR",
    error,
  };
};
