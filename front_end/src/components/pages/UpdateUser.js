import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateUserData } from '../../redux/actions/userActions';
import '../css/UpdateUser.css';
import { EMAIL, PASSWORD, UPDATE_ACCOUNT, USERNAME, CANCEL, UPDATE } from '../../Constants';

const UpdateUser = ({ onCancel }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || '',
        email: userData.email || '',
        password: '' // Do not prefill the password field for security reasons
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a copy of formData
    const updatedFormData = { ...formData };
  
    // Check if the password field is empty
    if (!updatedFormData.password) {
      // Remove the password key if it's empty
      delete updatedFormData.password;
    }
  
    // Dispatch the update action with the modified formData
    dispatch(updateUserData(updatedFormData));
  
    console.log("Update button clicked");
  
    // Close the form after updating
    onCancel();
  };

  return (
    <div className="update-user-card">
      <form onSubmit={handleSubmit} className="update-user-form">
        <h2>{UPDATE_ACCOUNT}</h2>
        <label>
          {USERNAME}:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          {EMAIL}:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          {PASSWORD}:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <div className="update-user-buttons">
          <button type="button" className="update-cancel-button" onClick={onCancel}>{CANCEL}</button>
          <button type="submit" className="update-button">{UPDATE}</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
