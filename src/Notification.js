import React, { useEffect, useState } from 'react';
import { BellIcon } from '@heroicons/react/24/solid'; // Import the bell icon
import './Notification.css'; // Import your updated CSS file

const Notification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // Allow time for the fade-out transition
      }, 3000); // Notification stays visible for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <div className={`notification ${visible ? 'show' : ''}`}>
      <BellIcon className="icon" />
      <span>{message}</span>
      <button className="close-button" onClick={() => {
        setVisible(false);
        setTimeout(onClose, 800); // Allow time for the fade-out transition
      }}>×</button>
    </div>
  );
};

export default Notification;
