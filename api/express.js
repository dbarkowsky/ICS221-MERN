import 'dotenv/config.js';
import './db.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/api-router.js';
import rateLimit from 'express-rate-limit';
import passport from 'passport';

const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(rateLimit());
app.use(passport.initialize());

// Routing
app.get('/', (req, res) => {
    res.send('Node.js Server is live!');
});

app.use('/api', apiRouter);

export default app;