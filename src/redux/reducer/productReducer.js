const initialState = {
  loading: false,
  success: null,
  error: null,
  products: [],
  paginationLast: {},
  product: {},
  //count
  totalCount: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_PRODUCT":
      return {
        ...state,
        error: null,
        success: null,
        product: {},
        products: [],
        paginationLast: {},
        totalCount: null,
      };

    case "LOAD_PRODUCTS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        products: [],
      };

    case "LOAD_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        errot: null,
        products: action.products,
      };

    case "LOAD_PRODUCTS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        products: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE PRODUCT

    case "CREATE_PRODUCT_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "CREATE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай машины төрөл нэмэгдлээ",
        error: null,
      };
    case "CREATE_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_PRODUCT_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET PRODUCT

    case "GET_PRODUCT_START":
      return {
        ...state,
        loading: true,
        product: {},
        error: null,
      };

    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        product: action.product,
        error: null,
      };

    case "GET_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        product: {},
        error: action.error,
      };

    //UPDATE

    case "UPDATE_PRODUCT_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_PRODUCT_ERROR":
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
    case "GET_COUNT_PRODUCT_START":
      return {
        ...state,
        loading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        totalCount: action.count,
        error: null,
      };
    case "GET_COUNT_PRODUCT_ERROR":
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
