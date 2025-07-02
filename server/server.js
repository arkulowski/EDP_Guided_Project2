import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import * as path from 'path';

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB_NAME;

let db;

async function startServer() {
  try {
    app.use(express.static('public'))

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
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_CHARACTERS).findOne({ id: parseInt(req.params.id) });
      res.json(data);
    });

    app.get('/api/films/:id', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_FILMS).findOne({ id: parseInt(req.params.id) });
      res.json(data);
    });

    app.get('/api/planets/:id', async (req, res) => {
      const data = await db.collection(process.env.MONGO_DB_COLLECTION_PLANETS).findOne({ id: parseInt(req.params.id) });
      res.json(data);
    });

    app.get('/api/characters/:id/films', async (req, res) => {
      try {
        const characterId = parseInt(req.params.id);

        const filmCharacterData = await db.collection(process.env.MONGO_DB_COLLECTION_FILMS_CHARACTERS)
          .find({ character_id: characterId })
          .toArray();

        const filmIds = filmCharacterData.map(fc => fc.film_id);

        const films = await db.collection(process.env.MONGO_DB_COLLECTION_FILMS)
          .find({ id: { $in: filmIds } })
          .toArray();

        res.json(films);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching films for the character.' });
      }
    });

    app.get('/api/films/:id/planets', async (req, res) => {
      try {
        const filmId = parseInt(req.params.id);

        const filmPlanetData = await db.collection(process.env.MONGO_DB_COLLECTION_FILMS_PLANETS)
          .find({ film_id: filmId })
          .toArray();

        const planetIds = filmPlanetData.map(fp => fp.planet_id);

        const planets = await db.collection(process.env.MONGO_DB_COLLECTION_PLANETS)
          .find({ id: { $in: planetIds } })
          .toArray();

        res.json(planets);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching planets for the film.' });
      }
    });

    app.get('/api/films/:id/characters', async (req, res) => {
      try {
        const filmId = parseInt(req.params.id);

        const filmCharacterData = await db.collection(process.env.MONGO_DB_COLLECTION_FILMS_CHARACTERS)
          .find({ film_id: filmId })
          .toArray();

        const characterIds = filmCharacterData.map(fc => fc.character_id);

        const characters = await db.collection(process.env.MONGO_DB_COLLECTION_CHARACTERS)
          .find({ id: { $in: characterIds } })
          .toArray();

        res.json(characters);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching characters for the film.' });
      }
    });

    app.get('/api/planets/:id/films', async (req, res) => {
      try {
        const planetId = parseInt(req.params.id);

        const planetFilmData = await db.collection(process.env.MONGO_DB_COLLECTION_FILMS_PLANETS)
          .find({ planet_id: planetId })
          .toArray();

        const filmIds = planetFilmData.map(pf => pf.film_id);

        const films = await db.collection(process.env.MONGO_DB_COLLECTION_FILMS)
          .find({ id: { $in: filmIds } })
          .toArray();

        res.json(films);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching films for the planet.' });
      }
    });

    app.get('/api/planets/:id/characters', async (req, res) => {
      try {
        const planetId = parseInt(req.params.id);

        const characters = await db.collection(process.env.MONGO_DB_COLLECTION_CHARACTERS)
          .find({ homeworld: planetId })
          .toArray();

        res.json(characters);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching characters for the planet.' });
      }
    });

    app.get('/api/characters/:id/planets', async (req, res) => {
      try {
        const characterId = parseInt(req.params.id);

        const character = await db.collection(process.env.MONGO_DB_COLLECTION_CHARACTERS)
          .findOne({ id: characterId });

        if (!character) {
          return res.status(404).json({ error: 'Character not found.' });
        }

        const homeworld = await db.collection(process.env.MONGO_DB_COLLECTION_PLANETS)
          .findOne({ id: character.homeworld });

        if (!homeworld) {
          return res.status(404).json({ error: 'Homeworld not found.' });
        }

        res.json(homeworld);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the homeworld planet.' });
      }
    });
    ;


    app.listen(port, () => {
      console.log(` Server running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error(' Error connecting to MongoDB:', error);
  }
}

startServer();
