const Airtable = require('airtable');
const base = new Airtable({ 
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_KEY);

export const tables = base('coffee-stores');

export const getMinifiedRecords = (recordsData) => {
  const records = recordsData.map(record => ({ ...record.fields }));
  return records;
};

export const findStoreById = async (id) => {
  // find a record
  const findStoreRecords = await tables.select({
    filterByFormula: `id="${id}"`
  }).firstPage();

  return getMinifiedRecords(findStoreRecords);
};