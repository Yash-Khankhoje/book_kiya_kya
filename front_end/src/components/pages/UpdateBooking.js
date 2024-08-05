// src/components/pages/UpdateBooking.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/UpdateBooking.css';
import { ACCESS_TOKEN } from '../../Constants';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';

const UpdateBooking = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const response = await axios.get(`http://127.0.0.1:8000/api/bookings/booking_detail/${bookingId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookingDetails(response.data);
        setTicketCount(response.data.tickets);
      } catch (err) {
        setError('Failed to fetch booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

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
    navigate('/bookings');
  };

  const handleUpdateClick = async () => {
    try {
      setError('');
      const token = localStorage.getItem(ACCESS_TOKEN); // Retrieve the token from localStorage

      await axios.put(`http://127.0.0.1:8000/api/bookings/update/${bookingId}/`, {
        tickets: ticketCount,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      });
      toast.success('Booking updated successfully!');
      navigate('/bookings');
    } catch (err) {
      setError('Failed to update booking. Please try again.');
      toast.error('Failed to update booking.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const totalPrice = bookingDetails ? bookingDetails.ticketPrice * ticketCount : 0;

  return (
    <div className="update-booking-page">
      <div className="update-booking-card">
        {bookingDetails && (
          <>
            <h2 className="update-movie-name">{bookingDetails.movieName}</h2>
            <h3 className="update-theater-name">{bookingDetails.theaterName}</h3>
            <p className="update-show-date">Date: {format(new Date(bookingDetails.showDate), 'yyyy-MM-dd')}</p>
            <p className="update-show-time">Timing: {bookingDetails.timing}</p>
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
            <div className="update-total-price">
              Total Price: ₹{totalPrice}
            </div>
            <div className="update-booking-buttons">
              <button className="cancel-update-button" onClick={handleCancelClick}>Cancel</button>
              <button className="confirm-update-button" onClick={handleUpdateClick}>Update</button>
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default UpdateBooking;
