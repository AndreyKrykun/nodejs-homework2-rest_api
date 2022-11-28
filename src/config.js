require("dotenv").config();

const {
  PORT,
  DB_HOST,
  DB_HOST_TEST,
  SECRET,
  EMAIL_SENDER,
  EMAIL_LOGIN,
  EMAIL_PASSWORD,
} = process.env;

module.exports = {
  PORT,
  DB_HOST,
  DB_HOST_TEST,
  SECRET,
  EMAIL_SENDER,
  EMAIL_LOGIN,
  EMAIL_PASSWORD,
};
