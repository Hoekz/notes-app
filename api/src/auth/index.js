const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');

const users = [];
const tokens = [];

async function createUser(email, password, name) {
  const id = randomUUID();
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id, email, passwordHash, name };

  users.push(user);

  return { email, name, id };
}

async function createToken(user) {
  const userId = user.id;
  const tokenId = randomUUID();

  tokens.push({ userId, tokenId });

  return tokenId;
}

async function loginUser(email, password) {
  const user = users.find(user => user.email === email);

  if (!user) {
    return null;
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  const userCopy = { ...user };
  delete userCopy.passwordHash;

  return match ? userCopy : null;
}

async function requireAuth(req, res, next) {
  const { authorization } = req.headers;

  const token = tokens.find(token => token.tokenId === authorization);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    next();
  }
}

module.exports = {
  createUser,
  createToken,
  loginUser,
  requireAuth,
};
