const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const bombonaRoutes = require('./routes/bombonaRoutes');
const cors = require('cors');


const localRoutes = require('./routes/localRoutes');


app.use(express.json());
app.use(cors())
app.use('/api/locais', localRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bombonas', bombonaRoutes);

module.exports = app;
