// src/presentation/rest/server.js
require('dotenv').config(); // carica .env
const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server REST listening on port ${PORT}`));