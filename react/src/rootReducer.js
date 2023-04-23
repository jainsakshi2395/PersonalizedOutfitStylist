import { combineReducers } from 'redux';
import profileReducer from './redux/profile/profileReducer';
import initialRecommendReducer from './redux/initialRecommend/initialRecommendReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  initialRecommend: initialRecommendReducer
});

export default rootReducer;
