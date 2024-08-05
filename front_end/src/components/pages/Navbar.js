import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGO_PATH, APP_NAME, ACCESS_TOKEN, REFRESH_TOKEN, UPDATE_ACCOUNT, DELETE_ACCOUNT, LOGOUT } from '../../Constants';
import '../css/Navbar.css';
import { FaCog, FaMapMarkerAlt, FaFilter, FaVideo, FaFilm } from 'react-icons/fa';
import DeleteConfirmation from './DeleteConfirmation';
import UpdateUser from './UpdateUser';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilters, setFilters } from '../../redux/actions/movieActions';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showFilterCard, setShowFilterCard] = useState(false);
  const [filters, setFilterInputs] = useState({ name: '', language: '', genres: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSuperuser = useSelector((state) => state.user.userInfo?.is_superuser);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    dispatch({ type: 'RESET_STORE' });
    navigate('/login');
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
    setShowDropdown(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleUpdate = () => {
    setShowUpdateUser(true);
    setShowDropdown(false);
  };

  const handleCancelUpdate = () => {
    setShowUpdateUser(false);
  };

  const handleLocationClick = () => {
    navigate('/cities');
  };

  const handleFilterClick = () => {
    setShowFilterCard(!showFilterCard);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterInputs({ ...filters, [name]: value });
  };

  const handleReset = () => {
    setFilterInputs({ name: '', language: '', genres: '' });
    dispatch(resetFilters());
  };

  const handleFilter = () => {
    dispatch(setFilters(filters));
    navigate('/home');
  };

  const handleBookingsClick = () => {
    navigate('/bookings');
  };

  const handleNewFeatureClick = () => {
    navigate('/add-show-details');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/home" className="navbar-logo-link">
            <img src={LOGO_PATH} alt="App Logo" className="navbar-logo" />
          </Link>
          <Link to="/home" className="navbar-title-link">
            <span className="navbar-title">{APP_NAME}</span>
          </Link>
        </div>
        <div className="navbar-right">
          {isSuperuser && (
            <>
              <FaFilm className="new-feature-icon" onClick={handleNewFeatureClick} />
              <FaVideo className="add-movie-icon" onClick={() => navigate('/add-movie')} />
            </>
          )}
          <FaFilter className="filter-icon" onClick={handleFilterClick} />
          <FaMapMarkerAlt className="location-icon" onClick={handleLocationClick} />
          <FaCog className="settings-icon" onClick={toggleDropdown} />
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item update-user" onClick={handleUpdate}>{UPDATE_ACCOUNT}</div>
              <div className="dropdown-item delete-user" onClick={handleDelete}>{DELETE_ACCOUNT}</div>
              <button onClick={handleLogout} className="dropdown-item logout">{LOGOUT}</button>
              <button onClick={handleBookingsClick} className="dropdown-item bookings-button">Bookings</button>
            </div>
          )}
        </div>
      </nav>
      {showDeleteConfirmation && <DeleteConfirmation onCancel={handleCancelDelete} />}
      {showUpdateUser && <UpdateUser onCancel={handleCancelUpdate} />}
      {showUpdateUser && <div className="overlay"></div>}
      {showFilterCard && (
        <div className="filter-card">
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="filter-input"
          />
          <input
            type="text"
            name="language"
            value={filters.language}
            onChange={handleInputChange}
            placeholder="Language"
            className="filter-input"
          />
          <input
            type="text"
            name="genres"
            value={filters.genres}
            onChange={handleInputChange}
            placeholder="Genres"
            className="filter-input"
          />
          <div className="filter-buttons">
            <button onClick={handleReset} className="reset-button">Reset</button>
            <button onClick={handleFilter} className="filter-button">Filter</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
