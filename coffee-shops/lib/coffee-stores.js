import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY
});

const getCoffeeStorePhotos = async () => {
  const unsplashResonse = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 10,
    orientation: 'portrait',
  });
  const unsplashResults = unsplashResonse.response.results;
  const images = unsplashResults.map(result => result.urls.small)
  
  return images;
};

const getCoffeeStoresUrl = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const url = getCoffeeStoresUrl('43.66018901064544,-79.38500956572811', 'coffee stores', 6)
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_AUTH_TOKEN
    }
  });
  const data = await response.json();
  const storeImages = await getCoffeeStorePhotos();

  return data.results.map((item, i) => ({
    id: item.fsq_id,
    name: item.name,
    address: item.location?.address,
    neighborhood: item.location?.neighborhood?.[0] || null,
    imgUrl: storeImages[i]
  }));
};