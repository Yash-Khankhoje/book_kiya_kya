// src/components/pages/AddMovie.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AddMovie.css';
import { ACCESS_TOKEN } from '../../Constants';
import toast, { Toaster } from 'react-hot-toast';

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    name: '',
    genres: '',
    description: '',
    language: '',
    ratings: '',
    imageURL: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    navigate('/home');
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      await axios.post('http://127.0.0.1:8000/api/movies/add_movie/', movieData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Movie added successfully!');
      navigate('/home');
    } catch (error) {
      toast.error('Failed to add movie. Please try again.');
    }
  };

  return (
    <div className="add-movie-page">
      <div className="add-movie-card">
        <h2 className="add-movie-title">Add Movie</h2>
        <input
          type="text"
          name="name"
          value={movieData.name}
          onChange={handleChange}
          placeholder="Name"
          className="add-movie-input"
        />
        <input
          type="text"
          name="genres"
          value={movieData.genres}
          onChange={handleChange}
          placeholder="Genres"
          className="add-movie-input"
        />
        <input
          type="text"
          name="description"
          value={movieData.description}
          onChange={handleChange}
          placeholder="Description"
          className="add-movie-input"
        />
        <input
          type="text"
          name="language"
          value={movieData.language}
          onChange={handleChange}
          placeholder="Language"
          className="add-movie-input"
        />
        <input
          type="text"
          name="ratings"
          value={movieData.ratings}
          onChange={handleChange}
          placeholder="Ratings"
          className="add-movie-input"
        />
        <input
          type="text"
          name="imageURL"
          value={movieData.imageURL}
          onChange={handleChange}
          placeholder="Image URL"
          className="add-movie-input"
        />
        <div className="add-movie-buttons">
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
          <button onClick={handleAdd} className="create-button">Create</button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddMovie;
