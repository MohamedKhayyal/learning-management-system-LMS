const mongoose = require("mongoose");

const curriculumItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    minutes: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const curriculumSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    meta: {
      lectures: {
        type: Number,
        default: 0,
      },
    },
    items: [curriculumItemSchema],
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Course image is required"],
    },

    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },

    author: {
      type: String,
      required: [true, "Course author is required"],
      trim: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    students: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Course price is required"],
    },

    oldPrice: {
      type: Number,
    },

    discount: {
      type: Number,
      default: 0,
    },

    badge: {
      type: String,
      enum: ["Full Stack", "AI/ML", "Frontend", "Backend", "Other"],
      default: "Other",
    },

    youtubeId: {
      type: String,
      trim: true,
    },

    subtitle: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    totalSections: {
      type: Number,
      default: 0,
    },

    totalLectures: {
      type: Number,
      default: 0,
    },

    totalMinutes: {
      type: Number,
      default: 0,
    },

    curriculum: [curriculumSectionSchema],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
