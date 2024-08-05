// src/components/pages/Booking.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Booking.css';
import { BOOK_TICKET_URL, BOOKING_FAILURE, BOOKING_SUCCESS, ACCESS_TOKEN } from '../../Constants';
import { format } from 'date-fns';

const Booking = () => {
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const selectedShow = useSelector((state) => state.showDetails.selectedShow);
  const [ticketCount, setTicketCount] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleMinusClick = () => {
    setTicketCount((prevCount) => Math.max(0, prevCount - 1));
  };

  const handlePlusClick = () => {
    setTicketCount((prevCount) => prevCount + 1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value) && parseInt(value) >= 0) {
      setTicketCount(parseInt(value));
    }
  };

  const handleCancelClick = () => {
    navigate('/show-details');
  };

  const handleBookClick = async () => {
    try {
      setError('');
      const currentDate = new Date();
      const bookingDate = format(currentDate, 'yyyy-MM-dd');
      const token = localStorage.getItem(ACCESS_TOKEN); // Retrieve the token from localStorage

      const response = await axios.post(BOOK_TICKET_URL, {
        show_details_id: selectedShow.id,
        tickets: ticketCount,
        booking_date: bookingDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      });
      alert(BOOKING_SUCCESS);
      navigate('/home');
    } catch (err) {
      setError(BOOKING_FAILURE);
      alert(BOOKING_FAILURE);
      navigate('/show-details');
    }
  };

  const totalPrice = selectedShow.ticketPrice * ticketCount;

  return (
    <div className="booking-page">
      <div className="booking-card">
        <div className="booking-left">
          <img src={selectedMovie.imageURL} alt={selectedMovie.name} className="booking-movie-image" />
          <div className="ticket-counter">
            <button className="counter-button" onClick={handleMinusClick}>-</button>
            <input
              type="text"
              className="ticket-input"
              value={ticketCount}
              onChange={handleInputChange}
            />
            <button className="counter-button" onClick={handlePlusClick}>+</button>
          </div>
        </div>
        <div className="booking-right">
          <div className="total-price">
            Total Price: ₹{totalPrice}
          </div>
          <div className="booking-buttonss">
            <button className="cancel-buttonss" onClick={handleCancelClick}>Cancel</button>
            <button className="book-button" onClick={handleBookClick}>Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
