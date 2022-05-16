import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_HYBRID",
  };
};

export const saveHybrids = (hybrids) => {
  return function (dispatch, getState) {
    dispatch(saveHybridsStart());
    axios
      .post(`hybrids`, hybrids)
      .then((response) => {
        const result = response.data;
        dispatch(saveHybridsSuccess(result));
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
        dispatch(saveHybridsError(resError));
      });
  };
};

export const saveHybridsStart = () => {
  return {
    type: "CREATE_HYBRID_START",
  };
};

export const saveHybridsSuccess = (result) => {
  return {
    type: "CREATE_HYBRID_SUCCESS",
    hybrids: result,
  };
};

export const saveHybridsError = (error) => {
  return {
    type: "CREATE_HYBRID_ERROR",
    error,
  };
};

// LOAD HYBRID

export const loadHybrids = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadHybridsStart());
    axios
      .get("hybrids?" + query)
      .then((response) => {
        const loadHybrids = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadHybridsSuccess(loadHybrids));
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
        dispatch(loadHybridsError(resError));
      });
  };
};

export const loadHybridsStart = () => {
  return {
    type: "LOAD_HYBRIDS_START",
  };
};

export const loadHybridsSuccess = (result, pagination) => {
  return {
    type: "LOAD_HYBRIDS_SUCCESS",
    hybrids: result,
    pagination,
  };
};

export const loadHybridsError = (error) => {
  return {
    type: "LOAD_HYBRIDS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultHybrids = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("hybrids/delete", { params: { id: ids } })
      .then((response) => {
        const deleteHybrids = response.data.data;
        dispatch(deleteHybridsSuccess(deleteHybrids));
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
        dispatch(deleteHybridsError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_HYBRID_START",
  };
};

export const deleteHybridsSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_HYBRID_SUCCESS",
    deleteHybrids: deleteData,
  };
};

export const deleteHybridsError = (error) => {
  return {
    type: "DELETE_MULT_HYBRID_ERROR",
    error,
  };
};

// GET HYBRID

export const getInit = () => {
  return {
    type: "GET_HYBRID_INIT",
  };
};

export const getHybrids = (id) => {
  return function (dispatch, getState) {
    dispatch(getHybridsStart());
    axios
      .get("hybrids/" + id)
      .then((response) => {
        const hybrids = response.data.data;
        dispatch(getHybridsSuccess(hybrids));
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
        dispatch(getHybridsError(resError));
      });
  };
};

export const getHybridsStart = () => {
  return {
    type: "GET_HYBRID_START",
  };
};

export const getHybridsSuccess = (hybrids) => {
  return {
    type: "GET_HYBRID_SUCCESS",
    singleHybrids: hybrids,
  };
};

export const getHybridsError = (error) => {
  return {
    type: "GET_HYBRID_ERROR",
    error,
  };
};

//UPDATE HYBRID

export const updateHybrids = (id, data) => {
  return function (dispatch) {
    dispatch(updateHybridsStart());
    axios
      .put(`hybrids/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateHybridsSuccess(result));
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
        dispatch(updateHybridsError(resError));
      });
  };
};

export const updateHybridsStart = () => {
  return {
    type: "UPDATE_HYBRID_START",
  };
};

export const updateHybridsSuccess = (result) => {
  return {
    type: "UPDATE_HYBRID_SUCCESS",
    updateHybrids: result,
  };
};

export const updateHybridsError = (error) => {
  return {
    type: "UPDATE_HYBRID_ERROR",
    error,
  };
};

export const getCountHybrids = () => {
  return function (dispatch) {
    dispatch(getCountHybridsStart());

    axios
      .get(`hybrids/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountHybridsSuccess(result));
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
        dispatch(getCountHybridsError(resError));
      });
  };
};

export const getCountHybridsStart = () => {
  return {
    type: "GET_COUNT_HYBRID_START",
  };
};

export const getCountHybridsSuccess = (result) => {
  return {
    type: "GET_COUNT_HYBRID_SUCCESS",
    count: result,
  };
};

export const getCountHybridsError = (error) => {
  return {
    type: "GET_COUNT_HYBRID_ERROR",
    error,
  };
};
