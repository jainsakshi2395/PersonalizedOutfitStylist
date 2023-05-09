import axios from 'axios';
import {
  GET_PROFILE_DETAILS_REQUEST,
  GET_PROFILE_DETAILS_SUCCESS,
  GET_PROFILE_DETAILS_FAILURE
} from './profileDetailsTypes';
import { RestUrl } from '../../global';

export const getProfileDetailsRequest = () => {
  return {
    type: GET_PROFILE_DETAILS_REQUEST
  }
}

export const getProfileDetailsSuccess = (data) => {
  return {
    type: GET_PROFILE_DETAILS_SUCCESS,
    payload: data
  }
}

export const getProfileDetailsFailure = (error) => {
  return {
    type: GET_PROFILE_DETAILS_FAILURE,
    payload: error
  }
}

const url = RestUrl + "/api/v1/profile/get/";
export const fetchProfileDetails = (userId) => {
  return (dispatch) => {
    dispatch(getProfileDetailsRequest());
    axios.get(`${url}${userId}/`)
      .then(response => {
        const profileDetails = response.data;
        dispatch(getProfileDetailsSuccess(profileDetails));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(getProfileDetailsFailure(errorMsg));
      })
  }
}
