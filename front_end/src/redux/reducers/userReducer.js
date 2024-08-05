// src/redux/reducers/userReducer.js
import { FETCH_USER_DATA, UPDATE_USER_DATA, SET_USER_INFO } from '../actions/userActions';

const initialState = {
  data: null,
  userInfo: null, // New state property for user info
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return { ...state, data: action.payload };
    case UPDATE_USER_DATA:
      return { ...state, data: action.payload };
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload }; // Handle new action
    default:
      return state;
  }
};
