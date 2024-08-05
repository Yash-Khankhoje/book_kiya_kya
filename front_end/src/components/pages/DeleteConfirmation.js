import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/DeleteConfirmation.css';
import { DELETE, CANCEL, DELETE_USER_URL, DELETE_CONFIRMATION, DELETE_FAILURE, MISSING_TOKEN, ACCESS_TOKEN } from '../../Constants';

const DeleteConfirmation = ({ onCancel }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
        const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        throw new Error(MISSING_TOKEN);
      }
      // Call the delete API
      await axios.delete(DELETE_USER_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error(DELETE_FAILURE, error);
      // Handle error as needed
    }
  };

  return (
    <div className="delete-confirmation-overlay">
        <div className="delete-confirmation-card">
            <p>{DELETE_CONFIRMATION}</p>
            <div className="delete-confirmation-buttons">
                <button className="user-cancellation-button" onClick={onCancel}>{CANCEL}</button>
                <button className="delete-button" onClick={handleDelete}>{DELETE}</button>
            </div>
        </div>
    </div>
  );
};

export default DeleteConfirmation;
