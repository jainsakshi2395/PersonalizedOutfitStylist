import {FILTER_REQUEST, FILTER_SUCCESS, FILTER_FAILURE} from "./filterTypes";

const initialState = {
  isLoading: true,
  data: [],
  error: ""
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_REQUEST: return {
      ...state,
      isLoading: true
    }
    case FILTER_SUCCESS: return {
      ...state,
      isLoading: false,
      data: action.payload,
      error: ""
    }
    case FILTER_FAILURE: return {
      ...state,
      isLoading: false,
      data: [],
      error: action.payload
    }
    default: return state;
  }
};

export default filterReducer;
