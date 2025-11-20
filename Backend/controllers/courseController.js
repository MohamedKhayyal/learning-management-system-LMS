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
  if (!description) missing.push("description");
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

  if (req.user && req.user.fullName && !author) {
    author = req.user.fullName;
  }

  const basePrice = Number(price);
  if (Number.isNaN(basePrice)) {
    return sendFail(
      res,
      { price: "Price must be a number" },
      "Invalid price value",
      STATUS_CODES.BAD_REQUEST
    );
  }

  const disc =
    discount !== undefined && discount !== null && discount !== ""
      ? Number(discount)
      : 0;

  let finalDiscount = Number.isNaN(disc) ? 0 : disc;
  if (finalDiscount < 0 || finalDiscount > 100) {
    return sendFail(
      res,
      { discount: "Discount must be between 0 and 100" },
      "Invalid discount value",
      STATUS_CODES.BAD_REQUEST
    );
  }

  let finalPrice = basePrice;
  let computedOldPrice = undefined;

  if (finalDiscount > 0) {
    computedOldPrice = basePrice;
    finalPrice = Number((basePrice * (1 - finalDiscount / 100)).toFixed(2));
  }

  if (curriculum && typeof curriculum === "string") {
    try {
      curriculum = JSON.parse(curriculum);
    } catch (err) {
      return sendFail(
        res,
        { curriculum: "Invalid curriculum JSON" },
        "Curriculum must be valid JSON",
        STATUS_CODES.BAD_REQUEST
      );
    }
  }

  const course = await Course.create({
    image,
    title,
    author,
    price: finalPrice,
    oldPrice: computedOldPrice,
    rating,
    reviews,
    students,
    discount: finalDiscount,
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

  let basePrice = course.oldPrice != null ? course.oldPrice : course.price;
  let finalDiscount = typeof course.discount === "number" ? course.discount : 0;

  let hasPriceChange = false;
  let hasDiscountChange = false;

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
    basePrice = newPrice;
    hasPriceChange = true;
    delete updates.price;
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

    finalDiscount = newDiscount;
    hasDiscountChange = true;
    delete updates.discount;
  }

  if (hasPriceChange || hasDiscountChange) {
    if (finalDiscount > 0) {
      course.oldPrice = basePrice;
      course.price = Number((basePrice * (1 - finalDiscount / 100)).toFixed(2));
      course.discount = finalDiscount;
    } else {
      course.price = basePrice;
      course.oldPrice = undefined;
      course.discount = 0;
    }
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
