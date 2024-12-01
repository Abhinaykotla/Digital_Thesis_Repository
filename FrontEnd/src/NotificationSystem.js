import React, { useEffect, useState } from 'react';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = () => {
      const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
      const newNotifications = storedComments.map(comment => ({
        thesisId: comment.thesisId,
        message: `New comment on thesis ID ${comment.thesisId}: "${comment.text}"`,
        timestamp: comment.timestamp,
      }));
      setNotifications(newNotifications);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notification-system">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <p>{notification.message}</p>
              <small>{notification.timestamp}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  );
};

export default NotificationSystem;
