const Joi = require("joi");

const schemaPostContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(15).required(),
  favorite: Joi.boolean().optional(),
});

const schemaPutContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(5).max(15).optional(),
}).min(1);

const schemaPatchContact = Joi.object({
  favorite: Joi.boolean().required(),
}).min(1);

module.exports = {
  schemaPostContact,
  schemaPutContact,
  schemaPatchContact,
};
