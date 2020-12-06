const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const BadRequestError = require("../errors/bad-request-error");
const Password = require("../service/password");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    throw new BadRequestError("Email in use");
  }
  let username = shortId.generate();
  let profile = `${process.env.CLIENT_URL}/profile/${username}`;
  user = User.build({ name, email, password, profile, username });
  await user.save();
  res.status(201).json(user);
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Email not found");
  }
  const passwordMatch = await Password.compare(user.password, password);
  if (!passwordMatch) {
    throw new BadRequestError("Wrong enail or password");
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
  res.cookie("token", token, { expiresIn: "1d" });
  res.json({ token, user });
};

const signout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signout success" });
};

module.exports = {
  createUser,
  signinUser,
  signout,
};
