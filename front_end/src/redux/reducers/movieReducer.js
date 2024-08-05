// src/redux/reducers/movieReducer.js
import { SET_SELECTED_MOVIE, SET_FILTERS, RESET_FILTERS } from '../actions/movieActions';

const initialState = {
  selectedMovie: null,
  filters: { name: '', language: '', genres: '' },
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_MOVIE:
      return { ...state, selectedMovie: action.payload };
    case SET_FILTERS:
      return { ...state, filters: action.payload };
    case RESET_FILTERS:
      return { ...state, filters: { name: '', language: '', genres: '' } };
    default:
      return state;
  }
};
