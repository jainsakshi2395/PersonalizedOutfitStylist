import { combineReducers } from 'redux';
import profileReducer from './redux/profile/profileReducer';
import initialRecommendReducer from './redux/initialRecommend/initialRecommendReducer';
import uploadReducer from './redux/upload/uploadReducer';
import setPreviewReducer from './redux/updatePreview/setPreviewReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  initialRecommend: initialRecommendReducer,
  upload: uploadReducer,
  setPreview: setPreviewReducer
});

export default rootReducer;
