const initialState = {
  loading: false,
  success: null,
  error: null,
  carTypes: [],
  paginationLast: {},
  carType: {},
  //count
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_CARTYPE":
      return {
        ...state,
        error: null,
        success: null,
        carType: {},
        carTypes: [],
        paginationLast: {},
        totalCount: null,
      };

    case "LOAD_CARTYPES_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        carTypes: [],
      };

    case "LOAD_CARTYPES_SUCCESS":
      return {
        ...state,
        loading: false,
        errot: null,
        carTypes: action.carTypes,
      };

    case "LOAD_CARTYPES_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        carTypes: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE CARTYPE

    case "CREATE_CARTYPE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "CREATE_CARTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай машины төрөл нэмэгдлээ",
        error: null,
      };
    case "CREATE_CARTYPE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_CARTYPE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_CARTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_CARTYPE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET CARTYPE

    case "GET_CARTYPE_START":
      return {
        ...state,
        loading: true,
        carType: {},
        error: null,
      };

    case "GET_CARTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        carType: action.carType,
        error: null,
      };

    case "GET_CARTYPE_ERROR":
      return {
        ...state,
        loading: false,
        carType: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_CARTYPE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_CARTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_CARTYPE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    case "UPDATE_END":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
      };

    // GET COUNT
    case "GET_COUNT_CARTYPE_START":
      return {
        ...state,
        loading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_CARTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        totalCount: action.count,
        error: null,
      };
    case "GET_COUNT_CARTYPE_ERROR":
      return {
        ...state,
        loading: false,
        totalCount: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
