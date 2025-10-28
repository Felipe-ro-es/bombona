const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const bombonaRoutes = require('./routes/bombonas');
const locationRoutes = require('./routes/locations');
const scanRoutes = require('./routes/scans');

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/bombonas', bombonaRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/scans', scanRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
