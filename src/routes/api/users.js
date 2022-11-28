const express = require("express");
const {
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
} = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { validationBody } = require("../../middlewares/validationMiddleware");
const {
  schemaPostUser,
  schemaPatchUser,
  schemaVerifyUser,
} = require("../../schemas/usersSchemas");
const auth = require("../../middlewares/authMiddleware");
const { upload } = require("../../middlewares/uploadMiddleware");
const {
  changeUserAvatarController,
  changeUserSubscriptionController,
  verificationUserController,
  resendVerificationUserController,
} = require("../../controllers/userController");

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

router.patch(
  "/avatars",
  auth / upload.single("avatar"),
  asyncWrapper(changeUserAvatarController)
);

router.get(
  "/verify/:verificationToken",
  asyncWrapper(verificationUserController)
);

router.post(
  "/verify",
  validationBody(schemaVerifyUser),
  asyncWrapper(resendVerificationUserController)
);

module.exports = router;
