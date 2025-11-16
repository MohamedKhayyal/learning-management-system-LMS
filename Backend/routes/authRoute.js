const express = require("express");
const { uploadSingle, uploadFields, resize } = require("../middlewares/upload");

const { signUp, login, addAdmin } = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", uploadSingle("photo"), resize, signUp);

router.post("/login", express.json(), login);

router.post(
  "/add-admin",
  auth.protect,
  auth.restrictTo("admin"),
  uploadSingle("photo"), 
  resize,
  addAdmin
);

module.exports = router;
