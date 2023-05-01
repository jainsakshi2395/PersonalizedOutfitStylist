import { combineReducers } from 'redux';
import profileReducer from './redux/profile/profileReducer';
import initialRecommendReducer from './redux/initialRecommend/initialRecommendReducer';
import uploadReducer from './redux/upload/uploadReducer';
import setPreviewReducer from './redux/updatePreview/setPreviewReducer';
import cardDetailsReducer from './redux/cardDetails/cardDetailsReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  initialRecommend: initialRecommendReducer,
  upload: uploadReducer,
  setPreview: setPreviewReducer,
  cardDetails: cardDetailsReducer
});

export default rootReducer;
