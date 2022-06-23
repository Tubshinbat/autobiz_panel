const initialState = {
  loading: false,
  success: null,
  error: null,
  beorders: [],
  paginationLast: {},
  beorder: {},
  //count
  countLoading: false,
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_BEORDER":
      return {
        ...state,
        error: null,
        success: null,
        beorder: {},
      };

    case "LOAD_BEORDERS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        beorders: [],
      };

    case "LOAD_BEORDERS_SUCCESS":
      return {
        ...state,
        loading: false,
        beorders: action.loadBeorders,
      };

    case "LOAD_BEORDERS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        beorders: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE BEORDER

    case "CREATE_BEORDER_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        beorder: null,
      };
    case "CREATE_BEORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай баннер нэмэгдлээ",
        error: null,
      };
    case "CREATE_BEORDER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_BEORDER_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_BEORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_BEORDER_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET BEORDER

    case "GET_BEORDER_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        beorder: {},
      };

    case "GET_BEORDER_START":
      return {
        ...state,
        loading: true,
        beorder: {},
        error: null,
      };

    case "GET_BEORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        beorder: action.beorder,
        error: null,
      };

    case "GET_BEORDER_ERROR":
      return {
        ...state,
        loading: false,
        beorder: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_BEORDER_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_BEORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_BEORDER_ERROR":
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
    case "GET_COUNT_BEORDER_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_BEORDER_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_BEORDER_ERROR":
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
