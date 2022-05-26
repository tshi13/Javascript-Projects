const bcrypt = require("bcrypt");

const hashPassword = (password) => { //hash and salt password
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (plainPassword, hashedPassword) => { //verify if password is correct
  return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  verifyPassword,
};