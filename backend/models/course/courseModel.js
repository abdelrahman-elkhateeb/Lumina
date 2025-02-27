import mongoose from "mongoose";
import SectionSchema from "./sectionModel.js";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ["Web Development", "Data Science", "AI", "Cybersecurity", "Others"]
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"]
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
    enrollmentType: {
      type: String,
      enum: ["Free", "Paid", "Placement Test"],
      default: "Free"
    },
    placementTest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
    },
    enrolledStudents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
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
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
