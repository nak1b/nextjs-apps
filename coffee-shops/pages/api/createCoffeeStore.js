import { tables, getMinifiedRecords } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
  const { method, body } = req;

  if (method !== 'POST') {
    res.status(405);
    res.json({ message: `${method} method not allowed` });
    return;
  }

  const { id, name, address, neighbourhood, votes, imgUrl } = body;

  if (!id) {
    res.status(400);
    res.json({ message: "Missing ID" });
    return
  }

  try {
    // find a record
    const findStoreRecords = await tables.select({
      filterByFormula: `id="${id}"`
    }).firstPage();

    if (findStoreRecords?.length !== 0) {
      const storeRecords = getMinifiedRecords(findStoreRecords);

      res.status(200);
      res.json(storeRecords);
    } else {
      if (!name) {
        res.status(400);
        res.json({ message: "Missing Name"});
        return;
      } 

      // create new record
      const recordCreated = await tables.create([{
        fields: {
          id,
          name,
          address,
          neighbourhood,
          votes,
          imgUrl
        }
      }]);
      const newStoreRecords = getMinifiedRecords(recordCreated);

      res.status(200);
      res.json(newStoreRecords);
    }
  } catch(error) {
    res.status(500)
    res.json({ message: 'Error creating or finding a store', error })
  }
};

export default createCoffeeStore;
