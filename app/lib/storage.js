import { MongoClient } from 'mongodb';

let cachedClient = null;

async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGODB_URI);
    await cachedClient.connect();
  }
  return cachedClient.db(process.env.MONGODB_DB || 'portfolio');
}

export async function readData(key) {
  const db = await getDb();
  const doc = await db.collection('siteData').findOne({ _key: key });
  if (doc) {
    const { _id, _key, ...data } = doc;
    return data;
  }
  return null;
}

export async function writeData(key, data) {
  const db = await getDb();
  await db.collection('siteData').replaceOne(
    { _key: key },
    { _key: key, ...data },
    { upsert: true }
  );
}
