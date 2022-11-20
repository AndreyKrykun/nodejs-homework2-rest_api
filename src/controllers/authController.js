const { customError } = require("../helpers/errors");
const { registerUser, loginUser } = require("../models/users");

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

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
};
