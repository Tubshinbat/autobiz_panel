const initialState = {
  loading: false,
  success: null,
  error: null,
  beProducts: [],
  paginationLast: {},
  beProduct: {},
  groupData: {
    mark_txt: [],
    type_txt: [],
    model: [],
  },
  //count
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_BEPRODUCT":
      return {
        ...state,
        error: null,
        success: null,
        beProduct: {},
        beProducts: [],
      };

    case "LOAD_BEPRODUCTS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        beProducts: [],
      };

    case "LOAD_BEPRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        beProducts: action.beProducts,
      };

    case "LOAD_BEPRODUCTS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        beProducts: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE BEPRODUCT

    case "CREATE_BEPRODUCT_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        beProduct: null,
      };
    case "CREATE_BEPRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай баннер нэмэгдлээ",
        error: null,
      };
    case "CREATE_BEPRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_BEPRODUCT_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_BEPRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_BEPRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET BEPRODUCT

    case "GET_BEPRODUCT_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        beProduct: {},
      };

    case "GET_BEPRODUCT_START":
      return {
        ...state,
        loading: true,
        beProduct: {},
        error: null,
      };

    case "GET_BEPRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        beProduct: action.singleBeProducts,
        error: null,
      };

    case "GET_BEPRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        beProduct: {},
        error: action.error,
      };

    // GROUP
    case "GROUP_BEPRODUCT_START":
      return {
        ...state,
        loading: true,
        groupData: { ...state.groupData },
        error: null,
      };

    case "GROUP_BEPRODUCT_SUCCESS": {
      let groupData = {
        ...state.groupData,
        [action.groupName]: action.group,
      };

      return {
        ...state,
        loading: false,
        groupData,
        error: null,
      };
    }
    case "GROUP_BEPRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        groupData: { ...state.groupData },
        error: action.error,
      };

    //GROUP AND FILTER
    case "GROUP_BEPRODUCT_FILTER__START":
      return {
        ...state,
        loading: true,
        groupData: { ...state.groupData },
        error: null,
      };

    case "GROUP_BEPRODUCT_FILTER__SUCCESS": {
      let groupData = {
        ...state.groupData,
        [action.groupName]: action.group,
      };

      return {
        ...state,
        loading: false,
        groupData,
        error: null,
      };
    }
    case "GROUP_BEPRODUCT_FILTER__ERROR":
      return {
        ...state,
        loading: false,
        groupData: { ...state.groupData },
        error: action.error,
      };

    //UPDATE

    case "UPDATE_BEPRODUCT_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_BEPRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_BEPRODUCT_ERROR":
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
    case "GET_COUNT_BEPRODUCT_START":
      return {
        ...state,
        loading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_BEPRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        totalCount: action.count,
        error: null,
      };
    case "GET_COUNT_BEPRODUCT_ERROR":
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
