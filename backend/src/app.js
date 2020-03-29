const express = require('express'); // express é um mini framework de rotas MVC
const {errors} = require('celebrate');
const routes = require('./routes');
const cors = require('cors');

const app = express(); 

app.use(cors());
app.use(express.json()); // diz ao express que as requisições serão em JSON
app.use(routes); // usa as rotas importadas do arquivo routes.js
app.use(errors());

module.exports = app;
