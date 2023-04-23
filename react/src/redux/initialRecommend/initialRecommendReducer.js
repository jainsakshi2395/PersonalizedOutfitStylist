import {POST_INITIAL_RECOMMEND_REQUEST, POST_INITIAL_RECOMMEND_SUCCESS, POST_INITIAL_RECOMMEND_FAILURE} from "./initialRecommendTypes";

const initialState = {
  isLoading: true,
  data: [],
  error: ""
};

const initialRecommendReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_INITIAL_RECOMMEND_REQUEST: return {
      ...state,
      isLoading: true
    }
    case POST_INITIAL_RECOMMEND_SUCCESS: return {
      ...state,
      isLoading: false,
      data: action.payload,
      error: ""
    }
    case POST_INITIAL_RECOMMEND_FAILURE: return {
      ...state,
      isLoading: false,
      data: [],
      error: action.payload
    }
    default: return state;
  }
};

export default initialRecommendReducer;
