import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_ORDERTYPE",
  };
};

// CREATE ORDERTYPE

export const createOrderType = (data) => {
  return function (dispatch) {
    dispatch(createOrderTypeStart());
    axios
      .post("typeorders", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createOrderTypeSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        dispatch(createOrderTypeError(error.message));
      });
  };
};

const createOrderTypeStart = () => {
  return {
    type: "CREATE_ORDERTYPE_START",
  };
};

const createOrderTypeSuccess = () => {
  return {
    type: "CREATE_ORDERTYPE_SUCCESS",
  };
};

const createOrderTypeError = (error) => {
  return {
    type: "CREATE_ORDERTYPE_ERROR",
    error,
  };
};

// LOAD ORDERTYPES

export const loadOrderTypes = (query = "") => {
  return function (dispatch) {
    dispatch(loadOrderTypesStart());
    axios
      .get("typeorders?" + query)
      .then((response) => {
        const loadOrderTypes = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadOrderTypesSuccess(loadOrderTypes));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(loadOrderTypesError(error.message));
      });
  };
};

export const loadOrderTypesStart = () => {
  return {
    type: "LOAD_ORDERTYPES_START",
  };
};

export const loadOrderTypesSuccess = (loadOrderTypes, pagination) => {
  return {
    type: "LOAD_ORDERTYPES_SUCCESS",
    loadOrderTypes,
    pagination,
  };
};

export const loadOrderTypesError = (error) => {
  return {
    type: "LOAD_ORDERTYPES_ERROR",
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

export const deleteMultOrderType = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("typeorders/delete", { params: { id: ids } })
      .then((response) => {
        const deleteOrderType = response.data.data;
        dispatch(deleteOrderTypeSuccess(deleteOrderType));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(deleteOrderTypeError(error.response.data.error.message));
        } else {
          dispatch(deleteOrderTypeError(error.message));
        }
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_ORDERTYPE_START",
  };
};

export const deleteOrderTypeSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_ORDERTYPE_SUCCESS",
    deleteOrderType: deleteData,
  };
};

export const deleteOrderTypeError = (error) => {
  return {
    type: "DELETE_MULT_ORDERTYPE_ERROR",
    error,
  };
};

// GET ORDERTYPE

export const getInit = () => {
  return {
    type: "GET_ORDERTYPE_INIT",
  };
};

export const getOrderType = (id) => {
  return function (dispatch) {
    dispatch(getOrderTypeStart());
    axios
      .get("typeorders/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getOrderTypeSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(getOrderTypeError(error.response.data.error.message));
        } else {
          dispatch(getOrderTypeError(error.message));
        }
      });
  };
};

export const getOrderTypeStart = () => {
  return {
    type: "GET_ORDERTYPE_START",
  };
};

export const getOrderTypeSuccess = (result) => {
  return {
    type: "GET_ORDERTYPE_SUCCESS",
    orderType: result,
  };
};

export const getOrderTypeError = (error) => {
  return {
    type: "GET_ORDERTYPE_ERROR",
    error,
  };
};

//UPDATE ORDERTYPE

export const updateOrderType = (id, data) => {
  return function (dispatch) {
    dispatch(updateOrderTypeStart());
    axios
      .put(`typeorders/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateOrderTypeSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(updateOrderTypeError(err.message));
      });
  };
};

export const updateOrderTypeStart = () => {
  return {
    type: "UPDATE_ORDERTYPE_START",
  };
};

export const updateOrderTypeSuccess = (result) => {
  return {
    type: "UPDATE_ORDERTYPE_SUCCESS",
    updateOrderType: result,
  };
};

export const updateOrderTypeError = (error) => {
  return {
    type: "UPDATE_ORDERTYPE_ERROR",
    error,
  };
};

export const getCountOrderType = () => {
  return function (dispatch) {
    dispatch(getCountOrderTypeStart());
    axios
      .get(`typeorders/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountOrderTypeSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountOrderTypeError(error));
      });
  };
};

export const getCountOrderTypeStart = () => {
  return {
    type: "GET_COUNT_ORDERTYPE_START",
  };
};

export const getCountOrderTypeSuccess = (result) => {
  return {
    type: "GET_COUNT_ORDERTYPE_SUCCESS",
    orderTypeCount: result,
  };
};

export const getCountOrderTypeError = (error) => {
  return {
    type: "GET_COUNT_ORDERTYPE_ERROR",
    error,
  };
};
