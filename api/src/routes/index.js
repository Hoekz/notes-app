const { Router } = require('express');

const routes = Router();

routes.get('/data', (req, res) => {
  res.json({ hello: 'world' });
});

module.exports = routes;
