import React from 'react';
import { useData } from './DataContext';
import './Toggles.css';

const Toggles = () => {
  const { currentLocation, setCurrentLocation, setRadius, radius } = useData();

  const handleLocationChange = (type, value) => {
    setCurrentLocation(prevLocation => ({
      ...prevLocation,
      [type]: value
    }));
  };

  const handleRadiusChange = (event) => {
    setRadius(parseFloat(event.target.value));
  };


  return (
    <div className="toggles-container">
      <div className="toggles-row">
        <label className="toggle-label">
          <span className="toggle-label-text">Latitude:</span>
          <input type="number" value={currentLocation.latitude.toFixed(4)} onChange={(e) => handleLocationChange('latitude', parseFloat(e.target.value))} step="0.01" className="toggle-input" />
        </label>
        <label className="toggle-label">
          <span className="toggle-label-text">Longitude:</span>
          <input type="number" value={currentLocation.longitude.toFixed(4)} onChange={(e) => handleLocationChange('longitude', parseFloat(e.target.value))} step="0.01" className="toggle-input" />
        </label>
        <label className="toggle-label">
          <span className="toggle-label-text">Radius (km):</span>
          <input type="number" value={radius.toFixed(1)} onChange={handleRadiusChange} step="0.1" className="toggle-input" />
        </label>
      </div>
    </div>
  );
};

export default Toggles;
