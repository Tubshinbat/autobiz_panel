const initialState = {
  loading: false,
  success: null,
  error: null,
  freemods: [],
  paginationLast: {},
  freemod: {},
  //count
  countLoading: false,
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_FREEMOD":
      return {
        ...state,
        error: null,
        success: null,
        freemod: {},
      };

    case "LOAD_FREEMODS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        freemods: [],
      };

    case "LOAD_FREEMODS_SUCCESS":
      return {
        ...state,
        loading: false,
        freemods: action.freemods,
      };

    case "LOAD_FREEMODS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        freemods: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE FREEMOD

    case "CREATE_FREEMOD_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        freemod: null,
      };
    case "CREATE_FREEMOD_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай  нэмэгдлээ",
        error: null,
      };
    case "CREATE_FREEMOD_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_FREEMOD_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_FREEMOD_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_FREEMOD_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET FREEMOD

    case "GET_FREEMOD_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        freemod: {},
      };

    case "GET_FREEMOD_START":
      return {
        ...state,
        loading: true,
        freemod: {},
        error: null,
      };

    case "GET_FREEMOD_SUCCESS":
      return {
        ...state,
        loading: false,
        freemod: action.singleFreemods,
        error: null,
      };

    case "GET_FREEMOD_ERROR":
      return {
        ...state,
        loading: false,
        freemod: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_FREEMOD_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_FREEMOD_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_FREEMOD_ERROR":
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
    case "GET_COUNT_FREEMOD_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_FREEMOD_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_FREEMOD_ERROR":
      return {
        ...state,
        countLoading: false,
        totalCount: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
