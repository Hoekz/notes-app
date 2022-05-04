const { Router } = require('express');

const routes = Router();

const data = {
  secret: 'value'
};

routes.get('/data', (req, res) => {
  setTimeout(() => res.json(data), 2000); // wait 2 seconds then send data
});

routes.get('/data/:key', (req, res) => {
  const { key } = req.params;
  const value = data[key];

  if (key in data) {
    res.send(`<p>The value of ${key} is ${value}.</p>`);
  } else {
    res.status(404).send(`<h1>NOT FOUND</h1>`);
  }
});

routes.put('/data', (req, res) => {
  const { key, value } = req.body;

  if (!key || !value) { // reject requests that don't set a key and value
    return res.status(400).json({ "message": "both key and value must be set." });
  }

  data[key] = value; // update the data

  res.json(data); // return the updated data
});

module.exports = routes;
