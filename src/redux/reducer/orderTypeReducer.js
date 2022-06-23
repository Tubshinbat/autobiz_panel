const initialState = {
  loading: false,
  success: null,
  error: null,
  orderTypes: [],
  paginationLast: {},
  orderType: {},
  //count
  countLoading: false,
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_ORDERTYPE":
      return {
        ...state,
        error: null,
        success: null,
        orderType: {},
      };

    case "LOAD_ORDERTYPES_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        orderTypes: [],
      };

    case "LOAD_ORDERTYPES_SUCCESS":
      return {
        ...state,
        loading: false,
        orderTypes: action.loadOrderTypes,
      };

    case "LOAD_ORDERTYPES_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        orderTypes: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE ORDERTYPE

    case "CREATE_ORDERTYPE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        orderType: null,
      };
    case "CREATE_ORDERTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай нэмэгдлээ",
        error: null,
      };
    case "CREATE_ORDERTYPE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_ORDERTYPE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_ORDERTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_ORDERTYPE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET ORDERTYPE

    case "GET_ORDERTYPE_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        orderType: {},
      };

    case "GET_ORDERTYPE_START":
      return {
        ...state,
        loading: true,
        orderType: {},
        error: null,
      };

    case "GET_ORDERTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        orderType: action.orderType,
        error: null,
      };

    case "GET_ORDERTYPE_ERROR":
      return {
        ...state,
        loading: false,
        orderType: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_ORDERTYPE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_ORDERTYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_ORDERTYPE_ERROR":
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
    case "GET_COUNT_ORDERTYPE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_ORDERTYPE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_ORDERTYPE_ERROR":
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
