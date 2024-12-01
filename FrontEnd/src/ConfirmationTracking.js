import React from 'react';

const ConfirmationTracking = ({ trackingId }) => {
  return (
    <div className="confirmation-tracking">
      <h2>Submission Successful!</h2>
      <p>Your thesis has been submitted successfully. Your tracking ID is:</p>
      <strong>{trackingId}</strong>
      <p>You can use this ID to track your thesis submission status.</p>
    </div>
  );
};

export default ConfirmationTracking;
