import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import { sequelize } from './config/database.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));


app.use(express.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(' Unable to connect to the database:', err);
  });
