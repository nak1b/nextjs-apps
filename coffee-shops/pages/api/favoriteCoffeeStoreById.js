import { findStoreById, tables, getMinifiedRecords } from '../../lib/airtable';

const favoriteCoffeeStoreById = async (req, res) => {
  const { method, body } = req;

  if (method !== 'PUT') {
    res.status(405);
    res.json({ message: `${method} method not allowed` });
    return;
  }

  const { id } = body;

  try {
    if (!id) {
      res.status(400);
      res.json({ message: "Missing ID" });
      return
    }
    
    const storeRecords = await findStoreById(id);

    if (storeRecords?.length !== 0) {
      const record = storeRecords[0];
      const newVotes = parseInt(record.votes) + 1;
      
      // update record
      const updatedRecord = await tables.update([
        {
          id: record.recordId,
          fields: {
            votes: newVotes
          }
        }
      ]);

      if (updatedRecord) {
        res.status(200);
        res.json(getMinifiedRecords(updatedRecord));
      } else {
        res.status(500);
        res.json({ message: 'something went wrong updating the votes.' });
      }
     
    } else {
      res.status(404);
      res.json({ message: 'id could not be found' });
    }
  } catch(error) {
    res.status(500);
    res.json({ message: 'something went wrong.', error });
  }
}

export default favoriteCoffeeStoreById;
