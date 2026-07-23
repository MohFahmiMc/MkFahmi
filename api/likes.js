import { MongoClient } from 'mongodb';

// Otomatis cek MONGODB_URI atau MANGODB_URI
const uri = process.env.MONGODB_URI || process.env.MANGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI and MANGODB_URI belum dikonfigurasi di .env');
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

    // 1. GET: Ambil total count + status apakah visitorId HP ini sudah like
    if (req.method === 'GET') {
      const visitorId = req.query.visitorId || '';
      
      let doc = await collection.findOne({ _id: 'hero_likes' });
      if (!doc) {
        doc = { _id: 'hero_likes', count: 0, voters: [] };
        await collection.insertOne(doc);
      }

      const voters = doc.voters || [];
      const hasLiked = visitorId ? voters.includes(visitorId) : false;

      return res.status(200).json({ 
        count: doc.count || 0, 
        hasLiked: hasLiked 
      });
    }

    // 2. POST: Toggle like khusus untuk visitorId HP ini
    if (req.method === 'POST') {
      const { visitorId } = req.body || {};

      if (!visitorId) {
        return res.status(400).json({ error: 'visitorId diperlukan' });
      }

      let doc = await collection.findOne({ _id: 'hero_likes' });
      if (!doc) {
        doc = { _id: 'hero_likes', count: 0, voters: [] };
        await collection.insertOne(doc);
      }

      const voters = doc.voters || [];
      const alreadyLiked = voters.includes(visitorId);

      let updated;
      if (alreadyLiked) {
        // Jika HP ini sudah like -> UNLIKE (Hapus ID dari array, count - 1)
        updated = await collection.findOneAndUpdate(
          { _id: 'hero_likes' },
          { 
            $pull: { voters: visitorId },
            $inc: { count: -1 } 
          },
          { returnDocument: 'after' }
        );
      } else {
        // Jika HP ini belum like -> LIKE (Masukkan ID ke array, count + 1)
        updated = await collection.findOneAndUpdate(
          { _id: 'hero_likes' },
          { 
            $addToSet: { voters: visitorId },
            $inc: { count: 1 } 
          },
          { returnDocument: 'after' }
        );
      }

      const newDoc = updated.value || updated;
      const newCount = Math.max(0, newDoc ? newDoc.count : 0);
      
      return res.status(200).json({ 
        count: newCount, 
        hasLiked: !alreadyLiked 
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('MongoDB API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
