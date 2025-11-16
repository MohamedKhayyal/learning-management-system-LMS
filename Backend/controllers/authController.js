const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utilts/catchAsync");
const { sendSuccess, sendFail } = require("../utilts/response");
const STATUS_CODES = require("../utilts/responseCodes");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const createSendToken = async (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOptions);

  const userObj = user.toObject ? user.toObject() : { ...user };

  delete userObj.password;
  delete userObj.__v;
  delete userObj.createdAt;
  delete userObj.updatedAt;

  const publicUser = {
    _id: userObj._id,
    fullName: userObj.fullName,
    email: userObj.email,
    photo: userObj.photo,
    role: userObj.role,
  };

  return sendSuccess(
    res,
    { token, user: publicUser },
    "Authentication successful",
    statusCode
  );
};

exports.signUp = catchAsync(async (req, res) => {
  const { fullName, email, password, photo, role } = req.body;

  const allowedSignupRoles = ["student", "educator"];
  const signupRole = role || "student";

  if (!allowedSignupRoles.includes(signupRole)) {
    return sendFail(
      res,
      { role: `Allowed roles: ${allowedSignupRoles.join(", ")}` },
      "Invalid role. Only student or educator allowed.",
      STATUS_CODES.BAD_REQUEST
    );
  }

  const missing = [];
  if (!fullName) missing.push("fullName");
  if (!email) missing.push("email");
  if (!password) missing.push("password");

  if (missing.length > 0) {
    const details = {};
    missing.forEach((f) => (details[f] = `${f} is required`));
    return sendFail(
      res,
      details,
      `Missing required fields: ${missing.join(", ")}`,
      STATUS_CODES.BAD_REQUEST
    );
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return sendFail(
      res,
      { email: "Email already exists" },
      "Email already registered",
      STATUS_CODES.BAD_REQUEST
    );
  }

  const newUser = await User.create({
    fullName,
    email,
    password,
    role: signupRole,
    photo,
  });

  return createSendToken(newUser, STATUS_CODES.CREATED, res);
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return sendFail(
      res,
      {},
      "Please provide email and password",
      STATUS_CODES.BAD_REQUEST
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return sendFail(
      res,
      {},
      "Incorrect email or password",
      STATUS_CODES.UNAUTHORIZED
    );
  }

  return createSendToken(user, STATUS_CODES.OK, res);
});

exports.addAdmin = catchAsync(async (req, res) => {
  const { fullName, email, password } = req.body || {};
  const photo = req.body.photo;

  if (!req.user || req.user.role !== "admin") {
    return sendFail(
      res,
      {},
      "Access denied: Only admins can perform this action.",
      STATUS_CODES.FORBIDDEN
    );
  }

  const missing = [];
  if (!fullName) missing.push("fullName");
  if (!email) missing.push("email");
  if (!password) missing.push("password");
  if (!photo) missing.push("photo");

  if (missing.length > 0) {
    const details = {};
    missing.forEach((f) => (details[f] = `${f} is required`));

    return sendFail(
      res,
      details,
      `${missing.join(", ")} are required`,
      STATUS_CODES.BAD_REQUEST
    );
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return sendFail(
      res,
      { email: "Email already exists" },
      "Admin already exists with this email",
      STATUS_CODES.BAD_REQUEST
    );
  }

  const admin = await User.create({
    fullName,
    email,
    password,
    role: "admin",
    photo,
  });

  const adminObj = admin.toObject ? admin.toObject() : { ...admin };
  delete adminObj.password;
  adminObj.photo = photo;

  return sendSuccess(
    res,
    { admin: adminObj },
    "Admin created successfully",
    STATUS_CODES.CREATED
  );
});
