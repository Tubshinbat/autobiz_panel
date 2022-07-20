import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_PRODUCT",
  };
};

export const createProduct = (data) => {
  return function (dispatch) {
    dispatch(createProductStart());
    axios
      .post("products", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createProductSuccess(data));
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
        dispatch(createProductError(resError));
      });
  };
};

const createProductStart = () => {
  return {
    type: "CREATE_PRODUCT_START",
  };
};

const createProductSuccess = () => {
  return {
    type: "CREATE_PRODUCT_SUCCESS",
  };
};

const createProductError = (error) => {
  return {
    type: "CREATE_PRODUCT_ERROR",
    error,
  };
};

// LOAD PRODUCTS

export const loadProducts = (query = "") => {
  return function (dispatch) {
    dispatch(loadProductsStart());
    axios
      .get("products?" + query)
      .then((response) => {
        const loadProducts = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadProductsSuccess(loadProducts));
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

        dispatch(loadProductsError(resError));
      });
  };
};

export const loadProductsStart = () => {
  return {
    type: "LOAD_PRODUCTS_START",
  };
};

export const loadProductsSuccess = (products, pagination) => {
  return {
    type: "LOAD_PRODUCTS_SUCCESS",
    products,
    pagination,
  };
};

export const loadProductsError = (error) => {
  return {
    type: "LOAD_PRODUCTS_ERROR",
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

export const deleteMultProduct = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("products/delete", { params: { id: ids } })
      .then((response) => {
        const deleteProduct = response.data.data;
        dispatch(deleteProductSuccess(deleteProduct));
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

        dispatch(deleteProductError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_PRODUCT_START",
  };
};

export const deleteProductSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_PRODUCT_SUCCESS",
    deleteProduct: deleteData,
  };
};

export const deleteProductError = (error) => {
  return {
    type: "DELETE_MULT_PRODUCT_ERROR",
    error,
  };
};

// GET PRODUCT

export const getInit = () => {
  return {
    type: "GET_PRODUCT_INIT",
  };
};

export const getProduct = (id) => {
  return function (dispatch) {
    dispatch(getProductStart());
    axios
      .get("products/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getProductSuccess(result));
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
        dispatch(getProductError(resError));
      });
  };
};

export const getProductStart = () => {
  return {
    type: "GET_PRODUCT_START",
  };
};

export const getProductSuccess = (result) => {
  return {
    type: "GET_PRODUCT_SUCCESS",
    product: result,
  };
};

export const getProductError = (error) => {
  return {
    type: "GET_PRODUCT_ERROR",
    error,
  };
};

//UPDATE PRODUCT

export const updateProduct = (id, data) => {
  return function (dispatch) {
    dispatch(updateProductStart());
    axios
      .put(`products/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateProductSuccess(result));
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
        dispatch(updateProductError(resError));
      });
  };
};

export const updateProductStart = () => {
  return {
    type: "UPDATE_PRODUCT_START",
  };
};

export const updateProductSuccess = (result) => {
  return {
    type: "UPDATE_PRODUCT_SUCCESS",
    updateProduct: result,
  };
};

export const updateProductError = (error) => {
  return {
    type: "UPDATE_PRODUCT_ERROR",
    error,
  };
};

export const getCountProduct = () => {
  return function (dispatch) {
    dispatch(getCountProductStart());

    axios
      .get(`products/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountProductSuccess(result));
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
        dispatch(getCountProductError(resError));
      });
  };
};

export const getCountProductStart = () => {
  return {
    type: "GET_COUNT_PRODUCT_START",
  };
};

export const getCountProductSuccess = (result) => {
  return {
    type: "GET_COUNT_PRODUCT_SUCCESS",
    totalCount: result,
  };
};

export const getCountProductError = (error) => {
  return {
    type: "GET_COUNT_PRODUCT_ERROR",
    error,
  };
};
