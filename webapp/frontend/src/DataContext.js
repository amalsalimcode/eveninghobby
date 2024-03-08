// DataContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [items, setItems] = useState([]);
  const [markers, setMarkers] = useState([])
  const [radius, setRadius] = useState(2000)

  const getLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ latitude, longitude });
      console.log("now the lat is", latitude, "long is", longitude, currentLocation)
      sendLocationToServer(latitude, longitude);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const sendLocationToServer = async (latitude, longitude) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000?latitude=${latitude}&longitude=${longitude}&radius=${radius/1000}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error sending location to server:', error);
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    getLocation();
  },[]);

  return (
    <DataContext.Provider value={{ currentLocation, setCurrentLocation, items, setItems, markers, setMarkers, radius, setRadius}}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
