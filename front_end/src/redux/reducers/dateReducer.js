// src/redux/reducers/dateReducer.js
import { SET_SELECTED_DATE } from '../actions/dateActions';

const initialState = {
  selectedDate: null,
};

export const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
};
