const { Router } = require('express');

const routes = Router();

routes.get('/data', (req, res) => {
  setTimeout(() => {
    res.json({ hello: 'world' });
  }, 5000);
});

module.exports = routes;
