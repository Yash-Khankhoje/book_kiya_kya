// src/redux/reducers/showDetailsReducer.js
import { SET_SHOW_DETAILS, SHOW_DETAILS_ERROR, SET_SELECTED_SHOW } from '../actions/showDetailsActions';

const initialState = {
  details: [],
  selectedShow: null,
  error: null,
};

export const showDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW_DETAILS:
      return { ...state, details: action.payload, error: null };
    case SHOW_DETAILS_ERROR:
      return { ...state, error: action.payload };
    case SET_SELECTED_SHOW:
      return { ...state, selectedShow: action.payload };
    default:
      return state;
  }
};
