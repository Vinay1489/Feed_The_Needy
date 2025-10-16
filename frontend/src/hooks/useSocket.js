import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Initialize socket connection
      const socketURL =
        import.meta.env.VITE_SOCKET_URL ||
        (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
      const newSocket = io(socketURL, {
        withCredentials: true,
        auth: {
          userId: user._id,
          role: user.role
        }
      });

      socketRef.current = newSocket;
      setSocket(newSocket);

      // Connection event handlers
      newSocket.on('connect', () => {
        console.log('Connected to server');
        setConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
        setConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        setConnected(false);
      });

      return () => {
        newSocket.close();
        socketRef.current = null;
        setSocket(null);
        setConnected(false);
      };
    }
  }, [isAuthenticated, user]);

  return { socket, connected };
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      // Listen for new notifications
      socket.on('newNotification', (notification) => {
        setNotifications(prev => [notification, ...prev]);
      });

      // Listen for notification updates
      socket.on('notificationUpdate', (updatedNotification) => {
        setNotifications(prev => 
          prev.map(notif => 
            notif._id === updatedNotification._id 
              ? updatedNotification 
              : notif
          )
        );
      });

      // Listen for notification deletion
      socket.on('notificationDeleted', (notificationId) => {
        setNotifications(prev => 
          prev.filter(notif => notif._id !== notificationId)
        );
      });

      return () => {
        socket.off('newNotification');
        socket.off('notificationUpdate');
        socket.off('notificationDeleted');
      };
    }
  }, [socket]);

  const markAsRead = (notificationId) => {
    if (socket) {
      socket.emit('markNotificationRead', notificationId);
    }
  };

  const markAllAsRead = () => {
    if (socket) {
      socket.emit('markAllNotificationsRead');
    }
  };

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    unreadCount: notifications.filter(n => !n.read).length
  };
};

export const useLocationTracking = () => {
  const { socket } = useSocket();
  const [location, setLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const watchIdRef = useRef(null);

  const startTracking = () => {
    if (navigator.geolocation && socket) {
      setTracking(true);
      
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: Date.now()
          };
          
          setLocation(newLocation);
          
          // Emit location update to server
          socket.emit('volunteerLocationUpdate', {
            lat: newLocation.lat,
            lng: newLocation.lng,
            timestamp: newLocation.timestamp
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setTracking(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }
  };

  const stopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setTracking(false);
    }
  };

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return {
    location,
    tracking,
    startTracking,
    stopTracking
  };
};

export const useFoodUpdates = () => {
  const [foodItems, setFoodItems] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      // Listen for food item updates
      socket.on('foodItemUpdated', (updatedFood) => {
        setFoodItems(prev => 
          prev.map(food => 
            food._id === updatedFood._id ? updatedFood : food
          )
        );
      });

      // Listen for new food items
      socket.on('newFoodItem', (newFood) => {
        setFoodItems(prev => [newFood, ...prev]);
      });

      // Listen for food item status changes
      socket.on('foodStatusChanged', ({ foodId, status, volunteerId }) => {
        setFoodItems(prev => 
          prev.map(food => 
            food._id === foodId 
              ? { ...food, status, volunteer: volunteerId }
              : food
          )
        );
      });

      return () => {
        socket.off('foodItemUpdated');
        socket.off('newFoodItem');
        socket.off('foodStatusChanged');
      };
    }
  }, [socket]);

  const claimFood = (foodId) => {
    if (socket) {
      socket.emit('claimFood', foodId);
    }
  };

  const completePickup = (foodId) => {
    if (socket) {
      socket.emit('completePickup', foodId);
    }
  };

  return {
    foodItems,
    claimFood,
    completePickup
  };
};
