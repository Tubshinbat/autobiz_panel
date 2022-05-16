const initialState = {
  loading: false,
  success: null,
  error: null,
  carZagvars: [],
  paginationLast: {},
  carZagvar: {},
  //count
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_CARZAGVAR":
      return {
        ...state,
        error: null,
        success: null,
        carZagvar: {},
        carZagvars: [],
        paginationLast: {},
        totalCount: null,
      };

    case "LOAD_CARZAGVARS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        carZagvars: [],
      };

    case "LOAD_CARZAGVARS_SUCCESS":
      return {
        ...state,
        loading: false,
        errot: null,
        carZagvars: action.carZagvars,
      };

    case "LOAD_CARZAGVARS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        carZagvars: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE CARZAGVAR

    case "CREATE_CARZAGVAR_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "CREATE_CARZAGVAR_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай машины үйлдвэр нэмэгдлээ",
        error: null,
      };
    case "CREATE_CARZAGVAR_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_CARZAGVAR_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_CARZAGVAR_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_CARZAGVAR_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET CARZAGVAR

    case "GET_CARZAGVAR_START":
      return {
        ...state,
        loading: true,
        carZagvar: {},
        error: null,
      };

    case "GET_CARZAGVAR_SUCCESS":
      return {
        ...state,
        loading: false,
        carZagvar: action.carZagvar,
        error: null,
      };

    case "GET_CARZAGVAR_ERROR":
      return {
        ...state,
        loading: false,
        carZagvar: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_CARZAGVAR_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_CARZAGVAR_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_CARZAGVAR_ERROR":
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
    case "GET_COUNT_CARZAGVAR_START":
      return {
        ...state,
        loading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_CARZAGVAR_SUCCESS":
      return {
        ...state,
        loading: false,
        totalCount: action.count,
        error: null,
      };
    case "GET_COUNT_CARZAGVAR_ERROR":
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
