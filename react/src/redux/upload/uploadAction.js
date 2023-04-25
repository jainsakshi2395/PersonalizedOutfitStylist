import axios from "axios";
import {POST_UPLOAD_REQUEST, POST_UPLOAD_SUCCESS, POST_UPLOAD_FAILURE} from "./uploadTypes";
import { RestUrl } from '../../global';

export const postUploadRequest = () => {
  return {
    type: POST_UPLOAD_REQUEST,
  }
};

export const postUploadSuccess = (data) => {
  return {
    type: POST_UPLOAD_SUCCESS,
    payload: data
  }
};

export const postUploadFailure = (error) => {
  return {
    type: POST_UPLOAD_FAILURE,
    payload: error
  }
};

const url = RestUrl + "/image_file/upload/";
export const postUpload = (uploadState) => {
  const config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: uploadState
  }
  return (dispatch) => {
    dispatch(postUploadRequest);
    axios(config)
    .then( (response) => {
      dispatch(postUploadSuccess(response.data));
    })
    .catch((error) => {
      dispatch(postUploadFailure(error.message));
    });
  }
}
