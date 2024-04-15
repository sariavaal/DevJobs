const jwt = require('jsonwebtoken');
const secret = "mysecret";
function generarTokenUnico() {
  const token = jwt.sign({}, secret, { expiresIn: '1d' });
  return token;
}

module.exports = generarTokenUnico;
