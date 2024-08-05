// src/components/pages/AddShowDetails.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ADD_SHOW_DETAILS_URL, ACCESS_TOKEN } from '../../Constants';
import toast, { Toaster } from 'react-hot-toast';
import '../css/AddShowDetails.css';

const AddShowDetails = () => {
  const [showDate, setShowDate] = useState(new Date());
  const [formData, setFormData] = useState({
    city: '',
    theaterName: '',
    movie: '',
    timing: '',
    totalSeats: '',
    availableSeats: '',
    occupiedSeats: '',
    ticketPrice: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelClick = () => {
    navigate('/home');
  };

  const handleAddClick = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      await axios.post(ADD_SHOW_DETAILS_URL, {
        ...formData,
        showDate: showDate.toISOString().split('T')[0], // Convert date to yyyy-mm-dd
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Show Details added successfully!');
      navigate('/home');
    } catch (error) {
      toast.error('Failed to add Show Details. Please try again.');
    }
  };

  return (
    <div className="add-show-details-page">
      <div className="add-show-details-card">
        <h2 className="add-show-details-title">Add Show Details</h2>
        <DatePicker
          selected={showDate}
          onChange={(date) => setShowDate(date)}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          className="add-show-details-input"
          placeholderText="Show Date"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
          className="add-show-details-input"
        />
        <input
          type="text"
          name="theaterName"
          value={formData.theaterName}
          onChange={handleInputChange}
          placeholder="Theater Name"
          className="add-show-details-input"
        />
        <input
          type="text"
          name="movie"
          value={formData.movie}
          onChange={handleInputChange}
          placeholder="Movie"
          className="add-show-details-input"
        />
        <input
          type="text"
          name="timing"
          value={formData.timing}
          onChange={handleInputChange}
          placeholder="Timing"
          className="add-show-details-input"
        />
        <input
          type="number"
          name="totalSeats"
          value={formData.totalSeats}
          onChange={handleInputChange}
          placeholder="Total Seats"
          className="add-show-details-input"
        />
        <input
          type="number"
          name="availableSeats"
          value={formData.availableSeats}
          onChange={handleInputChange}
          placeholder="Available Seats"
          className="add-show-details-input"
        />
        <input
          type="number"
          name="occupiedSeats"
          value={formData.occupiedSeats}
          onChange={handleInputChange}
          placeholder="Occupied Seats"
          className="add-show-details-input"
        />
        <input
          type="number"
          step="0.01"
          name="ticketPrice"
          value={formData.ticketPrice}
          onChange={handleInputChange}
          placeholder="Ticket Price"
          className="add-show-details-input"
        />
        <div className="add-show-details-buttons">
          <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
          <button className="add-button" onClick={handleAddClick}>Add</button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddShowDetails;
