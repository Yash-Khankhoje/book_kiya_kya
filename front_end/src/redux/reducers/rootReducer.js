// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import { movieReducer } from './movieReducer';

const appReducer = combineReducers({
  movie: movieReducer,
  // Add other reducers here
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
