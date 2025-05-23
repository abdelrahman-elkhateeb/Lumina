const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 0
  },
  resources: [{ type: String }]
});

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  lessons: [LessonSchema]
});

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    courseImage: {
      type: String,
    },
    description: {
      type: String,
      required: true
    },
    previewVideo: {
      type: String,
      required: true
    },
    whatYouWillLearn: {
      required: true,
      type: [String]
    },
    category: {
      type: String,
      required: true,
      enum: ["Web Development", "Data Science", "AI", "CyberSecurity", "Others"]
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    placementTest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    sections: [SectionSchema], // Course structure with sections & lessons
    studentsProgress: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
        currentLesson: { type: mongoose.Schema.Types.ObjectId },
        progressPercentage: {
          type: Number,
          default: 0
        }
      }
    ],
    placementTest: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"PlacementTest"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
