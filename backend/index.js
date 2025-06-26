const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const { sequelize } = require('./config/database');

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
    console.log('Database synchronized successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });