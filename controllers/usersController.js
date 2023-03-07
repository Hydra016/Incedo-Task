const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../utils/validation");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const { error } = registerValidation(req.body);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (error)
    return res
      .status(401)
      .json({ success: false, msg: error.details[0].message });

  const userExist = await User.findOne({ email });
  if (userExist)
    return res
      .status(401)
      .json({ success: false, msg: `${email} already exists` });

  try {
    const user = new User({
      email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(200).json({ success: true, data: newUser });
  } catch (err) {
    res.status(401).send({ success: false, msg: err });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidation(req.body);

  if (error)
    return res
      .status(401)
      .json({ success: false, msg: error.details[0].message });

  const checkdUser = await User.findOne({ email });
  if (!checkdUser)
    return res
      .status(404)
      .json({ success: false, msg: `no user with email ${email} exists` });

  const validPass = await bcrypt.compare(password, checkdUser.password);
  if (!validPass)
    return res
      .status(401)
      .json({ success: false, msg: "invalid email or password" });

  const token = jwt.sign({ _id: checkdUser._id }, process.env.SECRET_TOKEN);
  res.header("auth-token", token).send(token);
};

module.exports = {
  registerUser,
  loginUser,
};
