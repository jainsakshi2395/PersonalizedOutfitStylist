import { SET_PREVIEW_IMAGE } from "./setPreviewTypes";

export const setPreviewImage = (image) => ({
  type: SET_PREVIEW_IMAGE,
  payload: image,
});
