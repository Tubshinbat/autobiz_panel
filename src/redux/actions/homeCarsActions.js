import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_HOMECAR",
  };
};

export const saveHomeCars = (homecars) => {
  return function (dispatch, getState) {
    dispatch(saveHomeCarsStart());
    axios
      .post(`homecars`, homecars)
      .then((response) => {
        const result = response.data;
        dispatch(saveHomeCarsSuccess(result));
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
        dispatch(saveHomeCarsError(resError));
      });
  };
};

export const saveHomeCarsStart = () => {
  return {
    type: "SAVE_HOMECAR_START",
  };
};

export const saveHomeCarsSuccess = (result) => {
  return {
    type: "SAVE_HOMECAR_SUCCESS",
    homecars: result,
  };
};

export const saveHomeCarsError = (error) => {
  return {
    type: "SAVE_HOMECAR_ERROR",
    error,
  };
};

// LOAD HOMECAR

export const loadHomeCars = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadHomeCarsStart());
    axios
      .get("homecars?" + query)
      .then((response) => {
        const loadHomeCars = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadHomeCarsSuccess(loadHomeCars));
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
        dispatch(loadHomeCarsError(resError));
      });
  };
};

export const loadHomeCarsStart = () => {
  return {
    type: "LOAD_HOMECARS_START",
  };
};

export const loadHomeCarsSuccess = (result, pagination) => {
  return {
    type: "LOAD_HOMECARS_SUCCESS",
    beProducts: result,
    pagination,
  };
};

export const loadHomeCarsError = (error) => {
  return {
    type: "LOAD_HOMECARS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultHomeCars = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("homecars/delete", { params: { id: ids } })
      .then((response) => {
        const deleteHomeCars = response.data.data;
        dispatch(deleteHomeCarsSuccess(deleteHomeCars));
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
        dispatch(deleteHomeCarsError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_HOMECAR_START",
  };
};

export const deleteHomeCarsSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_HOMECAR_SUCCESS",
    deleteHomeCars: deleteData,
  };
};

export const deleteHomeCarsError = (error) => {
  return {
    type: "DELETE_MULT_HOMECAR_ERROR",
    error,
  };
};

// GET HOMECAR

export const getInit = () => {
  return {
    type: "GET_HOMECAR_INIT",
  };
};

export const getHomeCars = (id) => {
  return function (dispatch, getState) {
    dispatch(getHomeCarsStart());
    axios
      .get("homecars/" + id)
      .then((response) => {
        const homecars = response.data.data;
        dispatch(getHomeCarsSuccess(homecars));
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
        dispatch(getHomeCarsError(resError));
      });
  };
};

export const getHomeCarsStart = () => {
  return {
    type: "GET_HOMECAR_START",
  };
};

export const getHomeCarsSuccess = (homecars) => {
  return {
    type: "GET_HOMECAR_SUCCESS",
    singleHomeCars: homecars,
  };
};

export const getHomeCarsError = (error) => {
  return {
    type: "GET_HOMECAR_ERROR",
    error,
  };
};

// GROUP

export const groupHomeCar = (group) => {
  return function (dispatch, getState) {
    dispatch(groupHomeCarStart());
    axios
      .get("homecars/group/" + group)
      .then((response) => {
        const homecars = response.data.data;
        dispatch(groupHomeCarSuccess(homecars, group));
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
        dispatch(groupHomeCarError(resError));
      });
  };
};

export const groupHomeCarStart = () => {
  return {
    type: "GROUP_HOMECAR_START",
  };
};

export const groupHomeCarSuccess = (result, groupName) => {
  return {
    type: "GROUP_HOMECAR_SUCCESS",
    group: result,
    groupName,
  };
};

export const groupHomeCarError = (error) => {
  return {
    type: "GROUP_HOMECAR_ERROR",
    error,
  };
};

export const groupFilterHomeCar = (slug, group) => {
  return function (dispatch, getState) {
    dispatch(groupFilterHomeCarStart());
    axios
      .get("homecars/groupfilter?" + slug)
      .then((response) => {
        const homecars = response.data.data;
        dispatch(groupFilterHomeCarSuccess(homecars, group));
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
        dispatch(groupFilterHomeCarError(resError));
      });
  };
};

export const groupFilterHomeCarStart = () => {
  return {
    type: "GROUP_HOMECAR_FILTER__START",
  };
};

export const groupFilterHomeCarSuccess = (result, groupName) => {
  return {
    type: "GROUP_HOMECAR_FILTER__SUCCESS",
    group: result,
    groupName,
  };
};

export const groupFilterHomeCarError = (error) => {
  return {
    type: "GROUP_HOMECAR_FILTER__ERROR",
    error,
  };
};

//UPDATE HOMECAR

export const updateHomeCars = (id, data) => {
  return function (dispatch) {
    dispatch(updateHomeCarsStart());
    axios
      .put(`homecars/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateHomeCarsSuccess(result));
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
        dispatch(updateHomeCarsError(resError));
      });
  };
};

export const updateHomeCarsStart = () => {
  return {
    type: "UPDATE_HOMECAR_START",
  };
};

export const updateHomeCarsSuccess = (result) => {
  return {
    type: "UPDATE_HOMECAR_SUCCESS",
    updateHomeCars: result,
  };
};

export const updateHomeCarsError = (error) => {
  return {
    type: "UPDATE_HOMECAR_ERROR",
    error,
  };
};

export const getCountHomeCars = () => {
  return function (dispatch) {
    dispatch(getCountHomeCarsStart());

    axios
      .get(`homecars/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountHomeCarsSuccess(result));
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
        dispatch(getCountHomeCarsError(resError));
      });
  };
};

export const getCountHomeCarsStart = () => {
  return {
    type: "GET_COUNT_HOMECAR_START",
  };
};

export const getCountHomeCarsSuccess = (result) => {
  return {
    type: "GET_COUNT_HOMECAR_SUCCESS",
    count: result,
  };
};

export const getCountHomeCarsError = (error) => {
  return {
    type: "GET_COUNT_HOMECAR_ERROR",
    error,
  };
};
