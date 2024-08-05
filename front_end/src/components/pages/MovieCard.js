// src/components/pages/MovieCard.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedMovie } from '../../redux/actions/movieActions';
import MovieDeleteConfirmationModal from './MovieDeleteConfirmationModel';
import '../css/MovieCard.css';
import toast, { Toaster } from 'react-hot-toast';

const MovieCard = ({ movie, onDelete }) => {
    const { name, genres, description, language, ratings, imageURL } = movie;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const isSuperuser = useSelector((state) => state.user.userInfo?.is_superuser);

    const handleBookTicket = () => {
        dispatch(setSelectedMovie(movie));
        navigate('/cities');
    };

    const handleDeleteMovie = () => {
        dispatch(setSelectedMovie(movie));
        setShowModal(true);
    };

    const handleUpdateMovie = () => {
        navigate('/update-movie');
    };

    const handleDeleteSuccess = () => {
        onDelete(movie.id);
        toast.success('Movie deleted!');
    };

    const getStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        return (
            <>
                {'★'.repeat(fullStars)}
                {halfStar && '☆'}
                {'☆'.repeat(5 - fullStars - (halfStar ? 1 : 0))}
            </>
        );
    };

    const getStarColor = () => {
        if (ratings < 2.0) return 'red';
        if (ratings <= 3.5) return 'yellow';
        return 'green';
    };

    return (
        <div className="movie-card">
            <div className="movie-header">
                <div className="movie-image-container">
                    <img src={imageURL} alt={name} className="movie-image" />
                </div>
                <div className="movie-info">
                    <h2 className="movie-title">{name}</h2>
                    <p className="movie-genres">Genres: {Array.isArray(genres) ? genres.join(', ') : genres}</p>
                    <p className="movie-language">Language: {language}</p>
                    <p className="movie-ratings" style={{ color: getStarColor() }}>
                        {getStars(ratings)}
                    </p>
                </div>
            </div>
            <p className="movie-description">{description}</p>
            <div className="movie-card-buttons">
                <button className="book-ticket-button" onClick={handleBookTicket}>Book Ticket</button>
                {isSuperuser && (
                    <>
                        <button className="update-movie-button" onClick={handleUpdateMovie}>Update Movie</button>
                        <button className="delete-movie-button" onClick={handleDeleteMovie}>Delete Movie</button>
                    </>
                )}
            </div>
            {showModal && (
                <MovieDeleteConfirmationModal
                    movie={movie}
                    onClose={() => setShowModal(false)}
                    onDeleteSuccess={handleDeleteSuccess}
                />
            )}
            <Toaster />
        </div>
    );
};

export default MovieCard;
