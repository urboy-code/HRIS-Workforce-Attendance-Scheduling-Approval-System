const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('HRIS Backend API is Running...🚀');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
