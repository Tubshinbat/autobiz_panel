import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_PRICE",
  };
};

// CREATE PRICE

export const createPrice = (data) => {
  return function (dispatch) {
    dispatch(createPriceStart());
    axios
      .post("prices", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createPriceSuccess(data));
      })
      .catch((error) => {
        let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";
        dispatch(createPriceError(error.message));
      });
  };
};

const createPriceStart = () => {
  return {
    type: "CREATE_PRICE_START",
  };
};

const createPriceSuccess = () => {
  return {
    type: "CREATE_PRICE_SUCCESS",
  };
};

const createPriceError = (error) => {
  return {
    type: "CREATE_PRICE_ERROR",
    error,
  };
};

// LOAD PRICES

export const loadPrices = (query = "") => {
  return function (dispatch) {
    dispatch(loadPricesStart());
    axios
      .get("prices?" + query)
      .then((response) => {
        const loadPrices = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadPricesSuccess(loadPrices));
        dispatch(loadPagination(pagination));
      })
      .catch((err) => {
        const error = { ...err };

        dispatch(loadPricesError(error.message));
      });
  };
};

export const loadPricesStart = () => {
  return {
    type: "LOAD_PRICES_START",
  };
};

export const loadPricesSuccess = (loadPrices, pagination) => {
  return {
    type: "LOAD_PRICES_SUCCESS",
    loadPrices,
    pagination,
  };
};

export const loadPricesError = (error) => {
  return {
    type: "LOAD_PRICES_ERROR",
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

export const deleteMultPrice = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("prices/delete", { params: { id: ids } })
      .then((response) => {
        const deletePrice = response.data.data;
        dispatch(deletePriceSuccess(deletePrice));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(deletePriceError(error.response.data.error.message));
        } else {
          dispatch(deletePriceError(error.message));
        }
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_PRICE_START",
  };
};

export const deletePriceSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_PRICE_SUCCESS",
    deletePrice: deleteData,
  };
};

export const deletePriceError = (error) => {
  return {
    type: "DELETE_MULT_PRICE_ERROR",
    error,
  };
};

// GET PRICE

export const getInit = () => {
  return {
    type: "GET_PRICE_INIT",
  };
};

export const getPrice = (id) => {
  return function (dispatch) {
    dispatch(getPriceStart());
    axios
      .get("prices/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getPriceSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        if (error.response.status) {
          dispatch(getPriceError(error.response.data.error.message));
        } else {
          dispatch(getPriceError(error.message));
        }
      });
  };
};

export const getPriceStart = () => {
  return {
    type: "GET_PRICE_START",
  };
};

export const getPriceSuccess = (result) => {
  return {
    type: "GET_PRICE_SUCCESS",
    price: result,
  };
};

export const getPriceError = (error) => {
  return {
    type: "GET_PRICE_ERROR",
    error,
  };
};

//UPDATE PRICE

export const updatePrice = (id, data) => {
  return function (dispatch) {
    dispatch(updatePriceStart());
    axios
      .put(`prices/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updatePriceSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(updatePriceError(err.message));
      });
  };
};

export const updatePriceStart = () => {
  return {
    type: "UPDATE_PRICE_START",
  };
};

export const updatePriceSuccess = (result) => {
  return {
    type: "UPDATE_PRICE_SUCCESS",
    updatePrice: result,
  };
};

export const updatePriceError = (error) => {
  return {
    type: "UPDATE_PRICE_ERROR",
    error,
  };
};

export const getCountPrice = () => {
  return function (dispatch) {
    dispatch(getCountPriceStart());
    axios
      .get(`prices/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountPriceSuccess(result));
      })
      .catch((err) => {
        const error = { ...err };
        dispatch(getCountPriceError(error));
      });
  };
};

export const getCountPriceStart = () => {
  return {
    type: "GET_COUNT_PRICE_START",
  };
};

export const getCountPriceSuccess = (result) => {
  return {
    type: "GET_COUNT_PRICE_SUCCESS",
    orderCount: result,
  };
};

export const getCountPriceError = (error) => {
  return {
    type: "GET_COUNT_PRICE_ERROR",
    error,
  };
};
