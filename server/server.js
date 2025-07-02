import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB_NAME;

let db;

async function startServer() {
  try {
    const client = new MongoClient(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await client.connect();
    console.log(' Connected to MongoDB');
    db = client.db(dbName);

  
    app.get('/api/characters', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_CHARACTERS).find().toArray();
      res.json(data);
    });

    app.get('/api/films', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_FILMS).find().toArray();
      res.json(data);
    });

    app.get('/api/planets', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_PLANETS).find().toArray();
      res.json(data);
    });

    app.get('/api/characters/:id', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_CHARACTERS).findOne({ _id: new ObjectId(req.params.id) });
      res.json(data);
    });

    app.get('/api/films/:id', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_FILMS).findOne({ _id: new ObjectId(req.params.id) });
      res.json(data);
    });

    app.get('/api/planets/:id', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_PLANETS).findOne({ _id: new ObjectId(req.params.id) });
      res.json(data);
    });

    app.get('/api/films/:id/characters', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_FILMS_CHARACTERS).find({ film_id: req.params.id }).toArray();
      res.json(data);
    });

    app.get('/api/films/:id/planets', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_FILMS_PLANETS).find({ film_id: req.params.id }).toArray();
      res.json(data);
    });

    app.get('/api/characters/:id/films', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_CHARACTERS_FILMS).find({ character_id: req.params.id }).toArray();
      res.json(data);
    });

    app.get('/api/planets/:id/films', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_PLANETS_FILMS).find({ planet_id: req.params.id }).toArray();
      res.json(data);
    });

    app.get('/api/planets/:id/characters', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_PLANETS_CHARACTERS).find({ planet_id: req.params.id }).toArray();
      res.json(data);
    });

  
    app.listen(port, () => {
      console.log(` Server running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error(' Error connecting to MongoDB:', error);
  }
}

startServer();
