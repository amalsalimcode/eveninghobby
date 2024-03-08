import React, { useState } from 'react';
import './Toggles.css';

const Toggles = ({ items }) => {
    
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [radius, setRadius] = useState(5);

  const handleLatitudeChange = (event) => {
    setLatitude(parseFloat(event.target.value));
  };

  const handleLongitudeChange = (event) => {
    setLongitude(parseFloat(event.target.value));
  };

  const handleRadiusChange = (event) => {
    setRadius(parseFloat(event.target.value));
  };

  const increaseLatitude = () => {
    setLatitude(latitude + 1);
  };

  const decreaseLatitude = () => {
    setLatitude(latitude - 1);
  };

  const increaseLongitude = () => {
    setLongitude(longitude + 1);
  };

  const decreaseLongitude = () => {
    setLongitude(longitude - 1);
  };

  const increaseRadius = () => {
    setRadius(radius + 1);
  };

  const decreaseRadius = () => {
    setRadius(radius - 1);
  };

  return (
    <div className="toggles-container">
      <div className="toggles-row">
        <label className="toggle-label">
          <span className="toggle-label-text">Latitude</span>
          <div className="toggle-control">
            <button className="toggle-button" onClick={increaseLatitude}>+</button>
            <input type="number" value={latitude} onChange={handleLatitudeChange} className="toggle-input" />
            <button className="toggle-button" onClick={decreaseLatitude}>-</button>
          </div>
        </label>
        <label className="toggle-label">
          <span className="toggle-label-text">Longitude</span>
          <div className="toggle-control">
            <button className="toggle-button" onClick={increaseLongitude}>+</button>
            <input type="number" value={longitude} onChange={handleLongitudeChange} className="toggle-input" />
            <button className="toggle-button" onClick={decreaseLongitude}>-</button>
          </div>
        </label>
        <label className="toggle-label">
          <span className="toggle-label-text">Radius (km)</span>
          <div className="toggle-control">
            <button className="toggle-button" onClick={increaseRadius}>+</button>
            <input type="number" value={radius} onChange={handleRadiusChange} className="toggle-input" />
            <button className="toggle-button" onClick={decreaseRadius}>-</button>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Toggles;
