// src/redux/actions/userActions.js
import axios from 'axios';
import { ACCESS_TOKEN, GET_USER_INFO_URL, UPDATE_USER_URL } from '../../Constants';

export const FETCH_USER_DATA = 'FETCH_USER_DATA';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const SET_USER_INFO = 'SET_USER_INFO'; // New action type

export const fetchUserData = () => async (dispatch) => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get(GET_USER_INFO_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  dispatch({ type: FETCH_USER_DATA, payload: response.data });
};

export const updateUserData = (formData) => async (dispatch) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  await axios.put(UPDATE_USER_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  dispatch({ type: UPDATE_USER_DATA, payload: formData });
};

export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});
