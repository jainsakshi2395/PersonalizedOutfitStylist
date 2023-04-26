import {POST_PROFILE_REQUEST, POST_PROFILE_SUCCESS, POST_PROFILE_FAILURE} from "./profileTypes";

const initialState = {
  isLoading: true,
  data: [],
  error: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PROFILE_REQUEST: return {
      ...state,
      isLoading: true
    }
    case POST_PROFILE_SUCCESS: return {
      ...state,
      isLoading: false,
      data: action.payload,
      error: ""
    }
    case POST_PROFILE_FAILURE: return {
      ...state,
      isLoading: false,
      data: [],
      error: action.payload
    }
    default: return state;
  }
};

export default profileReducer;
