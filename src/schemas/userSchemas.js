const Joi = require("joi");

const schemaPostUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const schemaPatchUser = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  schemaPostUser,
  schemaPatchUser,
};
