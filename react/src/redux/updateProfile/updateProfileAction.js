import axios from 'axios';
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from './updateProfileTypes';
import { RestUrl } from '../../global';

export const updateProfileRequest = () => {
  return {
    type: UPDATE_PROFILE_REQUEST
  };
};

export const updateProfileSuccess = (data) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: data
  };
};

export const updateProfileFailure = (error) => {
  return {
    type: UPDATE_PROFILE_FAILURE,
    payload: error
  };
};

export const updateProfile = (profileData) => {
  const config = {
    method: 'put',
    url: `${RestUrl}/api/v1/profile/update/${profileData.user_id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: profileData
  };
  return (dispatch) => {
    dispatch(updateProfileRequest());
    axios(config)
      .then((response) => {
        dispatch(updateProfileSuccess(response.data));
      })
      .catch((error) => {
        dispatch(updateProfileFailure(error.message));
      });
  };
};
