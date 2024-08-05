import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MOVIES_URL, DATA_FAILURE, ACCESS_TOKEN, LOADING } from '../../Constants';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import '../css/Home.css';
import { useSelector } from 'react-redux';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const filters = useSelector(state => state.movie.filters);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(MOVIES_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: filters,
        });
        setMovies(response.data);
      } catch (err) {
        setError(DATA_FAILURE);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters, navigate]);

  const handleDeleteMovie = (movieId) => {
    setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== movieId));
  };

  if (isLoading) {
    return <div>{LOADING}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page">
      <header className="home-header">
        {/* Navbar will go here */}
      </header>
      <main className="home-main">
        <div className="movies-container">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} onDelete={handleDeleteMovie} />
          ))}
        </div>
      </main>
      <footer className="home-footer">
        {/* Footer content will go here */}
      </footer>
    </div>
  );
};

export default Home;
