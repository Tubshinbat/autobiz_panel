import axios from "../../axios-base";
//UPDOWN

export const upDown = (data) => {
  return function (dispatch, getState) {
    dispatch(upDownStart());
    axios
      .put("menu/updown", data)
      .then((response) => {
        const result = response.data.data;
        dispatch(upDownSuccess(result));
        dispatch(loadMenus());
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
        dispatch(upDownError(resError));
      });
  };
};

export const upDownStart = () => {
  return {
    type: "MENU_UPDOWN_START",
  };
};

export const upDownSuccess = () => {
  return {
    type: "MENU_UPDOWN_SUCCESS",
  };
};

export const upDownError = (error) => {
  return {
    type: "MENU_UPDOWN_ERROR",
    error,
  };
};

// LOAD MENUS

export const loadMenus = () => {
  return function (dispatch, getState) {
    dispatch(loadMenusStart());
    axios
      .get("menu")
      .then((response) => {
        const result = response.data.data.reverse();
        dispatch(loadMenusSuccess(result));
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
        dispatch(loadMenusError(resError));
      });
  };
};
export const loadMenusStart = () => {
  return {
    type: "LOAD_MENUS_START",
  };
};

export const loadMenusSuccess = (result) => {
  return {
    type: "LOAD_MENUS_SUCCESS",
    menus: result,
  };
};

export const loadMenusError = (error) => {
  return {
    type: "LOAD_MENUS_ERROR",
    error,
  };
};

export const getMenu = (newsCategoryId) => {
  return function (dispatch, getState) {
    dispatch(getMenuStart());
    axios
      .get(`menu/${newsCategoryId}`)
      .then((response) => {
        const loadedNewsCategory = response.data.data;
        dispatch(getMenuSuccess(loadedNewsCategory));
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
        dispatch(getMenuError(resError));
      });
  };
};

export const getMenuStart = () => {
  return {
    type: "GET_MENU_START",
  };
};

export const getMenuSuccess = (result) => {
  return {
    type: "GET_MENU_SUCCESS",
    menu: result,
  };
};

export const getMenuError = (error) => {
  return {
    type: "GET_MENU_ERROR",
    error,
  };
};

// DELETE CATEGORY

export const deleteMenu = (categoryId) => {
  return function (dispatch, getState) {
    dispatch(deleteMenuStart());

    axios
      .delete(`menu/${categoryId}`)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(deleteMenuSuccess(resultCategory));
        dispatch(loadMenus());
        dispatch(getMenu());
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
        dispatch(deleteMenuError(resError));
      });
  };
};

export const deleteMenuStart = () => {
  return {
    type: "DELETE_MENU_START",
  };
};

export const deleteMenuSuccess = (result) => {
  return {
    type: "DELETE_MENU_SUCCESS",
    dlMenu: result,
  };
};

export const deleteMenuError = (error) => {
  return {
    type: "DELETE_MENU_ERROR",
    error,
  };
};

// SAVE CATEGORY

export const saveMenu = (category) => {
  return function (dispatch, getState) {
    dispatch(saveMenuStart());
    let data = {
      name: category.name,
      status: category.status,
      isModel: category.isModel,
      isDirect: category.isDirect,
      direct: category.direct,
    };

    if (category.parentId !== null) {
      data = {
        name: category.name,
        parentId: category.parentId,
        status: category.status,
        isModel: category.isModel,
        isDirect: category.isDirect,
        direct: category.direct,
      };
    }

    if (category.model != null || category.model != "") {
      data.model = category.model;
    }
    axios
      .post(`menu`, data)
      .then((response) => {
        const resultCategory = response.data.data;

        dispatch(saveMenuSuccess(resultCategory));
        dispatch(loadMenus());
        dispatch(getMenu(resultCategory._id));
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
        dispatch(saveMenuError(resError));
      });
  };
};

export const saveMenuStart = () => {
  return {
    type: "SAVE_MENU_START",
  };
};

export const saveMenuSuccess = (resultCategory) => {
  return {
    type: "SAVE_MENU_SUCCESS",
    menu: resultCategory,
  };
};

export const saveMenuError = (error) => {
  return {
    type: "SAVE_MENU_ERROR",
    error: error,
  };
};

// UPDATE CATEGORY

export const updateMenu = (category, id) => {
  return function (dispatch) {
    dispatch(updateMenuStart());
    const data = {
      name: category.name,
      status: category.status,
      isModel: category.isModel,
      isDirect: category.isDirect,
      direct: category.direct,
    };
    if (category.model != null || category.model != "") {
      data.model = category.model;
    }

    axios
      .put(`menu/${id}`, data)
      .then((response) => {
        const resultCategory = response.data.data;
        dispatch(updateMenuSuccess(resultCategory));
        dispatch(loadMenus());
        dispatch(getMenu(id));
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
        dispatch(updateMenuError(resError));
      });
  };
};

export const updateMenuStart = () => {
  return {
    type: "UPDATE_MENU_START",
  };
};

export const updateMenuSuccess = (resultCategory) => {
  return {
    type: "UPDATE_MENU_SUCCESS",
    menu: resultCategory,
  };
};

export const updateMenuError = (error) => {
  return {
    type: "UPDATE_MENU_ERROR",
    error: error,
  };
};

// Count Menu
export const getCountMenu = () => {
  return function (dispatch) {
    dispatch(getCountMenuStart());

    axios
      .get(`menu/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountMenuSuccess(result));
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
        dispatch(getCountMenuError(resError));
      });
  };
};

export const getCountMenuStart = () => {
  return {
    type: "GET_COUNT_MENU_START",
  };
};

export const getCountMenuSuccess = (result) => {
  return {
    type: "GET_COUNT_MENU_SUCCESS",
    orderCount: result,
  };
};

export const getCountMenuError = (error) => {
  return {
    type: "GET_COUNT_MENU_ERROR",
    error,
  };
};
