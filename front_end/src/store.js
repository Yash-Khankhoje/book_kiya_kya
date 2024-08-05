import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer } from './redux/reducers/userReducer';
import { movieReducer } from './redux/reducers/movieReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cityReducer } from './redux/reducers/cityReducer';
import { dateReducer } from './redux/reducers/dateReducer';
import { showDetailsReducer } from './redux/reducers/showDetailsReducer';

const appReducer = combineReducers({
  user: userReducer,
  movie: movieReducer,
  city: cityReducer,
  date: dateReducer,
  showDetails: showDetailsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
