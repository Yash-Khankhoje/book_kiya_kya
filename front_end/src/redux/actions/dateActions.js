// src/redux/actions/dateActions.js
export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';

export const setSelectedDate = (date) => ({
  type: SET_SELECTED_DATE,
  payload: date,
});
