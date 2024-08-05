// src/components/pages/CalendarCard.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/CalendarCard.css'; // Import the CSS file
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_DATE, NEXT } from '../../Constants';
import { setSelectedDate } from '../../redux/actions/dateActions';
import { format } from 'date-fns';

const CalendarCard = () => {
  const [date, setDate] = useState(new Date());
  const selectedCity = useSelector((state) => state.city.selectedCity);
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();
    const thresholdDate = new Date(BASE_DATE);

    if (currentDate > thresholdDate) {
      setDate(currentDate);
    } else {
      setDate(thresholdDate);
    }
    console.log('Selected City:', selectedCity);
    console.log('Selected Movie:', selectedMovie);
  }, [selectedCity, selectedMovie]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleNextClick = () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month since getMonth() returns 0-11
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    dispatch(setSelectedDate(formattedDate));
    navigate('/show-details'); // Navigate to the ShowDetails page
  };

  return (
    <div className="calendar-card-container">
      <div className="calendar-card">
        <Calendar
          className="inner-calendar"
          onChange={handleDateChange}
          value={date}
        />
      </div>
      <button className="next-button" onClick={handleNextClick}>{NEXT}</button>
    </div>
  );
};

export default CalendarCard;
