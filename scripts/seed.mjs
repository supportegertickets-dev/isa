import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'portfolio';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set. Add it to .env.local or pass it as an environment variable.');
  process.exit(1);
}

const files = [
  { key: 'portfolio', path: path.join(root, 'data', 'portfolio.json') },
  { key: 'projects', path: path.join(root, 'app', 'projects.json') },
];

async function seed() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    const collection = db.collection('siteData');

    for (const file of files) {
      if (!fs.existsSync(file.path)) {
        console.log(`⚠ Skipping "${file.key}" — file not found: ${file.path}`);
        continue;
      }
      const data = JSON.parse(fs.readFileSync(file.path, 'utf-8'));
      await collection.replaceOne(
        { _key: file.key },
        { _key: file.key, ...data },
        { upsert: true }
      );
      console.log(`✅ Seeded "${file.key}" from ${path.relative(root, file.path)}`);
    }

    console.log('\n🎉 Done! MongoDB is ready.');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
