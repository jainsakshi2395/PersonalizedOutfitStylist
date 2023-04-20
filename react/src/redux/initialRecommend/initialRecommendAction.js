import axios from "axios";
import {POST_INITIAL_RECOMMEND_REQUEST, POST_INITIAL_RECOMMEND_SUCCESS, POST_INITIAL_RECOMMEND_FAILURE} from "./initialRecommendTypes";
import { RestUrl } from '../../global';

export const postInitialRecommendRequest = () => {
  return {
    type: POST_INITIAL_RECOMMEND_REQUEST,
  }
};

export const postInitialRecommendSuccess = (data) => {
  return {
    type: POST_INITIAL_RECOMMEND_SUCCESS,
    payload: data
  }
};

export const postInitialRecommendFailure = (error) => {
  return {
    type: POST_INITIAL_RECOMMEND_FAILURE,
    payload: error
  }
};

const url = RestUrl + "/image_file/recommend_all/";
export const postInitialRecommend = (profileState) => {
  const config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: profileState
  }
  return (dispatch) => {
    dispatch(postInitialRecommendRequest);
    axios(config)
    .then( (response) => {
      dispatch(postInitialRecommendSuccess(response.data));
    })
    .catch((error) => {
      dispatch(postInitialRecommendFailure(error.message));
    });
  }
}
