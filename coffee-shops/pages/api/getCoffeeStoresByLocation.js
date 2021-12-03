import { fetchCoffeeStores } from '../../lib/coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const stores = await fetchCoffeeStores(latLong, limit);
  
    res.status(200);
    res.json(stores);
  } catch(error) {
    res.status(500);
    res.json({ message: 'Oops! Something went wrong.', error });
  }
};

export default getCoffeeStoresByLocation;