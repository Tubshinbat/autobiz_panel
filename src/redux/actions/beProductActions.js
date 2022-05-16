import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_BEPRODUCT",
  };
};

export const saveBeProducts = (beproducts) => {
  return function (dispatch, getState) {
    dispatch(saveBeProductsStart());
    axios
      .post(`beproducts`, beproducts)
      .then((response) => {
        const result = response.data;
        dispatch(saveBeProductsSuccess(result));
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
        dispatch(saveBeProductsError(resError));
      });
  };
};

export const saveBeProductsStart = () => {
  return {
    type: "SAVE_BEPRODUCT_START",
  };
};

export const saveBeProductsSuccess = (result) => {
  return {
    type: "SAVE_BEPRODUCT_SUCCESS",
    beproducts: result,
  };
};

export const saveBeProductsError = (error) => {
  return {
    type: "SAVE_BEPRODUCT_ERROR",
    error,
  };
};

// LOAD BEPRODUCT

export const loadBeProducts = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadBeProductsStart());
    axios
      .get("beproducts?" + query)
      .then((response) => {
        const loadBeProducts = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadBeProductsSuccess(loadBeProducts));
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
        dispatch(loadBeProductsError(resError));
      });
  };
};

export const loadBeProductsStart = () => {
  return {
    type: "LOAD_BEPRODUCTS_START",
  };
};

export const loadBeProductsSuccess = (result, pagination) => {
  return {
    type: "LOAD_BEPRODUCTS_SUCCESS",
    beProducts: result,
    pagination,
  };
};

export const loadBeProductsError = (error) => {
  return {
    type: "LOAD_BEPRODUCTS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultBeProducts = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("beproducts/delete", { params: { id: ids } })
      .then((response) => {
        const deleteBeProducts = response.data.data;
        dispatch(deleteBeProductsSuccess(deleteBeProducts));
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
        dispatch(deleteBeProductsError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_BEPRODUCT_START",
  };
};

export const deleteBeProductsSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_BEPRODUCT_SUCCESS",
    deleteBeProducts: deleteData,
  };
};

export const deleteBeProductsError = (error) => {
  return {
    type: "DELETE_MULT_BEPRODUCT_ERROR",
    error,
  };
};

// GET BEPRODUCT

export const getInit = () => {
  return {
    type: "GET_BEPRODUCT_INIT",
  };
};

export const getBeProducts = (id) => {
  return function (dispatch, getState) {
    dispatch(getBeProductsStart());
    axios
      .get("beproducts/" + id)
      .then((response) => {
        const beproducts = response.data.data;
        dispatch(getBeProductsSuccess(beproducts));
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
        dispatch(getBeProductsError(resError));
      });
  };
};

export const getBeProductsStart = () => {
  return {
    type: "GET_BEPRODUCT_START",
  };
};

export const getBeProductsSuccess = (beproducts) => {
  return {
    type: "GET_BEPRODUCT_SUCCESS",
    singleBeProducts: beproducts,
  };
};

export const getBeProductsError = (error) => {
  return {
    type: "GET_BEPRODUCT_ERROR",
    error,
  };
};

// GROUP

export const groupBeProduct = (group) => {
  return function (dispatch, getState) {
    dispatch(groupBeProductStart());
    axios
      .get("beproducts/group/" + group)
      .then((response) => {
        const beproducts = response.data.data;
        dispatch(groupBeProductSuccess(beproducts, group));
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
        dispatch(groupBeProductError(resError));
      });
  };
};

export const groupBeProductStart = () => {
  return {
    type: "GROUP_BEPRODUCT_START",
  };
};

export const groupBeProductSuccess = (result, groupName) => {
  return {
    type: "GROUP_BEPRODUCT_SUCCESS",
    group: result,
    groupName,
  };
};

export const groupBeProductError = (error) => {
  return {
    type: "GROUP_BEPRODUCT_ERROR",
    error,
  };
};

export const groupFilterBeProduct = (slug, group) => {
  return function (dispatch, getState) {
    dispatch(groupFilterBeProductStart());
    axios
      .get("beproducts/groupfilter?" + slug)
      .then((response) => {
        const beproducts = response.data.data;
        dispatch(groupFilterBeProductSuccess(beproducts, group));
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
        dispatch(groupFilterBeProductError(resError));
      });
  };
};

export const groupFilterBeProductStart = () => {
  return {
    type: "GROUP_BEPRODUCT_FILTER__START",
  };
};

export const groupFilterBeProductSuccess = (result, groupName) => {
  return {
    type: "GROUP_BEPRODUCT_FILTER__SUCCESS",
    group: result,
    groupName,
  };
};

export const groupFilterBeProductError = (error) => {
  return {
    type: "GROUP_BEPRODUCT_FILTER__ERROR",
    error,
  };
};

//UPDATE BEPRODUCT

export const updateBeProducts = (id, data) => {
  return function (dispatch) {
    dispatch(updateBeProductsStart());
    axios
      .put(`beproducts/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateBeProductsSuccess(result));
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
        dispatch(updateBeProductsError(resError));
      });
  };
};

export const updateBeProductsStart = () => {
  return {
    type: "UPDATE_BEPRODUCT_START",
  };
};

export const updateBeProductsSuccess = (result) => {
  return {
    type: "UPDATE_BEPRODUCT_SUCCESS",
    updateBeProducts: result,
  };
};

export const updateBeProductsError = (error) => {
  return {
    type: "UPDATE_BEPRODUCT_ERROR",
    error,
  };
};

export const getCountBeProducts = () => {
  return function (dispatch) {
    dispatch(getCountBeProductsStart());

    axios
      .get(`beproducts/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountBeProductsSuccess(result));
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
        dispatch(getCountBeProductsError(resError));
      });
  };
};

export const getCountBeProductsStart = () => {
  return {
    type: "GET_COUNT_BEPRODUCT_START",
  };
};

export const getCountBeProductsSuccess = (result) => {
  return {
    type: "GET_COUNT_BEPRODUCT_SUCCESS",
    count: result,
  };
};

export const getCountBeProductsError = (error) => {
  return {
    type: "GET_COUNT_BEPRODUCT_ERROR",
    error,
  };
};
