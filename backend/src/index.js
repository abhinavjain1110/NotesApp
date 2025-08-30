import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';


dotenv.config();


const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || '*', credentials: true }));


app.get('/', (req, res) => res.send('Notes API running'));
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);


const PORT = process.env.PORT || 5000;


(async () => {
await connectDB(process.env.MONGO_URI);
app.listen(PORT, () => console.log(`🚀 API on http://localhost:${PORT}`));
})();