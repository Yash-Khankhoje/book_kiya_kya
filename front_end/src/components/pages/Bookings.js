// src/components/pages/Bookings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../css/Bookings.css';
import { BOOKINGS_URL, ACCESS_TOKEN } from '../../Constants';
import { format, parseISO, isAfter, isEqual } from 'date-fns';
import ConfirmCancelModal from './ConfirmCancelModal'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const userId = useSelector((state) => state.user.userInfo?.id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const response = await axios.get(BOOKINGS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { user_id: userId },
        });
        const formattedBookings = response.data.map(booking => ({
          ...booking,
          showDate: format(parseISO(booking.showDate), 'yyyy-MM-dd'), // Ensure showDate is formatted
          total_bill: booking.total_bill || (booking.tickets * booking.ticketPrice) // Calculate total_bill if missing
        }));
        setBookings(formattedBookings);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const handleUpdateBooking = (bookingId) => {
    navigate(`/update-booking/${bookingId}`);
  };

  const handleCancelBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      await axios.delete(`http://127.0.0.1:8000/api/bookings/cancel/${selectedBookingId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Cancellation completed!!!');
      navigate('/home');
    } catch (err) {
      toast.error('Cancellation Failed');
      navigate('/home');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bookings-page">
      <h1 className='booking-heading'>Your Bookings</h1>
      <div className="bookings-container">
        {bookings.map((booking, index) => {
          const showDate = parseISO(booking.showDate);
          const currentDate = new Date();
          const showButtons = booking.status === 'Confirmed' && (isAfter(showDate, currentDate) || isEqual(showDate, currentDate));

          return (
            <div key={index} className={`booking-card ${showButtons ? 'hoverable' : ''}`}>
              <h2 className="movie-name">{booking.movieName}</h2>
              <h3 className="bookings-theater-name">{booking.theaterName}</h3>
              <p className="booking-date">Date: {booking.showDate}</p> {/* Changed to showDate */}
              <p className="show-time">Timing: {booking.timing}</p>
              <p className="tickets">Seats: {booking.tickets}</p>
              <p className="total-price">Total Price: ₹{booking.total_bill}</p>
              <p className={`status ${booking.status.toLowerCase()}`}>Status: {booking.status}</p>
              {showButtons && (
                <div className="booking-buttons">
                  <button
                    className="update-booking-button"
                    onClick={() => handleUpdateBooking(booking.booking_id)}
                  >
                    Update Booking
                  </button>
                  <button
                    className="cancel-booking-button"
                    onClick={() => handleCancelBooking(booking.booking_id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showModal && (
        <ConfirmCancelModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmCancel}
        />
      )}
      <Toaster />
    </div>
  );
};

export default Bookings;
