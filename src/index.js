import express from 'express';
import cors from 'cors';
import { ulid } from 'ulid';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import path from 'path';
import mainRoutes from './routes/main.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

const landingEjsPath = path.join(__dirname, '../views/landingpage.ejs');

app.use(cors());
app.use(bodyParser.json());
// app.use(morgan('combined'));
// app.use(helmet());

const ulidgen = ulid();
const mains = mainRoutes(ulidgen,landingEjsPath);

app.use(mains);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
