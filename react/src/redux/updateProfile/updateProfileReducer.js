import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from './updateProfileTypes';

const initialState = {
  loading: false,
  profileData: {},
  error: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profileData: action.payload,
        error: ''
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        profileData: {},
        error: action.payload
      };
    default:
      return state;
  }
};

export default profileReducer;
