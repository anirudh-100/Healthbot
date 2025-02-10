import React from 'react';

const NotificationSection = ({ notifications }: { notifications: any }) => {
  return (
    <div className="notification-section">
      <h2>Notifications</h2>
      <ul>
        {notifications?.map((notification: any) => (
          <li key={notification.id}>
            <p>{notification.message}</p>
            <span>{notification.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationSection;
