const User = require("./schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const gravatar = require("gravatar");
const { v4: uuid } = require("uuid");
const { customError } = require("../helpers/errors");
const { sendVerificationMail } = require("../helpers/mailService");

const registerUser = async ({ email, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuid();

  const createdUser = await User.create({
    email,
    password: hashPassword,
    avatarURL: gravatar.url(email, { protocol: "https" }),
    verificationToken,
  }).catch(() => {
    return null;
  });

  if (!createdUser) return null;

  const user = {
    user: {
      email: createdUser.email,
      subscription: createdUser.subscription,
    },
  };

  await sendVerificationMail(createdUser.email, verificationToken);

  return user;
};

const loginUser = async ({ email, password }) => {
  const currentUser = await User.findOne({ email });

  if (!currentUser) return null;

  const isPasswordValid = await bcrypt.compare(password, currentUser.password);

  if (!isPasswordValid) return null;

  if (!currentUser.verify)
    throw customError({ status: 403, message: "Verify your email first." });

  const payload = {
    id: currentUser._id,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "1d" });

  const user = {
    token,
    user: { email: currentUser.email, subscription: currentUser.subscription },
  };

  return user;
};

const changeUserSubscription = async (subscription, _id) => {
  const changedUser = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    {
      returnOriginal: false,
    }
  );

  return changedUser.subscription;
};

const changeUserAvatar = async (avatar, _id) => {
  const changedUser = await User.findByIdAndUpdate(
    { _id },
    { avatarURL: avatar },
    {
      returnOriginal: false,
    }
  );

  return changedUser.avatarURL;
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    },
    { new: true }
  );

  return user;
};

const checkVerification = async ({ email }) => {
  const user = await User.findOne({ email, verify: false });

  if (!user) return null;

  await sendVerificationMail(user.email, user.verificationToken);

  return user;
};

module.exports = {
  registerUser,
  loginUser,
  changeUserSubscription,
  changeUserAvatar,
  verifyUser,
  checkVerification,
};
