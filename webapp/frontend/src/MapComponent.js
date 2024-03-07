import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MapComponent = ({ latitude, longitude }) => {
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (!latitude || !longitude) {
          const position = await getCurrentPosition();
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          sendLocationToServer(latitude, longitude);
        } else {
          setCurrentLocation({ latitude, longitude });
          sendLocationToServer(latitude, longitude);
        }
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocation();
  }, [latitude, longitude]);

  useEffect(() => {
    const loadMap = () => {
      if (!window.google) return;

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: currentLocation.latitude, lng: currentLocation.longitude },
        zoom: 13,
        
      });


      // Add a circle overlay with 5km radius
      new window.google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        map: map,
        clickable: false,
        center: { lat: currentLocation.latitude, lng: currentLocation.longitude },
        radius: 2000 // 5km in meters
      });



      // Add a marker for the current location
      new window.google.maps.Marker({
        position: { lat: currentLocation.latitude, lng: currentLocation.longitude },
        map: map,
        title: 'Your Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        clickable: false
      });

      if (Array.isArray(markers) && markers.length > 0) {
        markers.forEach(marker => {
          const newMarker = new window.google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lon },
            map: map,
            title: marker.title,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          });
    
          // Add click event listener to each marker
          newMarker.addListener('click', () => {
            // Change color or any other properties of the clicked marker
            newMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
          });
        });
      };
    }

    loadMap();
  }, [currentLocation.latitude, currentLocation.longitude, markers]);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const sendLocationToServer = async (latitude, longitude) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000?latitude=${latitude}&longitude=${longitude}`);
      console.log("received data", response.data)
      setMarkers(response.data);
    } catch (error) {
      console.error('Error sending location to server:', error);
    }
  };

  return <div id="map" style={{ width: '100%', height: '300px' }}></div>;
};

export default MapComponent;
