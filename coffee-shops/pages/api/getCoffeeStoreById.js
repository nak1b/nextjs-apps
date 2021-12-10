import { findStoreById } from '../../lib/airtable';

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (!id) {
      res.status(400);
      res.json({ message: "Missing ID" });
      return
    }
    
    const storeRecords = await findStoreById(id);

    if (storeRecords?.length !== 0) {
      res.status(200);
      res.json(storeRecords);
    } else {
      res.status(404);
      res.json({ message: 'id could not be found' });
    }
  } catch(error) {
    res.status(500);
    res.json({ message: 'Oops! Something went wrong.', error });
  }
};

export default getCoffeeStoreById;