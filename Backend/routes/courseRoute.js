const express = require("express");
const { uploadSingle, resize } = require("../middlewares/upload");
const courseController = require("../controllers/courseController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(courseController.getCourses)
  .post(
    auth.protect,
    auth.restrictTo("admin", "educator"),
    uploadSingle("image"),
    resize,
    courseController.createCourse
  );

router
  .route("/:id")
  .get(courseController.getCourseById)
  .patch(
    auth.protect,
    auth.restrictTo("admin", "educator"),
    uploadSingle("image"),
    resize,
    courseController.updateCourse
  )
  .delete(
    auth.protect,
    auth.restrictTo("admin", "educator"),
    courseController.deleteCourse
  );

module.exports = router;
