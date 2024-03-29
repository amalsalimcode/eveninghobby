import React, { useEffect } from 'react';
import { useData } from './DataContext';

const MapComponent = () => {
  const { currentLocation, items, setMarkers, radius } = useData();

  useEffect(() => {
    const loadMap = () => {
      if (!window.google) return;

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: currentLocation.latitude, lng: currentLocation.longitude },
        zoom: 13,
        zoomControl: true, 
        mapTypeControl: false,
        clickable: false,
        styles: [
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }] // Hide points of interest
          }
        ]
      });

      const circle = new window.google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        map: map,
        clickable: false,
        center: { lat: currentLocation.latitude, lng: currentLocation.longitude },
        radius: radius * 1000
      });

      // Add a marker for the current location
      const currentLocationMarker = new window.google.maps.Marker({
        position: { lat: currentLocation.latitude, lng: currentLocation.longitude },
        map: map,
        title: 'Your Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        clickable: false
      });

      const newMarkers = items.map(marker => {
        return new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lon },
          map: map,
          title: marker.title,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          clickable: false
        });
      });

      // Set new markers and clean up old ones
      setMarkers(prevMarkers => {
        prevMarkers.forEach(marker => marker.setMap(null)); // Clear old markers
        return [...newMarkers, currentLocationMarker];
      });

      return () => {
        // Clean up the circle when component unmounts
        circle.setMap(null);
      };
    };

    if (currentLocation.latitude !== 0 && currentLocation.longitude !== 0) {
      loadMap();
    }
  }, [currentLocation.latitude, currentLocation.longitude, items, radius, setMarkers]);

  return <div id="map" style={{ width: '100%', height: '300px' }}></div>;
};

export default MapComponent;
