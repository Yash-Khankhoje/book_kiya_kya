// src/components/ConfirmCancelModal.js
import React from 'react';
import '../css/ConfirmCancelModal.css';

const ConfirmCancelModal = ({ onClose, onConfirm }) => {
  return (
    <div className="confirm-cancel-modal">
      <div className="confirm-cancel-modal-content">
        <h2>Are you sure to cancel the booking?</h2>
        <div className="modal-buttons">
          <button className="no-button" onClick={onClose}>No</button>
          <button className="yes-button" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCancelModal;
