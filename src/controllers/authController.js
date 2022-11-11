const { customError } = require("../helpers/errors");
const {
  registerUser,
  loginUser,
  changeUserSubscription,
} = require("../models/users");

const registerUserController = async (req, res, next) => {
  const newUserData = req.body;

  const createdUser = await registerUser(newUserData);

  if (!createdUser) throw customError({ status: 409, message: "Email in use" });

  res.status(201).json(createdUser);
};

const loginUserController = async (req, res, next) => {
  const userData = req.body;

  const currentUser = await loginUser(userData);

  if (!currentUser)
    throw customError({ status: 401, message: "Email or password is wrong" });

  res.status(200).json(currentUser);
};

const logoutUserController = async (req, res, next) => {
  res.sendStatus(204);
};

const getCurrentUserController = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const changeUserSubscriptionController = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const newSubscription = await changeUserSubscription(subscription, _id);

  res.status(200).json({ subscription: newSubscription });
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  changeUserSubscriptionController,
};
