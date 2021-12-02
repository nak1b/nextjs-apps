import { useContext, useState } from 'react';
import { ACTION_TYPES, StoreContext } from '../pages/_app';

export const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(StoreContext);

  const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: `${latitude},${longitude}`
    });

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
    isLoading
  };
};