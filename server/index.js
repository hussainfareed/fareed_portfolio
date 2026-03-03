const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fareed-portfolio')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(() => console.log('⚠️  Running without MongoDB — demo mode active'));

app.use('/api/projects',     require('./routes/projects'));
app.use('/api/blog',         require('./routes/blog'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/contact',      require('./routes/contact'));
app.use('/api/skills',       require('./routes/skills'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Fareed Portfolio Server Running 🚀' }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running: http://localhost:${PORT}`));
