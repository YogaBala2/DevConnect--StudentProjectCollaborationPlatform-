import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import "../styles/notification.css";

import {
  getNotifications,
  markAsRead,
} from "../api/notificationApi";

const Notifications = () => {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data =
        await getNotifications();

      setNotifications(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      loadNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="notifications-page">
        <h1 className="notifications-title">
          Notifications
        </h1>

        {notifications.length === 0 ? (
          <div className="empty-notification">
            No Notifications
          </div>
        ) : (
          <div className="notification-list">
            {notifications.map(
              (notification) => (
                <div
                  key={notification._id}
                  className={`notification-card ${
                    notification.isRead
                      ? "notification-read"
                      : "notification-unread"
                  }`}
                >
                  <p className="notification-message">
                    {notification.message}
                  </p>

                  <p className="notification-status">
                    <strong>Status:</strong>{" "}
                    {notification.isRead
                      ? "Read"
                      : "Unread"}
                  </p>

                  {!notification.isRead && (
                    <button
                      className="mark-read-btn"
                      onClick={() =>
                        handleRead(
                          notification._id
                        )
                      }
                    >
                      Mark As Read
                    </button>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Notifications;