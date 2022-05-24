var express = require('express');
var router = express.Router();
const { createUser, createToken, loginUser } = require('../auth');

// create user
router.post('/', async (req, res) => {
  const { email, password, name } = req.body;

  const user = await createUser(email, password, name);
  const token = await createToken(user);

  res.json({ user, token });
});

// login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  if (!user) {
    return res.status(401).json({ message: 'unrecognized email or password' });
  }

  const token = await createToken(user);

  res.json({ user, token });
});

module.exports = router;
