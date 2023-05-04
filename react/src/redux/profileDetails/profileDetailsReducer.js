import {
  GET_PROFILE_DETAILS_REQUEST,
  GET_PROFILE_DETAILS_SUCCESS,
  GET_PROFILE_DETAILS_FAILURE
} from './profileDetailsTypes';

const initialState = {
  loading: false,
  profileDetails: {},
  error: ''
}

const profileDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PROFILE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_PROFILE_DETAILS_SUCCESS:
      return {
        loading: false,
        profileDetails: action.payload,
        error: ''
      }
    case GET_PROFILE_DETAILS_FAILURE:
      return {
        loading: false,
        profileDetails: {},
        error: action.payload
      }
    default:
      return state
  }
}

export default profileDetailsReducer;
