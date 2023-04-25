import { combineReducers } from 'redux';
import profileReducer from './redux/profile/profileReducer';
import initialRecommendReducer from './redux/initialRecommend/initialRecommendReducer';
import uploadReducer from './redux/upload/uploadReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  initialRecommend: initialRecommendReducer,
  upload: uploadReducer
});

export default rootReducer;
