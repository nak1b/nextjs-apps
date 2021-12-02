import { useState } from 'react';

export const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  const [latLong, setLatLong] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMsg('');
    setIsLoading(false);
  };

  const error = () => {
    setLocationErrorMsg('Unable to retrieve your location');
    setIsLoading
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser');
    } else {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    handleTrackLocation,
    locationErrorMsg,
    latLong,
    isLoading
  };
};