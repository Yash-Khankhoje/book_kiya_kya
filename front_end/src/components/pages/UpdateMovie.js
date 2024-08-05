// src/components/pages/UpdateMovie.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UPDATE_MOVIE_URL, ACCESS_TOKEN } from '../../Constants';
import '../css/UpdateMovie.css';
import toast, { Toaster } from 'react-hot-toast';

const UpdateMovie = () => {
    const selectedMovie = useSelector((state) => state.movie.selectedMovie);
    const [language, setLanguage] = useState(selectedMovie.language);
    const [ratings, setRatings] = useState(selectedMovie.ratings);
    const [imageURL, setImageURL] = useState(selectedMovie.imageURL);
    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate('/home');
    };

    const handleUpdateClick = async () => {
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            await axios.put(`${UPDATE_MOVIE_URL}${selectedMovie.id}/`, {
                language,
                ratings,
                imageURL
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Movie updated successfully!');
            navigate('/home');
        } catch (err) {
            toast.error('Failed to update movie.');
        }
    };

    return (
        <div className="update-movie-page">
            <div className="update-movie-card">
                <h2 className="update-movie-title">{selectedMovie.name}</h2>
                <input
                    type="text"
                    className="update-movie-input"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="Language"
                />
                <input
                    type="number"
                    className="update-movie-input"
                    value={ratings}
                    onChange={(e) => setRatings(e.target.value)}
                    placeholder="Ratings"
                    min="1"
                    max="5"
                    step="0.1"
                />
                <input
                    type="text"
                    className="update-movie-input"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    placeholder="Image URL"
                />
                <div className="update-movie-buttons">
                    <button className="update-movie-cancel-button" onClick={handleCancelClick}>Cancel</button>
                    <button className="update-movie-update-button" onClick={handleUpdateClick}>Update</button>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default UpdateMovie;
