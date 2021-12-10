import { tables, getMinifiedRecords } from '../../lib/airtable';

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (!id) {
      res.status(400);
      res.json({ message: "Missing ID" });
      return
    }
    
    // find a record
    const findStoreRecords = await tables.select({
      filterByFormula: `id="${id}"`
    }).firstPage();

    if (findStoreRecords?.length !== 0) {
      const storeRecords = getMinifiedRecords(findStoreRecords);

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