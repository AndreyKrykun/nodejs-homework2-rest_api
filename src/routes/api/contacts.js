const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { validationBody } = require("../../middlewares/validationMiddleware");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  changeFavoriteController,
} = require("../../controllers/contactsController");

const {
  schemaPostContact,
  schemaPutContact,
  schemaPatchContact,
} = require("../../schemas/contactsSchemas");

const auth = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", auth, asyncWrapper(getContactsController));

router.get("/:contactId", auth, asyncWrapper(getContactByIdController));

router.post(
  "/",
  auth,
  validationBody(schemaPostContact),
  asyncWrapper(addContactController)
);

router.delete("/:contactId", auth, asyncWrapper(deleteContactController));

router.put(
  "/:contactId",
  auth,
  validationBody(schemaPutContact),
  asyncWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validationBody(schemaPatchContact),
  asyncWrapper(changeFavoriteController)
);

module.exports = router;
