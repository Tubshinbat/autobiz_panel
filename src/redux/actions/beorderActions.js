import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_BEORDER",
  };
};

// CREATE BEORDER

export const createBeorder = (data) => {
  return function (dispatch) {
    dispatch(createBeorderStart());
    axios
      .post("beorders", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createBeorderSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        dispatch(createBeorderError(error.message));
      });
  };
};

const createBeorderStart = () => {
  return {
    type: "CREATE_BEORDER_START",
  };
};

const createBeorderSuccess = () => {
  return {
    type: "CREATE_BEORDER_SUCCESS",
  };
};

const createBeorderError = (error) => {
  return {
    type: "CREATE_BEORDER_ERROR",
    error,
  };
};

// LOAD BEORDERS

export const loadBeorders = (query = "") => {
  return function (dispatch) {
    dispatch(loadBeordersStart());
    axios
      .get("beorders?" + query)
      .then((response) => {
        const loadBeorders = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadBeordersSuccess(loadBeorders));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(loadBeordersError(error.message));
      });
  };
};

export const loadBeordersStart = () => {
  return {
    type: "LOAD_BEORDERS_START",
  };
};

export const loadBeordersSuccess = (loadBeorders, pagination) => {
  return {
    type: "LOAD_BEORDERS_SUCCESS",
    loadBeorders,
    pagination,
  };
};

export const loadBeordersError = (error) => {
  return {
    type: "LOAD_BEORDERS_ERROR",
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

export const deleteMultBeorder = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("beorders/delete", { params: { id: ids } })
      .then((response) => {
        const deleteBeorder = response.data.data;
        dispatch(deleteBeorderSuccess(deleteBeorder));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(deleteBeorderError(error.response.data.error.message));
        } else {
          dispatch(deleteBeorderError(error.message));
        }
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_BEORDER_START",
  };
};

export const deleteBeorderSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_BEORDER_SUCCESS",
    deleteBeorder: deleteData,
  };
};

export const deleteBeorderError = (error) => {
  return {
    type: "DELETE_MULT_BEORDER_ERROR",
    error,
  };
};

// GET BEORDER

export const getInit = () => {
  return {
    type: "GET_BEORDER_INIT",
  };
};

export const getBeorder = (id) => {
  return function (dispatch) {
    dispatch(getBeorderStart());
    axios
      .get("beorders/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getBeorderSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(getBeorderError(error.response.data.error.message));
        } else {
          dispatch(getBeorderError(error.message));
        }
      });
  };
};

export const getBeorderStart = () => {
  return {
    type: "GET_BEORDER_START",
  };
};

export const getBeorderSuccess = (result) => {
  return {
    type: "GET_BEORDER_SUCCESS",
    beorder: result,
  };
};

export const getBeorderError = (error) => {
  return {
    type: "GET_BEORDER_ERROR",
    error,
  };
};

//UPDATE BEORDER

export const updateBeorder = (id, data) => {
  return function (dispatch) {
    dispatch(updateBeorderStart());
    axios
      .put(`beorders/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateBeorderSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(updateBeorderError(err.message));
      });
  };
};

export const updateBeorderStart = () => {
  return {
    type: "UPDATE_BEORDER_START",
  };
};

export const updateBeorderSuccess = (result) => {
  return {
    type: "UPDATE_BEORDER_SUCCESS",
    updateBeorder: result,
  };
};

export const updateBeorderError = (error) => {
  return {
    type: "UPDATE_BEORDER_ERROR",
    error,
  };
};

export const getCountBeorder = () => {
  return function (dispatch) {
    dispatch(getCountBeorderStart());
    axios
      .get(`beorders/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountBeorderSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountBeorderError(error));
      });
  };
};

export const getCountBeorderStart = () => {
  return {
    type: "GET_COUNT_BEORDER_START",
  };
};

export const getCountBeorderSuccess = (result) => {
  return {
    type: "GET_COUNT_BEORDER_SUCCESS",
    orderCount: result,
  };
};

export const getCountBeorderError = (error) => {
  return {
    type: "GET_COUNT_BEORDER_ERROR",
    error,
  };
};
