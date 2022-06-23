import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_ORDER",
  };
};

// CREATE ORDER

export const createOrder = (data) => {
  return function (dispatch) {
    dispatch(createOrderStart());
    axios
      .post("orders", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createOrderSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        dispatch(createOrderError(error.message));
      });
  };
};

const createOrderStart = () => {
  return {
    type: "CREATE_ORDER_START",
  };
};

const createOrderSuccess = () => {
  return {
    type: "CREATE_ORDER_SUCCESS",
  };
};

const createOrderError = (error) => {
  return {
    type: "CREATE_ORDER_ERROR",
    error,
  };
};

// LOAD ORDERS

export const loadOrders = (query = "") => {
  return function (dispatch) {
    dispatch(loadOrdersStart());
    axios
      .get("orders?" + query)
      .then((response) => {
        const loadOrders = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadOrdersSuccess(loadOrders));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(loadOrdersError(error.message));
      });
  };
};

export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};

export const loadOrdersSuccess = (loadOrders, pagination) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    loadOrders,
    pagination,
  };
};

export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
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

export const deleteMultOrder = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("orders/delete", { params: { id: ids } })
      .then((response) => {
        const deleteOrder = response.data.data;
        dispatch(deleteOrderSuccess(deleteOrder));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(deleteOrderError(error.response.data.error.message));
        } else {
          dispatch(deleteOrderError(error.message));
        }
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_ORDER_START",
  };
};

export const deleteOrderSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_ORDER_SUCCESS",
    deleteOrder: deleteData,
  };
};

export const deleteOrderError = (error) => {
  return {
    type: "DELETE_MULT_ORDER_ERROR",
    error,
  };
};

// GET ORDER

export const getInit = () => {
  return {
    type: "GET_ORDER_INIT",
  };
};

export const getOrder = (id) => {
  return function (dispatch) {
    dispatch(getOrderStart());
    axios
      .get("orders/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getOrderSuccess(result));
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
        dispatch(getOrderError(resError));
      });
  };
};

export const getOrderStart = () => {
  return {
    type: "GET_ORDER_START",
  };
};

export const getOrderSuccess = (result) => {
  return {
    type: "GET_ORDER_SUCCESS",
    order: result,
  };
};

export const getOrderError = (error) => {
  return {
    type: "GET_ORDER_ERROR",
    error,
  };
};

//UPDATE ORDER

export const updateOrder = (id, data) => {
  return function (dispatch) {
    dispatch(updateOrderStart());
    axios
      .put(`orders/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateOrderSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(updateOrderError(err.message));
      });
  };
};

export const updateOrderStart = () => {
  return {
    type: "UPDATE_ORDER_START",
  };
};

export const updateOrderSuccess = (result) => {
  return {
    type: "UPDATE_ORDER_SUCCESS",
    updateOrder: result,
  };
};

export const updateOrderError = (error) => {
  return {
    type: "UPDATE_ORDER_ERROR",
    error,
  };
};

export const getCountOrder = () => {
  return function (dispatch) {
    dispatch(getCountOrderStart());
    axios
      .get(`orders/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountOrderSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountOrderError(error));
      });
  };
};

export const getCountOrderStart = () => {
  return {
    type: "GET_COUNT_ORDER_START",
  };
};

export const getCountOrderSuccess = (result) => {
  return {
    type: "GET_COUNT_ORDER_SUCCESS",
    orderCount: result,
  };
};

export const getCountOrderError = (error) => {
  return {
    type: "GET_COUNT_ORDER_ERROR",
    error,
  };
};
