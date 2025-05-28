const express = require('express');
const goalRoutes = require('./routes/goalRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

app.use(express.json());

app.use('/api/goals', goalRoutes);
app.use('/api/analytics', analyticsRoutes);

module.exports = app;