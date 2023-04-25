import { SET_PREVIEW_IMAGE } from "./setPreviewTypes";

const initialState = {
  previewImage: null,
};

const setPreviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PREVIEW_IMAGE:
      return {
        ...state,
        previewImage: action.payload,
      };
    default:
      return state;
  }
};

export default setPreviewReducer;
