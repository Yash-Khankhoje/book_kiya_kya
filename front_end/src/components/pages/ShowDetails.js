// src/components/pages/ShowDetails.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchShowDetails, setSelectedShow } from '../../redux/actions/showDetailsActions'; // Import setSelectedShow action
import '../css/ShowDetails.css';
import { LOADING, DATA_FAILURE } from '../../Constants';

const ShowDetails = () => {
  const selectedCity = useSelector((state) => state.city.selectedCity);
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const selectedDate = useSelector((state) => state.date.selectedDate);
  const showDetails = useSelector((state) => state.showDetails.details);
  const error = useSelector((state) => state.showDetails.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCity || !selectedMovie || !selectedDate) {
      navigate('/home'); // Redirect to home if required data is missing
      return;
    }
    dispatch(fetchShowDetails(selectedCity.city, selectedMovie.id, selectedDate));
  }, [selectedCity, selectedMovie, selectedDate, navigate, dispatch]);

  const handleBookNowClick = (show) => {
    dispatch(setSelectedShow(show)); // Dispatch selected show
    navigate('/booking'); // Navigate to the booking page
  };

  if (error) {
    return <div>{DATA_FAILURE}</div>;
  }

  return (
    <div className="show-details-page">
      <div className="show-movie-info">
        <img src={selectedMovie.imageURL} alt={selectedMovie.name} className="show-movie-image" />
        <h1 className="movie-name">{selectedMovie.name}</h1>
      </div>
      <div className="show-details-container">
        {showDetails.length === 0 ? (
          <div>{LOADING}</div>
        ) : (
          showDetails.map((show, index) => (
            <div key={index} className="show-card">
              <h2 className="theater-name">{show.theaterName}</h2>
              <p className="show-timing">Timing: {show.timing}</p>
              <p className="available-seats">Available Seats: {show.availableSeats}</p>
              <p className="price">Price: ₹{show.ticketPrice}</p>
              <button className="book-now-button" onClick={() => handleBookNowClick(show)}>Book Now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowDetails;
