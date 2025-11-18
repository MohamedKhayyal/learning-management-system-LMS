const Course = require("../models/courseModel");
const catchAsync = require("../utilts/catchAsync");
const { sendSuccess, sendFail } = require("../utilts/response");
const STATUS_CODES = require("../utilts/responseCodes");

exports.createCourse = catchAsync(async (req, res) => {
  let {
    image,
    title,
    author,
    price,
    oldPrice,
    rating,
    reviews,
    students,
    discount,
    badge,
    youtubeId,
    subtitle,
    description,
    totalSections,
    totalLectures,
    totalMinutes,
    curriculum,
  } = req.body || {};

  const missing = [];
  if (!image) missing.push("image");
  if (!title) missing.push("title");
  if (!price) missing.push("price");

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

  if (!author && req.user?.fullName) {
    author = req.user.fullName;
  }

  if (curriculum && typeof curriculum === "string") {
    try {
      curriculum = JSON.parse(curriculum);
    } catch (err) {
      return sendFail(
        res,
        { curriculum: "Invalid curriculum format" },
        "Curriculum must be valid JSON",
        STATUS_CODES.BAD_REQUEST
      );
    }
  }

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice)) {
    return sendFail(
      res,
      { price: "Price must be a number" },
      "Invalid price value",
      STATUS_CODES.BAD_REQUEST
    );
  }

  const course = await Course.create({
    image,
    title,
    author,
    price: numericPrice,
    oldPrice,
    rating,
    reviews,
    students,
    discount,
    badge,
    youtubeId,
    subtitle,
    description,
    totalSections,
    totalLectures,
    totalMinutes,
    curriculum,
  });

  return sendSuccess(
    res,
    { course },
    "Course created successfully",
    STATUS_CODES.CREATED
  );
});

exports.getCourses = catchAsync(async (req, res) => {
  const courses = await Course.find();

  return sendSuccess(
    res,
    { courses, results: courses.length },
    "Courses fetched successfully",
    STATUS_CODES.OK
  );
});

exports.getCourseById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    return sendFail(res, {}, "Course not found", STATUS_CODES.NOT_FOUND);
  }

  return sendSuccess(
    res,
    { course },
    "Course fetched successfully",
    STATUS_CODES.OK
  );
});

exports.updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    return sendFail(res, {}, "Course not found", STATUS_CODES.NOT_FOUND);
  }

  const updates = { ...req.body };

  if (!updates.author && req.user?.fullName) {
    updates.author = req.user.fullName;
  }

  if (updates.curriculum && typeof updates.curriculum === "string") {
    try {
      updates.curriculum = JSON.parse(updates.curriculum);
    } catch (err) {
      return sendFail(
        res,
        { curriculum: "Invalid curriculum format" },
        "Curriculum must be valid JSON",
        STATUS_CODES.BAD_REQUEST
      );
    }
  }

  if (updates.price !== undefined) {
    const newPrice = Number(updates.price);
    if (Number.isNaN(newPrice)) {
      return sendFail(
        res,
        { price: "Price must be a number" },
        "Invalid price value",
        STATUS_CODES.BAD_REQUEST
      );
    }
    updates.price = newPrice;
  }

  if (updates.discount !== undefined) {
    let newDiscount =
      updates.discount === "" || updates.discount === null
        ? 0
        : Number(updates.discount);

    if (Number.isNaN(newDiscount) || newDiscount < 0 || newDiscount > 100) {
      return sendFail(
        res,
        { discount: "Discount must be between 0 and 100" },
        "Invalid discount value",
        STATUS_CODES.BAD_REQUEST
      );
    }

    if (newDiscount > 0) {
      if (!course.oldPrice) {
        course.oldPrice = course.price;
      }

      course.discount = newDiscount;

      course.price = Number(
        (course.oldPrice * (1 - newDiscount / 100)).toFixed(2)
      );
    } else {
      if (course.oldPrice) {
        course.price = course.oldPrice;
        course.oldPrice = undefined;
      }
      course.discount = 0;
    }

    delete updates.discount;
    delete updates.price;
  }
  Object.assign(course, updates);

  await course.save();

  return sendSuccess(
    res,
    { course },
    "Course updated successfully",
    STATUS_CODES.OK
  );
});

exports.deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const course = await Course.findByIdAndDelete(id);

  if (!course) {
    return sendFail(res, {}, "Course not found", STATUS_CODES.NOT_FOUND);
  }

  return sendSuccess(
    res,
    { id: course._id },
    "Course deleted successfully",
    STATUS_CODES.OK
  );
});
