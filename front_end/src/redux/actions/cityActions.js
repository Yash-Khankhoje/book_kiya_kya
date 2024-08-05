// src/redux/actions/cityActions.js
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

export const setSelectedCity = (city) => ({
  type: SET_SELECTED_CITY,
  payload: city,
});
