// src/redux/reducers/cityReducer.js
import { SET_SELECTED_CITY } from '../actions/cityActions';

const initialState = {
  selectedCity: null,
};

export const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CITY:
      return { ...state, selectedCity: action.payload };
    default:
      return state;
  }
};
