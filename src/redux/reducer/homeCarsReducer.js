const initialState = {
  loading: false,
  success: null,
  error: null,
  homeCars: [],
  paginationLast: {},
  homeCar: {},
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
    case "CLEAR_HOMECAR":
      return {
        ...state,
        error: null,
        success: null,
        homeCar: {},
        homeCars: [],
      };

    case "LOAD_HOMECARS_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        homeCars: [],
      };

    case "LOAD_HOMECARS_SUCCESS":
      return {
        ...state,
        loading: false,
        homeCars: action.homeCars,
      };

    case "LOAD_HOMECARS_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        homeCars: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // CREATE HOMECAR

    case "SAVE_HOMECAR_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        homeCar: null,
      };
    case "SAVE_HOMECAR_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай баннер нэмэгдлээ",
        error: null,
      };
    case "SAVE_HOMECAR_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    // DELETE
    case "DELETE_MULT_HOMECAR_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_HOMECAR_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_HOMECAR_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET HOMECAR

    case "GET_HOMECAR_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        homeCar: {},
      };

    case "GET_HOMECAR_START":
      return {
        ...state,
        loading: true,
        homeCar: {},
        error: null,
      };

    case "GET_HOMECAR_SUCCESS":
      return {
        ...state,
        loading: false,
        homeCar: action.singleHomeCars,
        error: null,
      };

    case "GET_HOMECAR_ERROR":
      return {
        ...state,
        loading: false,
        homeCar: {},
        error: action.error,
      };

    // GROUP
    case "GROUP_HOMECAR_START":
      return {
        ...state,
        loading: true,
        groupData: { ...state.groupData },
        error: null,
      };

    case "GROUP_HOMECAR_SUCCESS": {
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
    case "GROUP_HOMECAR_ERROR":
      return {
        ...state,
        loading: false,
        groupData: { ...state.groupData },
        error: action.error,
      };

    //GROUP AND FILTER
    case "GROUP_HOMECAR_FILTER__START":
      return {
        ...state,
        loading: true,
        groupData: { ...state.groupData },
        error: null,
      };

    case "GROUP_HOMECAR_FILTER__SUCCESS": {
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
    case "GROUP_HOMECAR_FILTER__ERROR":
      return {
        ...state,
        loading: false,
        groupData: { ...state.groupData },
        error: action.error,
      };

    //UPDATE

    case "UPDATE_HOMECAR_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_HOMECAR_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_HOMECAR_ERROR":
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
    case "GET_COUNT_HOMECAR_START":
      return {
        ...state,
        loading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_HOMECAR_SUCCESS":
      return {
        ...state,
        loading: false,
        totalCount: action.count,
        error: null,
      };
    case "GET_COUNT_HOMECAR_ERROR":
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
