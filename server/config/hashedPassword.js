const bcrypt = require('bcrypt');

async function hashedPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

module.exports = { hashedPassword };
