// src/presentation/http/server.js

require('dotenv').config();

const express = require('express');

const routes =
  require('./routes');

const errorHandler =
  require('./middleware/error-handler');

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `HTTP Server running on port ${PORT}`
  );
});