const express = require("express");
const {
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  changeUserSubscriptionController,
} = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { validationBody } = require("../../middlewares/validationMiddleware");
const {
  schemaPostUser,
  schemaPatchUser,
} = require("../../schemas/usersSchemas");
const auth = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/signup",
  validationBody(schemaPostUser),
  asyncWrapper(registerUserController)
);

router.post(
  "/login",
  validationBody(schemaPostUser),
  asyncWrapper(loginUserController)
);

router.post("/logout", auth, asyncWrapper(logoutUserController));

router.get("/current", auth, asyncWrapper(getCurrentUserController));

router.patch(
  "/subscription",
  auth,
  validationBody(schemaPatchUser),
  asyncWrapper(changeUserSubscriptionController)
);

module.exports = router;
