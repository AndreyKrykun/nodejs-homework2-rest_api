let Contact = require("../models/schemas/contact");

const listContacts = async (page, limit, favorite) => {
  const favoriteFilter = favorite === null ? {} : { favorite };

  const contacts = await Contact.find(favoriteFilter)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Contact.countDocuments();

  return {
    contacts,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

const getContactById = async (contactId) => {
  const contactById = await Contact.findOne({ _id: contactId }).catch(() => {
    return null;
  });

  return contactById;
};

const removeContact = async (id) => {
  const removedContact = await Contact.findByIdAndRemove({ _id: id }).catch(
    () => {
      return null;
    }
  );

  return removedContact;
};

const addContact = async ({ name, email, phone, favorite = false }) => {
  const createdContact = await Contact.create({ name, email, phone, favorite });

  return createdContact;
};

const updateContact = async (id, fields) => {
  const updatedContact = await Contact.findByIdAndUpdate({ _id: id }, fields, {
    new: true,
  }).catch(() => {
    return null;
  });

  return updatedContact;
};

const updateStatusContact = async (id, fields) => {
  const updatedStatusContact = await Contact.findByIdAndUpdate(
    { _id: id },
    fields,
    { new: true }
  ).catch(() => {
    return null;
  });

  return updatedStatusContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
