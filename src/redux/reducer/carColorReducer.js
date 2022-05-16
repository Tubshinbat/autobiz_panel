const initialState = {
  loading: false,
  success: null,
  error: null,
  carColors: [],
  paginationLast: {},
  carColor: {},
  //count
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_CARCOLOR":
      return {
        ...state,
        error: null,
        success: null,
        carColor: {},
        carColors: [],
        paginationLast: {},
        totalCount: null,
      };

    case "LOAD_CARCOLORS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        carColors: [],
      };

    case "LOAD_CARCOLORS_SUCCESS":
      return {
        ...state,
        loading: false,
        errot: null,
        carColors: action.carColors,
      };

    case "LOAD_CARCOLORS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        carColors: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE CARCOLOR

    case "CREATE_CARCOLOR_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "CREATE_CARCOLOR_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай машины өнгө нэмэгдлээ",
        error: null,
      };
    case "CREATE_CARCOLOR_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_CARCOLOR_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_CARCOLOR_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_CARCOLOR_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET CARCOLOR

    case "GET_CARCOLOR_START":
      return {
        ...state,
        loading: true,
        carColor: {},
        error: null,
      };

    case "GET_CARCOLOR_SUCCESS":
      return {
        ...state,
        loading: false,
        carColor: action.carColor,
        error: null,
      };

    case "GET_CARCOLOR_ERROR":
      return {
        ...state,
        loading: false,
        carColor: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_CARCOLOR_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_CARCOLOR_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_CARCOLOR_ERROR":
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
    case "GET_COUNT_CARCOLOR_START":
      return {
        ...state,
        loading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_CARCOLOR_SUCCESS":
      return {
        ...state,
        loading: false,
        totalCount: action.count,
        error: null,
      };
    case "GET_COUNT_CARCOLOR_ERROR":
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
