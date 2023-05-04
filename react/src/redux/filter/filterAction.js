import axios from "axios";
import {FILTER_REQUEST, FILTER_SUCCESS, FILTER_FAILURE} from "./filterTypes";
import { RestUrl } from '../../global';

export const postFilterRequest = () => {
  return {
    type: FILTER_REQUEST,
  }
};

export const postFilterSuccess = (data) => {
  return {
    type: FILTER_SUCCESS,
    payload: data
  }
};

export const postFilterFailure = (error) => {
  return {
    type: FILTER_FAILURE,
    payload: error
  }
};

const url = RestUrl + "/image_file/recommend_all/";
export const postFilter = (filterState) => {
  const config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: filterState
  }
  return (dispatch) => {
    dispatch(postFilterRequest);
    axios(config)
    .then( (response) => {
      dispatch(postFilterSuccess(response.data));
    })
    .catch((error) => {
      dispatch(postFilterFailure(error.message));
    });
  }
}