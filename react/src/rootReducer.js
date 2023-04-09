import { combineReducers } from 'redux';
import profileReducer from './redux/profile/profileReducer';

const rootReducer = combineReducers({
  profile: profileReducer
});

export default rootReducer;
