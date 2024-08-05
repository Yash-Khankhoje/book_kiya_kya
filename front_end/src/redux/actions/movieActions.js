// src/redux/actions/movieActions.js
export const SET_SELECTED_MOVIE = 'SET_SELECTED_MOVIE';
export const SET_FILTERS = 'SET_FILTERS';
export const RESET_FILTERS = 'RESET_FILTERS';

export const setSelectedMovie = (movie) => ({
  type: SET_SELECTED_MOVIE,
  payload: movie,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const resetFilters = () => ({
  type: RESET_FILTERS,
});
