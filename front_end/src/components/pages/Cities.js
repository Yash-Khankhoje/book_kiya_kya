// src/components/pages/Cities.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector
import axios from 'axios';
import '../css/Cities.css';
import { setSelectedCity } from '../../redux/actions/cityActions';
import { ACCESS_TOKEN, CITY_LIST_URL } from '../../Constants';

const Cities = () => {
    const [cities, setCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedMovie = useSelector((state) => state.movie.selectedMovie); // Access the selected movie from Redux

    // Check if the user is authenticated
    useEffect(() => {
        const isAuthenticated = localStorage.getItem(ACCESS_TOKEN);
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN);
                const response = await axios.get(CITY_LIST_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCities(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                } else {
                    console.error('Error fetching cities:', error);
                }
            }
        };

        fetchCities();
    }, [navigate]);

    const filteredCities = cities.filter(city =>
        city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClose = () => {
        navigate('/home');
    };

    const handleCityClick = (city) => {
        dispatch(setSelectedCity(city)); // Dispatch the city details
        navigate('/calendar'); // Redirect to CalendarCard page
      };

    return (
        <div className="cities-card">
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search cities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <span className="search-icon">🔍</span>
            </div>
            <button className="close-button" onClick={handleClose}>X</button>
            <div className="cities-list">
                {filteredCities.map((city) => (
                    <button key={city.id} className="city-button" onClick={() => handleCityClick(city)}>
                        {city.city}
                    </button>
                ))}
            </div>
            {/* {selectedMovie && (
                <div className="selected-movie-info">
                    <h2>{selectedMovie.name}</h2>
                    <p>Genres: {Array.isArray(selectedMovie.genres) ? selectedMovie.genres.join(', ') : selectedMovie.genres}</p>
                    <p>Language: {selectedMovie.language}</p>
                    <p>Ratings: {selectedMovie.ratings}</p>
                    <p>Description: {selectedMovie.description}</p>
                </div>
            )} */}
        </div>
    );
};

export default Cities;
