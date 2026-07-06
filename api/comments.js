import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MANGODB_URI || process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error('Silakan tambahkan env MANGODB_URI ke dalam konfigurasi Vercel Anda');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db('portfolio_db');
    const collection = db.collection('comments');

    if (req.method === 'GET') {
      const comments = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(comments);
    }

    if (req.method === 'POST') {
      const { name, content } = req.body;
      if (!name || !content) {
        return res.status(400).json({ error: 'Data tidak lengkap' });
      }

      const newComment = {
        name: name.substring(0, 50),
        content: content.substring(0, 500),
        createdAt: new Date()
      };

      await collection.insertOne(newComment);
      return res.status(201).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const { id, password } = req.body;
      const adminPassword = process.env.PASSWORD;

      if (!adminPassword || password !== adminPassword) {
        return res.status(401).json({ error: 'Akses ditolak' });
      }

      if (!id) {
        return res.status(400).json({ error: 'ID dibutuhkan' });
      }

      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
