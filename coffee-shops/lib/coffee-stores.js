const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: process.env.FOURSQUARE_AUTH_TOKEN
  }
};

const getCoffeeStoresUrl = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
}

export const fetchCoffeeStores = async () => {
  const url = getCoffeeStoresUrl('43.66018901064544,-79.38500956572811', 'coffee stores', 6)
  const response = await fetch(url, options)
  const data = await response.json()

  return data.results;
}