// DataContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const sendLocationToServer = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`);
        console.log("received data", response.data);
        setMarkers(response.data);
      } catch (error) {
        console.error('Error sending location to server:', error);
      }
    };

    // Call sendLocationToServer whenever currentLocation changes
    sendLocationToServer();
  }, [currentLocation]);

  return (
    <DataContext.Provider value={{ currentLocation, setCurrentLocation, markers, setMarkers }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
