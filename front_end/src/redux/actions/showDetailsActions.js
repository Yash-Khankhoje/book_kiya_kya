// src/redux/actions/showDetailsActions.js
import axios from 'axios';
import { SHOW_DETAILS_URL, DATA_FAILURE } from '../../Constants';

export const SET_SHOW_DETAILS = 'SET_SHOW_DETAILS';
export const SHOW_DETAILS_ERROR = 'SHOW_DETAILS_ERROR';
export const SET_SELECTED_SHOW = 'SET_SELECTED_SHOW'; // New action type

export const setShowDetails = (details) => ({
  type: SET_SHOW_DETAILS,
  payload: details,
});

export const showDetailsError = (error) => ({
  type: SHOW_DETAILS_ERROR,
  payload: error,
});

export const setSelectedShow = (show) => ({
  type: SET_SELECTED_SHOW,
  payload: show,
});

export const fetchShowDetails = (city, movieId, showDate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(SHOW_DETAILS_URL, {
      params: {
        city,
        movie_id: movieId,
        showDate,
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    dispatch(setShowDetails(response.data));
  } catch (error) {
    dispatch(showDetailsError(DATA_FAILURE));
  }
};
