import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_CARINDUSTRY",
  };
};

// CREATE CARINDUSTRY

export const createCarindustry = (data) => {
  return function (dispatch) {
    dispatch(createCarindustryStart());
    axios
      .post("carindustrys", data)
      .then((response) => {
        const data = response.data.data;
        dispatch(createCarindustrySuccess(data));
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
        dispatch(createCarindustryError(resError));
      });
  };
};

const createCarindustryStart = () => {
  return {
    type: "CREATE_CARINDUSTRY_START",
  };
};

const createCarindustrySuccess = () => {
  return {
    type: "CREATE_CARINDUSTRY_SUCCESS",
  };
};

const createCarindustryError = (error) => {
  return {
    type: "CREATE_CARINDUSTRY_ERROR",
    error,
  };
};

// LOAD CARINDUSTRYS

export const loadCarindustrys = (query = "") => {
  return function (dispatch) {
    dispatch(loadCarindustrysStart());
    axios
      .get("carindustrys?" + query)
      .then((response) => {
        const loadCarindustrys = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadCarindustrysSuccess(loadCarindustrys));
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

        dispatch(loadCarindustrysError(resError));
      });
  };
};

export const loadCarindustrysStart = () => {
  return {
    type: "LOAD_CARINDUSTRYS_START",
  };
};

export const loadCarindustrysSuccess = (carIndustrys, pagination) => {
  return {
    type: "LOAD_CARINDUSTRYS_SUCCESS",
    carIndustrys,
    pagination,
  };
};

export const loadCarindustrysError = (error) => {
  return {
    type: "LOAD_CARINDUSTRYS_ERROR",
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

export const deleteMultCarindustry = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("carindustrys/delete", { params: { id: ids } })
      .then((response) => {
        const deleteCarindustry = response.data.data;
        dispatch(deleteCarindustrySuccess(deleteCarindustry));
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

        dispatch(deleteCarindustryError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_CARINDUSTRY_START",
  };
};

export const deleteCarindustrySuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_CARINDUSTRY_SUCCESS",
    deleteCarindustry: deleteData,
  };
};

export const deleteCarindustryError = (error) => {
  return {
    type: "DELETE_MULT_CARINDUSTRY_ERROR",
    error,
  };
};

// GET CARINDUSTRY

export const getInit = () => {
  return {
    type: "GET_CARINDUSTRY_INIT",
  };
};

export const getCarindustry = (id) => {
  return function (dispatch) {
    dispatch(getCarindustryStart());
    axios
      .get("carindustrys/" + id)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCarindustrySuccess(result));
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
        dispatch(getCarindustryError(resError));
      });
  };
};

export const getCarindustryStart = () => {
  return {
    type: "GET_CARINDUSTRY_START",
  };
};

export const getCarindustrySuccess = (result) => {
  return {
    type: "GET_CARINDUSTRY_SUCCESS",
    carIndustry: result,
  };
};

export const getCarindustryError = (error) => {
  return {
    type: "GET_CARINDUSTRY_ERROR",
    error,
  };
};

//UPDATE CARINDUSTRY

export const updateCarindustry = (id, data) => {
  return function (dispatch) {
    dispatch(updateCarindustryStart());
    axios
      .put(`carindustrys/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateCarindustrySuccess(result));
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
        dispatch(updateCarindustryError(resError));
      });
  };
};

export const updateCarindustryStart = () => {
  return {
    type: "UPDATE_CARINDUSTRY_START",
  };
};

export const updateCarindustrySuccess = (result) => {
  return {
    type: "UPDATE_CARINDUSTRY_SUCCESS",
    updateCarindustry: result,
  };
};

export const updateCarindustryError = (error) => {
  return {
    type: "UPDATE_CARINDUSTRY_ERROR",
    error,
  };
};

export const getCountCarindustry = () => {
  return function (dispatch) {
    dispatch(getCountCarindustryStart());
    axios
      .get(`carindustrys/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountCarindustrySuccess(result));
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
        dispatch(getCountCarindustryError(resError));
      });
  };
};

export const getCountCarindustryStart = () => {
  return {
    type: "GET_COUNT_CARINDUSTRY_START",
  };
};

export const getCountCarindustrySuccess = (result) => {
  return {
    type: "GET_COUNT_CARINDUSTRY_SUCCESS",
    orderCount: result,
  };
};

export const getCountCarindustryError = (error) => {
  return {
    type: "GET_COUNT_CARINDUSTRY_ERROR",
    error,
  };
};
