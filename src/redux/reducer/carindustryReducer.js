const initialState = {
  loading: false,
  success: null,
  error: null,
  carIndustrys: [],
  paginationLast: {},
  carIndustry: {},
  //count
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_CARINDUSTRY":
      return {
        ...state,
        error: null,
        success: null,
        carIndustry: {},
        carIndustrys: [],
        paginationLast: {},
        totalCount: null,
      };

    case "LOAD_CARINDUSTRYS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        carIndustrys: [],
      };

    case "LOAD_CARINDUSTRYS_SUCCESS":
      return {
        ...state,
        loading: false,
        errot: null,
        carIndustrys: action.carIndustrys,
      };

    case "LOAD_CARINDUSTRYS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        carIndustrys: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE CARINDUSTRY

    case "CREATE_CARINDUSTRY_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "CREATE_CARINDUSTRY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай машины үйлдвэр нэмэгдлээ",
        error: null,
      };
    case "CREATE_CARINDUSTRY_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_CARINDUSTRY_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_CARINDUSTRY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_CARINDUSTRY_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET CARINDUSTRY

    case "GET_CARINDUSTRY_START":
      return {
        ...state,
        loading: true,
        carIndustry: {},
        error: null,
      };

    case "GET_CARINDUSTRY_SUCCESS":
      return {
        ...state,
        loading: false,
        carIndustry: action.carIndustry,
        error: null,
      };

    case "GET_CARINDUSTRY_ERROR":
      return {
        ...state,
        loading: false,
        carIndustry: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_CARINDUSTRY_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_CARINDUSTRY_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_CARINDUSTRY_ERROR":
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
    case "GET_COUNT_CARINDUSTRY_START":
      return {
        ...state,
        loading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_CARINDUSTRY_SUCCESS":
      return {
        ...state,
        loading: false,
        totalCount: action.count,
        error: null,
      };
    case "GET_COUNT_CARINDUSTRY_ERROR":
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
