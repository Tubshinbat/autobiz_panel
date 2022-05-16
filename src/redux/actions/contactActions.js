import axios from "../../axios-base";

export const clear = () => {
  return {
    type: "CLEAR_CONTACT",
  };
};

// SAVE CONTACT
export const saveContactInit = () => {
  return {
    type: "SAVE_CONTACT_INIT",
  };
};

export const saveContact = (contact) => {
  return function (dispatch, getState) {
    dispatch(saveContactStart());
    axios
      .post(`contacts`, contact)
      .then((response) => {
        const result = response.data;
        dispatch(saveContactSuccess(result));
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
        dispatch(saveContactError(resError));
      });
  };
};

export const saveContactStart = () => {
  return {
    type: "SAVE_CONTACT_START",
  };
};

export const saveContactSuccess = (result) => {
  return {
    type: "SAVE_CONTACT_SUCCESS",
    contact: result,
  };
};

export const saveContactError = (error) => {
  return {
    type: "SAVE_CONTACT_ERROR",
    error,
  };
};

// LOAD CONTACT

export const loadContact = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadContactStart());
    axios
      .get("contacts?" + query)
      .then((response) => {
        const loadContact = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadContactSuccess(loadContact));
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
        dispatch(loadContactError(resError));
      });
  };
};

export const loadContactStart = () => {
  return {
    type: "LOAD_CONTACT_START",
  };
};

export const loadContactSuccess = (loadContact, pagination) => {
  return {
    type: "LOAD_CONTACT_SUCCESS",
    loadContact,
    pagination,
  };
};

export const loadContactError = (error) => {
  return {
    type: "LOAD_CONTACT_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultContact = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("contacts/delete", { params: { id: ids } })
      .then((response) => {
        const deleteContact = response.data.data;
        dispatch(deleteContactSuccess(deleteContact));
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
        dispatch(deleteContactError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_CONTACT_START",
  };
};

export const deleteContactSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_CONTACT_SUCCESS",
    deleteContact: deleteData,
  };
};

export const deleteContactError = (error) => {
  return {
    type: "DELETE_MULT_CONTACT_ERROR",
    error,
  };
};

// GET CONTACT

export const getInit = () => {
  return {
    type: "GET_CONTACT_INIT",
  };
};

export const getContact = (id) => {
  return function (dispatch, getState) {
    dispatch(getContactStart());
    axios
      .get("contacts/" + id)
      .then((response) => {
        const contact = response.data.data;
        dispatch(getContactSuccess(contact));
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
        dispatch(getContactError(resError));
      });
  };
};

export const getContactStart = () => {
  return {
    type: "GET_CONTACT_START",
  };
};

export const getContactSuccess = (contact) => {
  return {
    type: "GET_CONTACT_SUCCESS",
    singleContact: contact,
  };
};

export const getContactError = (error) => {
  return {
    type: "GET_CONTACT_ERROR",
    error,
  };
};

//UPDATE CONTACT

export const updateContact = (id, data) => {
  return function (dispatch) {
    dispatch(updateContactStart());
    axios
      .put(`contacts/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateContactSuccess(result));
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
        dispatch(updateContactError(resError));
      });
  };
};

export const updateContactStart = () => {
  return {
    type: "UPDATE_CONTACT_START",
  };
};

export const updateContactSuccess = (result) => {
  return {
    type: "UPDATE_CONTACT_SUCCESS",
    updateContact: result,
  };
};

export const updateContactError = (error) => {
  return {
    type: "UPDATE_CONTACT_ERROR",
    error,
  };
};
