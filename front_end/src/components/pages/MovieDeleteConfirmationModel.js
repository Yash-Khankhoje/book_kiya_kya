import React from 'react';
import axios from 'axios';
import { MOVIE_DELETE_URL, ACCESS_TOKEN } from '../../Constants';
import '../css/MovieDeleteConfirmationModal.css';
import toast from 'react-hot-toast';

const MovieDeleteConfirmationModal = ({ movie, onClose, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            await axios.delete(`${MOVIE_DELETE_URL}/${movie.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onDeleteSuccess();
            onClose();
        } catch (err) {
            toast.error('Failed to delete movie');
            onClose();
        }
    };

    return (
        <div className="delete-confirmation-modal">
            <div className="delete-confirmation-card">
                <p>Sure to delete the movie?</p>
                <div className="delete-confirmation-buttons">
                    <button className="no-button" onClick={onClose}>No</button>
                    <button className="yes-button" onClick={handleDelete}>Yes</button>
                </div>
            </div>
        </div>
    );
};

export default MovieDeleteConfirmationModal;
