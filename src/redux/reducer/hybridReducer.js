const initialState = {
  loading: false,
  success: null,
  error: null,
  hybrids: [],
  paginationLast: {},
  hybrid: {},
  //count
  countLoading: false,
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_HYBRID":
      return {
        ...state,
        error: null,
        success: null,
        hybrid: {},
      };

    case "LOAD_HYBRIDS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        hybrids: [],
      };

    case "LOAD_HYBRIDS_SUCCESS":
      return {
        ...state,
        loading: false,
        hybrids: action.hybrids,
      };

    case "LOAD_HYBRIDS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        hybrids: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE HYBRID

    case "CREATE_HYBRID_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        hybrid: null,
      };
    case "CREATE_HYBRID_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай  нэмэгдлээ",
        error: null,
      };
    case "CREATE_HYBRID_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_HYBRID_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_HYBRID_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_HYBRID_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET HYBRID

    case "GET_HYBRID_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        hybrid: {},
      };

    case "GET_HYBRID_START":
      return {
        ...state,
        loading: true,
        hybrid: {},
        error: null,
      };

    case "GET_HYBRID_SUCCESS":
      return {
        ...state,
        loading: false,
        hybrid: action.singleHybrids,
        error: null,
      };

    case "GET_HYBRID_ERROR":
      return {
        ...state,
        loading: false,
        hybrid: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_HYBRID_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_HYBRID_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_HYBRID_ERROR":
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
    case "GET_COUNT_HYBRID_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_HYBRID_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_HYBRID_ERROR":
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
