const { customError } = require("../helpers/errors");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const getContactsController = async (req, res, next) => {
  const { page = 1, limit = 10, favorite = null } = req.query;
  const contacts = await listContacts(page, limit, favorite);

  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) throw customError({ status: 400, message: "Not found" });

  res.status(200).json(contact);
};

const addContactController = async (req, res, next) => {
  const newContactData = req.body;

  const newCreatedContact = await addContact(newContactData);

  res.status(201).json(newCreatedContact);
};

const deleteContactController = async (req, res, next) => {
  const contactRemoved = await removeContact(req.params.contactId);

  if (!contactRemoved) throw customError({ status: 400, message: "Not found" });

  res.status(200).json({ message: "Contact deleted" });
};

const updateContactController = async (req, res, next) => {
  const updatedContact = await updateContact(req.params.contactId, req.body);

  if (!updatedContact) throw customError({ status: 400, message: "Not found" });

  res.status(200).json(updatedContact);
};

const changeFavoriteController = async (req, res, next) => {
  const updatedContact = await updateStatusContact(
    req.params.contactId,
    req.body
  );

  if (!updatedContact) throw customError({ status: 400, message: "Not found" });

  res.status(200).json(updatedContact);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  changeFavoriteController,
};
