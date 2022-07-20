const initialState = {
  loading: false,
  success: null,
  error: null,
  prices: [],
  paginationLast: {},
  price: {},
  //count
  countLoading: false,
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_PRICE":
      return {
        ...state,
        error: null,
        success: null,
        price: {},
      };

    case "LOAD_PRICES_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        prices: [],
      };

    case "LOAD_PRICES_SUCCESS":
      return {
        ...state,
        loading: false,
        prices: action.loadPrices,
      };

    case "LOAD_PRICES_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        prices: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE PRICE

    case "CREATE_PRICE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        price: null,
      };
    case "CREATE_PRICE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай нэмэгдлээ",
        error: null,
      };
    case "CREATE_PRICE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_PRICE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_PRICE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_PRICE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET PRICE

    case "GET_PRICE_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        price: {},
      };

    case "GET_PRICE_START":
      return {
        ...state,
        loading: true,
        price: {},
        error: null,
      };

    case "GET_PRICE_SUCCESS":
      return {
        ...state,
        loading: false,
        price: action.price,
        error: null,
      };

    case "GET_PRICE_ERROR":
      return {
        ...state,
        loading: false,
        price: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_PRICE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_PRICE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_PRICE_ERROR":
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
    case "GET_COUNT_PRICE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_PRICE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_PRICE_ERROR":
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
