import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI belum dikonfigurasi di file .env');
}

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db('portfolio');
    const collection = db.collection('likes');

    if (req.method === 'GET') {
      let doc = await collection.findOne({ _id: 'hero_likes' });
      if (!doc) {
        doc = { _id: 'hero_likes', count: 0 };
        await collection.insertOne(doc);
      }
      return res.status(200).json({ count: doc.count });
    }

    if (req.method === 'POST') {
      const { action } = req.body || {};
      const increment = action === 'unlike' ? -1 : 1;

      const updated = await collection.findOneAndUpdate(
        { _id: 'hero_likes' },
        { $inc: { count: increment } },
        { upsert: true, returnDocument: 'after' }
      );

      const newCount = updated.value ? updated.value.count : (updated.count || 0);
      return res.status(200).json({ count: newCount });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('MongoDB API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
