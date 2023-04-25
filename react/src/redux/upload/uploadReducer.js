import {POST_UPLOAD_REQUEST, POST_UPLOAD_SUCCESS, POST_UPLOAD_FAILURE} from "./uploadTypes";

const initialState = {
  isLoading: true,
  data: [],
  error: ""
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_UPLOAD_REQUEST: return {
      ...state,
      isLoading: true
    }
    case POST_UPLOAD_SUCCESS: return {
      ...state,
      isLoading: false,
      data: action.payload,
      error: ""
    }
    case POST_UPLOAD_FAILURE: return {
      ...state,
      isLoading: false,
      data: [],
      error: action.payload
    }
    default: return state;
  }
};

export default uploadReducer;
