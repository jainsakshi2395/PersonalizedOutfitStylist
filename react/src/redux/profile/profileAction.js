import axios from "axios";
import {POST_PROFILE_REQUEST, POST_PROFILE_SUCCESS, POST_PROFILE_FAILURE} from "./profileTypes";
import { RestUrl } from '../../global';

export const postProfileRequest = () => {
  return {
    type: POST_PROFILE_REQUEST,
  }
};

export const postProfileSuccess = (data) => {
  return {
    type: POST_PROFILE_SUCCESS,
    payload: data
  }
};

export const postProfileFailure = (error) => {
  return {
    type: POST_PROFILE_FAILURE,
    payload: error
  }
};

const url = RestUrl + "/api/v1/profile/create";
export const postProfile = (profileState) => {
  const config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: profileState
  }
  return (dispatch) => {
    dispatch(postProfileRequest);
    axios(config)
    .then( () => {
      dispatch(postProfileSuccess(profileState));
    })
    .catch((error) => {
      dispatch(postProfileFailure(error.message));
    });
  }
}